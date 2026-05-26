export interface PipelineStep {
  step: number;
  name: string;
  output: unknown;
}

export interface AgentResponse {
  userMessage: string;
  intent: string;
  confidence: string;
  retrievedSources: string[];
  answer: string;
  pipeline: PipelineStep[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  agentResponse?: AgentResponse;
  loading?: boolean;
}
