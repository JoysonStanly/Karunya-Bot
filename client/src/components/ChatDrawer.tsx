import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Minus } from "lucide-react";
import { sendMessage } from "../services/chat.service";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

type MessageBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

type InlineSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string };

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

const quickQuestions = [
  "What courses do you offer?",
  "Tell me about placements",
  "What is the fee structure?",
  "How to apply for admissions?",
];

const normalizeAssistantText = (text: string): string => {
  const protectedUrls: string[] = [];
  const urlToken = /https?:\/\/[^\s)]+/gi;

  const withPlaceholders = text.replace(urlToken, (match) => {
    protectedUrls.push(match);
    return `__URL_${protectedUrls.length - 1}__`;
  });

  const normalized = withPlaceholders
    .replace(/\r\n/g, "\n")
    .replace(/\n{2,}/g, "\n\n")
    .replace(/\n/g, " ")
    .replace(/https?:\/\/\s*www\.\s*karunya\s*\.\s*edu/gi, "https://www.karunya.edu")
    .replace(/\bkarunya\s*\.\s*edu\b/gi, "karunya.edu")
    .replace(/\s+([,.;!?])/g, "$1")
    .replace(/([.!?])([A-Za-z])/g, "$1 $2")
    .replace(/[ \t]{2,}/g, " ")
    .trim();

  return normalized.replace(/__URL_(\d+)__/g, (_, index: string) => protectedUrls[Number(index)] ?? "");
};

const splitInlineLinks = (text: string): InlineSegment[] => {
  const urlPattern = /https?:\/\/[^\s)]+/gi;
  const segments: InlineSegment[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(urlPattern)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      segments.push({ type: "text", value: text.slice(lastIndex, index) });
    }

    segments.push({ type: "link", value: match[0] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    segments.push({ type: "text", value: text.slice(lastIndex) });
  }

  return segments;
};

const renderInlineContent = (text: string) => {
  return splitInlineLinks(text).map((segment, index) =>
    segment.type === "link" ? (
      <a
        key={`${segment.value}-${index}`}
        href={segment.value}
        target="_blank"
        rel="noreferrer"
        className="font-medium text-maroon underline decoration-maroon/30 underline-offset-4 break-all hover:decoration-maroon"
      >
        {segment.value}
      </a>
    ) : (
      <span key={`${segment.value}-${index}`}>{segment.value}</span>
    )
  );
};

const formatMessageBlocks = (text: string): MessageBlock[] => {
  const normalizedText = normalizeAssistantText(text);
  if (!normalizedText) {
    return [];
  }

  const rawBlocks = normalizedText.split(/\n\s*\n/);
  const blocks: MessageBlock[] = [];

  rawBlocks.forEach((rawBlock) => {
    const block = rawBlock.trim();
    if (!block) {
      return;
    }

    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    const isList = lines.length > 1 && lines.every((line) => /^[-*•]\s+/.test(line));

    if (isList) {
      blocks.push({
        type: "list",
        items: lines.map((line) => line.replace(/^[-*•]\s+/, "")),
      });
      return;
    }

    const paragraphText = block.replace(/\n+/g, " ").trim();
    blocks.push({ type: "paragraph", text: paragraphText });
  });

  return blocks;
};

export default function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Karunya Bot. Ask me anything about courses, fees, admissions, placements, or campus life.",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || sending) return;

    const userMsg: Message = { id: Date.now(), text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      // sendMessage now returns { message: "answer text" }
      const data = await sendMessage(messageText);
      const botMsg: Message = { id: Date.now() + 1, text: data.message, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: Message = { id: Date.now() + 1, text: "Sorry, something went wrong. Please try again.", sender: "bot" };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[580px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">
      <div className="bg-maroon px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">Karunya Bot</h3>
            <p className="text-white/70 text-xs">Ask me anything</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 transition-colors duration-200"
            aria-label="Minimize chat"
            title="Minimize chat"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 transition-colors duration-200"
            aria-label="Close chat"
            title="Close chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            {msg.sender === "bot" && (
              <div className="w-6 h-6 bg-maroon rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-3 h-3 text-white" />
              </div>
            )}
            <div className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-[15px] leading-7 ${
              msg.sender === "user"
                ? "bg-maroon text-white rounded-br-sm whitespace-pre-wrap"
                : "bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm"
            }`}>
              {msg.sender === "bot" ? (
                <div className="space-y-2.5">
                  {formatMessageBlocks(msg.text).map((block, index) =>
                    block.type === "list" ? (
                      <ul key={index} className="space-y-1 pl-4 list-disc">
                        {block.items.map((item) => (
                          <li key={item} className="pl-1">
                            {renderInlineContent(item)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p key={index} className="whitespace-pre-wrap break-words">
                        {renderInlineContent(block.text)}
                      </p>
                    )
                  )}
                </div>
              ) : (
                <span className="whitespace-pre-wrap break-words">{msg.text}</span>
              )}
            </div>
            {msg.sender === "user" && (
              <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3 text-gray-600" />
              </div>
            )}
          </div>
        ))}

        {sending && (
          <div className="flex items-end gap-2">
            <div className="w-6 h-6 bg-maroon rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white border border-gray-200 px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q) => (
              <button key={q} onClick={() => handleSend(q)}
                className="text-xs px-2.5 py-1 bg-white border border-maroon/20 text-maroon rounded-full hover:bg-maroon hover:text-white transition-colors duration-200">
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border-t border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Ask a question..." disabled={sending}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-maroon text-sm disabled:opacity-50 transition-colors duration-200" />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || sending}
            aria-label="Send message"
            title="Send message"
            className="w-9 h-9 bg-maroon text-white rounded-lg flex items-center justify-center hover:bg-maroon-dark disabled:opacity-50 transition-colors duration-200">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}