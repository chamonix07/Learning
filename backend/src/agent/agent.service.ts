import { Injectable, Logger } from '@nestjs/common';
import { IntentAgentService } from './intent-agent.service';
import { ResponseAgentService } from './response-agent.service';
import { VectorStoreService } from './vector-store.service';

export interface PipelineResult {
  userMessage: string;
  intent: string;
  confidence: string;
  retrievedSources: string[];
  answer: string;
  pipeline: PipelineStep[];
}

interface PipelineStep {
  step: number;
  name: string;
  output: unknown;
}

/**
 * Orchestrator — runs the full multi-step AI pipeline:
 *
 *  Step 1 → Receive user input
 *  Step 2 → Agent 1 classifies intent  (prompt chaining starts here)
 *  Step 3 → RAG retrieves relevant docs based on intent + message
 *  Step 4 → Agent 2 generates a grounded response  (chain continues)
 */
@Injectable()
export class AgentService {
  private readonly logger = new Logger(AgentService.name);

  constructor(
    private readonly intentAgent: IntentAgentService,
    private readonly responseAgent: ResponseAgentService,
    private readonly vectorStore: VectorStoreService,
  ) {}

  async runPipeline(userMessage: string): Promise<PipelineResult> {
    const steps: PipelineStep[] = [];

    // ── Step 1: Receive input ──────────────────────────────────────────
    this.logger.log(`[Step 1] Received: "${userMessage}"`);
    steps.push({ step: 1, name: 'User Input', output: userMessage });

    // ── Step 2: Intent classification (Agent 1) ────────────────────────
    this.logger.log('[Step 2] Running intent classification agent...');
    const intentResult = await this.intentAgent.classify(userMessage);
    this.logger.log(`[Step 2] Intent: ${intentResult.intent} (${intentResult.confidence})`);
    steps.push({ step: 2, name: 'Intent Classification (Agent 1)', output: intentResult });

    // ── Step 3: RAG — retrieve context from vector store ──────────────
    // Enrich the query with the detected intent for better retrieval
    const enrichedQuery = `${intentResult.intent} ${userMessage}`;
    this.logger.log(`[Step 3] Retrieving context for: "${enrichedQuery}"`);
    const docs = this.vectorStore.retrieve(enrichedQuery, 2);
    this.logger.log(`[Step 3] Retrieved ${docs.length} document(s): ${docs.map((d) => d.id).join(', ')}`);
    steps.push({
      step: 3,
      name: 'RAG Retrieval (Vector Store)',
      output: docs.map((d) => ({ id: d.id, preview: d.content.slice(0, 80) + '...' })),
    });

    // ── Step 4: Response generation (Agent 2) ─────────────────────────
    // This step depends on both Step 2 (intent) and Step 3 (context) — long-chain inference
    this.logger.log('[Step 4] Running response generation agent...');
    const finalResponse = await this.responseAgent.generate(userMessage, intentResult, docs);
    this.logger.log('[Step 4] Response generated.');
    steps.push({ step: 4, name: 'Response Generation (Agent 2)', output: finalResponse });

    return {
      userMessage,
      intent: intentResult.intent,
      confidence: intentResult.confidence,
      retrievedSources: finalResponse.sources,
      answer: finalResponse.answer,
      pipeline: steps,
    };
  }
}
