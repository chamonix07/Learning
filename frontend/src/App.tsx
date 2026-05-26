import React, { useRef, useState, useEffect } from 'react';
import { queryAgent } from './api';
import { ChatMessage as ChatMessageType } from './types';
import ChatMessage from './components/ChatMessage';

const SUGGESTIONS = [
  'How do I get a refund?',
  'I forgot my password',
  'How long does shipping take?',
  'What does the premium plan include?',
  'How can I contact support?',
];

export default function App() {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Hi! I\'m your AI support assistant. Ask me anything about orders, accounts, shipping, or billing.',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
    };

    const placeholderId = (Date.now() + 1).toString();
    const placeholder: ChatMessageType = {
      id: placeholderId,
      role: 'assistant',
      text: '',
      loading: true,
    };

    setMessages((prev) => [...prev, userMsg, placeholder]);
    setInput('');
    setLoading(true);

    try {
      const result = await queryAgent(text.trim());

      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholderId
            ? {
                ...m,
                loading: false,
                text: result.answer,
                agentResponse: result,
              }
            : m,
        ),
      );
    } catch (err) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === placeholderId
            ? {
                ...m,
                loading: false,
                text: `Error: ${(err as Error).message}`,
              }
            : m,
        ),
      );
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.logo}>🧠</span>
          <div>
            <h1 style={styles.title}>AI Support Agent</h1>
            <p style={styles.subtitle}>
              Multi-agent pipeline · RAG · Prompt chaining
            </p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main style={styles.main}>
        <div style={styles.messages}>
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
          <div ref={bottomRef} />
        </div>
      </main>

      {/* Suggestions */}
      <div style={styles.suggestions}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            style={styles.chip}
            onClick={() => send(s)}
            disabled={loading}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          disabled={loading}
          aria-label="Message input"
        />
        <button
          type="submit"
          style={{ ...styles.sendBtn, opacity: loading || !input.trim() ? 0.5 : 1 }}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          Send ➤
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxWidth: 800,
    margin: '0 auto',
    background: '#fff',
    boxShadow: '0 0 40px rgba(0,0,0,0.08)',
  },
  header: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    padding: '16px 24px',
    color: '#fff',
    flexShrink: 0,
  },
  headerInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 36,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
  },
  subtitle: {
    fontSize: 12,
    opacity: 0.8,
    margin: 0,
  },
  main: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px 24px',
    background: '#f8fafc',
  },
  messages: {
    display: 'flex',
    flexDirection: 'column',
  },
  suggestions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    padding: '10px 24px',
    background: '#fff',
    borderTop: '1px solid #e2e8f0',
  },
  chip: {
    background: '#f1f5f9',
    border: '1px solid #e2e8f0',
    borderRadius: 20,
    padding: '4px 12px',
    fontSize: 12,
    cursor: 'pointer',
    color: '#475569',
    transition: 'background 0.15s',
  },
  form: {
    display: 'flex',
    gap: 10,
    padding: '12px 24px',
    background: '#fff',
    borderTop: '1px solid #e2e8f0',
    flexShrink: 0,
  },
  input: {
    flex: 1,
    padding: '10px 16px',
    borderRadius: 24,
    border: '1px solid #e2e8f0',
    fontSize: 14,
    outline: 'none',
    background: '#f8fafc',
  },
  sendBtn: {
    padding: '10px 20px',
    background: '#6366f1',
    color: '#fff',
    border: 'none',
    borderRadius: 24,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'opacity 0.15s',
  },
};
