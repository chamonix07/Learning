import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

export type Intent =
  | 'refund'
  | 'password_reset'
  | 'shipping'
  | 'billing'
  | 'support'
  | 'general';

export interface IntentResult {
  intent: Intent;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
}

/**
 * Agent 1 — Intent Classifier
 *
 * Receives the raw user message and returns a structured intent
 * classification. This output drives which context the RAG step
 * retrieves and how Agent 2 frames its response.
 */
@Injectable()
export class IntentAgentService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY ?? 'YOUR_OPENAI_API_KEY',
    });
  }

  async classify(userMessage: string): Promise<IntentResult> {
    const systemPrompt = `You are an intent classification agent for a customer support system.
Classify the user's message into exactly one of these intents:
- refund       : questions about returns or refunds
- password_reset: account access or password issues
- shipping     : delivery, tracking, or shipping questions
- billing      : subscription, pricing, or payment questions
- support      : general help or contact requests
- general      : anything else

Respond ONLY with valid JSON matching this schema:
{
  "intent": "<one of the intents above>",
  "confidence": "<high|medium|low>",
  "reasoning": "<one sentence>"
}`;

    const response = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    });

    const raw = response.choices[0].message.content ?? '{}';

    try {
      return JSON.parse(raw) as IntentResult;
    } catch {
      // Fallback if the model returns malformed JSON
      return { intent: 'general', confidence: 'low', reasoning: 'Parse error' };
    }
  }
}
