import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { IntentResult } from './intent-agent.service';

export interface FinalResponse {
  answer: string;
  sources: string[];
}

/**
 * Agent 2 — Response Generator
 *
 * Receives the original user message, the classified intent from
 * Agent 1, and the retrieved context documents from the vector store.
 * Produces a grounded, structured answer.
 */
@Injectable()
export class ResponseAgentService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? 'YOUR_OPENAI_API_KEY',
    });
  }

  async generate(
    userMessage: string,
    intentResult: IntentResult,
    contextDocs: { id: string; content: string }[],
  ): Promise<FinalResponse> {
    const contextBlock =
      contextDocs.length > 0
        ? contextDocs
            .map((d, i) => `[Source ${i + 1} — ${d.id}]\n${d.content}`)
            .join('\n\n')
        : 'No specific documentation found.';

    const systemPrompt = `You are a helpful customer support assistant.
The user's intent has been classified as: "${intentResult.intent}" (confidence: ${intentResult.confidence}).

Use ONLY the context below to answer. If the context does not contain enough information, say so honestly.
Be concise, friendly, and structured.

--- CONTEXT ---
${contextBlock}
--- END CONTEXT ---`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    });

    const answer = response.choices[0].message.content ?? 'No response generated.';
    const sources = contextDocs.map((d) => d.id);

    return { answer, sources };
  }
}
