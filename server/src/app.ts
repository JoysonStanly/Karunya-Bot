import path from "node:path";
import { existsSync } from "node:fs";
import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import errorHandler from "./middleware/error-handler.middleware.ts";
import chatRoutes from "./routes/chat.routes.ts";
const app: Application = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");
const hasClientBuild = existsSync(path.join(clientDistPath, "index.html"));

const allowedOrigins = (
  process.env.CLIENT_URLS || process.env.CLIENT_URL || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const isAllowedOrigin = (origin: string): boolean => {
  if (allowedOrigins.includes(origin)) return true;

  try {
    const { hostname } = new URL(origin);
    if (hostname === "localhost" || hostname === "127.0.0.1") return true;
    if (hostname.endsWith(".vercel.app")) return true;
  } catch {
    return false;
  }

  // Allow Vercel preview/prod domains when explicitly configured with wildcard.
  return allowedOrigins.some((allowed) => {
    if (!allowed.startsWith("*.")) return false;
    const domain = allowed.slice(1); // ".vercel.app"
    return origin.endsWith(domain);
  });
};

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server tools and explicit allowed browser origins.
    if (!origin || isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }
    // Do not throw 500 for disallowed CORS origin.
    callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api", (_req: Request, res: Response) => {
  res.json({ success: true, message: "API is running." });
});

app.use("/api/chat", chatRoutes);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  app.get(/^\/(?!api).*/, (_req: Request, res: Response) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.use(errorHandler);

export default app;
