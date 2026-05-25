import path from "node:path";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { MongoClient } from "mongodb";
import {
  ChatGoogleGenerativeAI,
  GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getMongoDbName } from "../config/database.config.js";
// --- MongoDB Native Client (for LangChain vector operations) ---
// ---- __dirname for ESM ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---- MongoDB native client ----
let mongoClient: MongoClient | null = null;

const getMongoClient = async (): Promise<MongoClient> => {
  if (!mongoClient) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MongoDB URI not found in environment variables");
    }
    mongoClient = new MongoClient(uri);
    try {
      await mongoClient.connect();
      console.log("MongoDB connected successfully");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      process.exit(1);
    }
  }
  return mongoClient;
};
// ---- Google GenAI Embeddings ----
// gemini-embedding-001 → default 3072 dimensions (FREE, same API key as Gemini chat)
const getEmbeddings = () => {
  if (!process.env.GOOGLE_API_KEY) {
    throw new Error("GOOGLE_API_KEY is not set in .env!");
  }
  return new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-embedding-001",
  });
};
// ---- Vector Store ----
const getVectorStore = async () => {
  const client = await getMongoClient();
  const collection = client.db(getMongoDbName()).collection("knowledge_docs");

  return new MongoDBAtlasVectorSearch(getEmbeddings(), {
    collection: collection as any,
    indexName: "edureach_vector_index",
    textKey: "text",
    embeddingKey: "embedding",
  });
};

// Alternative: Direct similarity search without needing Atlas index
const directSimilaritySearch = async (
  query: string,
  topK: number = 5
): Promise<{ pageContent: string; metadata: Record<string, any> }[]> => {
  const client = await getMongoClient();
  const collection = client.db(getMongoDbName()).collection("knowledge_docs");
  const embeddings = getEmbeddings();

  const queryEmbedding = await embeddings.embedQuery(query);

  // Get all documents and compute similarity (cosine)
  const allDocs = await collection.find({}).toArray();

  // Compute cosine similarity for each document
  const similarities = allDocs.map((doc) => {
    const docEmbedding = doc.embedding as number[];
    if (!Array.isArray(docEmbedding) || docEmbedding.length === 0) {
      return { doc, score: 0 };
    }

    // Cosine similarity
    let dotProduct = 0;
    for (let i = 0; i < queryEmbedding.length; i++) {
      const queryValue = queryEmbedding[i] ?? 0;
      dotProduct += queryValue * (docEmbedding[i] || 0);
    }

    const queryNorm = Math.sqrt(queryEmbedding.reduce((sum, x) => sum + x * x, 0));
    const docNorm = Math.sqrt(docEmbedding.reduce((sum, x) => sum + x * x, 0));
    const similarity = queryNorm > 0 && docNorm > 0 ? dotProduct / (queryNorm * docNorm) : 0;

    return { doc, score: similarity };
  });

  // Sort by similarity and get top K
  const topDocs = similarities
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((item) => ({
      pageContent: item.doc.text || "",
      metadata: item.doc.metadata || {},
      score: item.score,
    }));

  return topDocs;
};
// --- Initialize Knowledge Base ---
// / ============================================
// A) INDEXING — runs ONCE at server startup
// ============================================
export const initializeKnowledgeBase = async (): Promise<void> => {
  const client = await getMongoClient();
  const collection = client.db(getMongoDbName()).collection("knowledge_docs");
  const filePath = path.join(__dirname, "../../knowledge-base/edureach-knowledge.txt");
  const fileContents = await import("node:fs/promises").then((fs) => fs.readFile(filePath, "utf8"));
  const sourceHash = createHash("sha256").update(fileContents).digest("hex");

  // Check if docs exist WITH valid (non-empty) embeddings
  const docWithEmbedding = await collection.findOne({
    embedding: { $exists: true, $not: { $size: 0 } },
  });

  if (docWithEmbedding) {
    const count = await collection.countDocuments();
    const storedHash = docWithEmbedding.metadata?.sourceFileHash;
    if (storedHash === sourceHash) {
      if (Array.isArray(docWithEmbedding.embedding)) {
        console.log(docWithEmbedding.embedding.length);
      }
      console.log(` Knowledge base ready (${count} chunks with embeddings)`);
      return;
    }

    console.log(" Knowledge base source changed — deleting old embeddings and re-indexing...");
    await collection.deleteMany({});

    if (Array.isArray(docWithEmbedding.embedding)) {
      console.log(docWithEmbedding.embedding.length);
    }
    console.log(` Knowledge base ready (${count} chunks with embeddings)`);
  }

  // If docs exist but embeddings are empty → delete and re-index
  const existingCount = await collection.countDocuments();
  if (existingCount > 0) {
    console.log(` Found ${existingCount} chunks with EMPTY embeddings — deleting & re-indexing...`);
    await collection.deleteMany({});
  }

  console.log(" Indexing knowledge base...");

  // Verify API key FIRST with a test embedding
  const embeddings = getEmbeddings();
  try {
    const testResult = await embeddings.embedQuery("test");
    const embedding = testResult;
    console.log(embedding.length);
    console.log(` API key OK — embedding dimensions: ${testResult.length}`);
  } catch (error: any) {
    console.error(" Embedding test failed!");
    console.error("   Error:", error.message || error);
    console.error("   Get key from: https://aistudio.google.com/apikey");
    throw error;
  }

  // LOAD
  const loader = new TextLoader(filePath);
  const docs = await loader.load();
  if (docs.length === 0) {
    throw new Error("No documents found in knowledge base file");
  }
  docs.forEach((doc) => {
    doc.metadata = {
      ...doc.metadata,
      sourceFileHash: sourceHash,
      sourceFileName: "edureach-knowledge.txt",
    };
  });
  const totalCharacters = docs.reduce((sum, doc) => sum + doc.pageContent.length, 0);
  console.log(`    Loaded ${totalCharacters} characters`);

  // SPLIT
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const allSplits = await splitter.splitDocuments(docs);
  console.log(`    Split into ${allSplits.length} chunks`);

  // EMBED + STORE
  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: collection as any,
    indexName: "edureach_vector_index",
    textKey: "text",
    embeddingKey: "embedding",
  });

  await vectorStore.addDocuments(allSplits);

  // VERIFY
  const verifyDoc = await collection.findOne({
    embedding: { $exists: true, $not: { $size: 0 } },
  });

  if (verifyDoc && Array.isArray(verifyDoc.embedding) && verifyDoc.embedding.length > 0) {
    console.log(`    ${allSplits.length} chunks stored (${verifyDoc.embedding.length}D embeddings)`);
    console.log(`     IMPORTANT: Create Atlas Vector Search index with numDimensions: ${verifyDoc.embedding.length}`);
  } else {
    await collection.deleteMany({});
    throw new Error(" Embeddings are empty! Google API returned no vectors.");
  }
};

// --- Get RAG Response ---
export const getRAGResponse = async (question: string): Promise<string> => {
  try {
    // Step 1: Retrieve relevant documents using direct similarity search
    const retrievedDocs = await directSimilaritySearch(question, 5);
    
    let context = "";
    if (retrievedDocs.length === 0) {
      context = "No relevant information found in the knowledge base.";
    } else {
      context = retrievedDocs
        .map((doc) => doc.pageContent)
        .join("\n\n---\n\n");
    }

    // Step 2: Create the model
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_API_KEY is not set in .env!");
    }

    const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      temperature: 0.7,
      apiKey,
    });

    // Step 3: Create the system prompt
    const systemPrompt = `You are Karunya Bot, a helpful AI counselor for Karunya Institute of Technology and Sciences.
Answer the user's question based on the information provided below.
Be concise, friendly, and professional (2-3 sentences max).
 Write in short, readable paragraphs.
 Do not insert line breaks in the middle of a sentence.
 If you mention the website, keep the URL exact and on one line: https://www.karunya.edu
 If the exact information is not available, politely say: "I don’t have that information right now. Please visit https://www.karunya.edu for more details and the latest updates."

Information about Karunya:
${context}`;

    // Step 4: Create messages using LangChain message classes
    const messages = [
      new SystemMessage(systemPrompt),
      new HumanMessage(question),
    ];

    // Step 5: Call the model
    const response = await model.invoke(messages);

    const responseText = typeof response.content === "string" 
      ? response.content 
      : JSON.stringify(response.content);
    
    return responseText;
  } catch (error) {
    console.error("RAG response failed:", error);

    const message = error instanceof Error ? error.message : String(error);
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes("api key expired") || lowerMessage.includes("api_key_invalid")) {
      return "The chatbot API key has expired. Please renew the Gemini key to restore chat responses.";
    }

    if (lowerMessage.includes("quota exceeded") || lowerMessage.includes("too many requests")) {
      return "The chatbot is temporarily rate-limited by Gemini. Please try again later or click 'Talk to Us'.";
    }

    return "I'm having trouble processing your request right now. Please try again or click 'Talk to Us'.";
  }
};
