# AI Support Agent — Full-Stack Example

A minimal but complete demonstration of a **multi-agent AI pipeline** with:

- **React** frontend (Vite + TypeScript)
- **NestJS** backend (TypeScript)
- **Prompt chaining** across two specialized agents
- **RAG** (Retrieval-Augmented Generation) via an in-memory vector store
- **Multi-agent collaboration** — Agent 1 classifies intent, Agent 2 generates the response

---

## Architecture

```
User (React UI)
      │  POST /agent/query
      ▼
NestJS AgentController
      │
      ▼
AgentService  ◄─── Orchestrator (prompt chaining)
  │
  ├─ Step 1: Receive user input
  │
  ├─ Step 2: IntentAgentService  ──► OpenAI (gpt-3.5-turbo)
  │           └─ returns: { intent, confidence, reasoning }
  │
  ├─ Step 3: VectorStoreService  ──► In-memory RAG
  │           └─ returns: top-2 relevant documents
  │
  └─ Step 4: ResponseAgentService ─► OpenAI (gpt-3.5-turbo)
              └─ returns: { answer, sources }
```

Each step feeds its output into the next — this is **long-chain inference**.

---

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env
# Add your OpenAI API key to .env

npm install
npm run dev
# Runs on http://localhost:3000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open **http://localhost:5173** and start chatting.

---

## Try these questions

| Question | Expected intent |
|---|---|
| How do I get a refund? | `refund` |
| I forgot my password | `password_reset` |
| How long does shipping take? | `shipping` |
| What does the premium plan include? | `billing` |
| How can I contact support? | `support` |

---

## Key files

| File | Purpose |
|---|---|
| `backend/src/agent/agent.service.ts` | Pipeline orchestrator |
| `backend/src/agent/intent-agent.service.ts` | Agent 1 — intent classifier |
| `backend/src/agent/response-agent.service.ts` | Agent 2 — response generator |
| `backend/src/agent/vector-store.service.ts` | Simulated RAG / vector store |
| `frontend/src/App.tsx` | Chat UI |
| `frontend/src/components/PipelineTrace.tsx` | Pipeline step visualizer |

---

## Replacing the simulated vector store

Swap `VectorStoreService` with a real vector DB:

```ts
// Pinecone example
const results = await pinecone.index('support-docs').query({
  vector: await embed(enrichedQuery),
  topK: 2,
  includeMetadata: true,
});
```

The rest of the pipeline stays the same.
