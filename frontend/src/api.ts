import { AgentResponse } from './types';

const BASE_URL = 'http://localhost:3000';

export async function queryAgent(message: string): Promise<AgentResponse> {
  const res = await fetch(`${BASE_URL}/agent/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Backend error: ${err}`);
  }

  return res.json() as Promise<AgentResponse>;
}
