import { Injectable } from '@nestjs/common';

/**
 * Simulated vector store (RAG).
 *
 * In production this would be Pinecone, Weaviate, pgvector, etc.
 * Here we do a simple keyword-based similarity search over a small
 * in-memory document corpus so the example runs without any API keys
 * beyond OpenAI.
 */

interface Document {
  id: string;
  content: string;
  tags: string[];
}

const DOCUMENTS: Document[] = [
  {
    id: 'doc-1',
    content:
      'Our refund policy allows returns within 30 days of purchase. ' +
      'Items must be unused and in original packaging. ' +
      'Refunds are processed within 5-7 business days.',
    tags: ['refund', 'return', 'policy', 'purchase'],
  },
  {
    id: 'doc-2',
    content:
      'To reset your password, click "Forgot Password" on the login page. ' +
      'You will receive an email with a reset link valid for 24 hours. ' +
      'If you do not receive the email, check your spam folder.',
    tags: ['password', 'reset', 'login', 'account', 'email'],
  },
  {
    id: 'doc-3',
    content:
      'Shipping is free for orders over $50. Standard delivery takes 3-5 business days. ' +
      'Express shipping (1-2 days) is available for an additional $9.99. ' +
      'International shipping is available to 40+ countries.',
    tags: ['shipping', 'delivery', 'order', 'express', 'international'],
  },
  {
    id: 'doc-4',
    content:
      'Our premium subscription costs $29/month or $249/year. ' +
      'It includes unlimited document processing, priority support, and API access. ' +
      'You can cancel anytime from your account settings.',
    tags: ['subscription', 'pricing', 'premium', 'plan', 'cancel', 'billing'],
  },
  {
    id: 'doc-5',
    content:
      'To contact support, email support@example.com or use the live chat on our website. ' +
      'Support hours are Monday–Friday, 9 AM–6 PM EST. ' +
      'Average response time is under 2 hours during business hours.',
    tags: ['support', 'contact', 'help', 'email', 'chat'],
  },
];

@Injectable()
export class VectorStoreService {
  /**
   * Retrieve the top-k most relevant documents for a given query.
   * Uses simple token overlap as a stand-in for cosine similarity.
   */
  retrieve(query: string, topK = 2): Document[] {
    const tokens = query.toLowerCase().split(/\W+/).filter(Boolean);

    const scored = DOCUMENTS.map((doc) => {
      const score = tokens.reduce((acc, token) => {
        const inContent = doc.content.toLowerCase().includes(token) ? 1 : 0;
        const inTags = doc.tags.includes(token) ? 2 : 0; // tags weighted higher
        return acc + inContent + inTags;
      }, 0);
      return { doc, score };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .filter((s) => s.score > 0)
      .map((s) => s.doc);
  }
}
