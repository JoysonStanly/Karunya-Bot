# Karunya - Agentic College Chatbot

Simple overview for project use.

## What this project does
- Karunya college website
- AI chat assistant for student queries
- College showcase pages

## Project parts
- `client/` -> Frontend (React + TypeScript)
- `server/` -> Backend (Node.js + Express + TypeScript)

## Setup (simple)
1. Install dependencies:
```bash
cd server && npm install
cd ../client && npm install
```
2. Create `.env` in `server/` (keep secrets private, never share).
3. Start backend:
```bash
cd server
npm run dev
```
4. Start frontend:
```bash
cd client
npm run dev
```

## Render deploy
Use one Render web service for the whole app.

Build command:
```bash
cd client && npm install && npm run build && cd ../server && npm install && npm run build
```

Start command:
```bash
cd server && npm start
```

Required environment variables on Render:
- `MONGODB_URI`
- `GOOGLE_API_KEY`

Optional environment variables:
- `CLIENT_URL` or `CLIENT_URLS` if you later host the frontend on a separate domain
- `MONGODB_URI_LOCAL` for local development only

The backend serves the built frontend automatically when `client/dist` exists, so the production UI and API can run from the same Render service.
