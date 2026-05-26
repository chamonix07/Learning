import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import PipelineTrace from './PipelineTrace';

interface Props {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div style={{ ...styles.row, justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && <div style={styles.avatar}>🤖</div>}

      <div style={{ ...styles.bubble, ...(isUser ? styles.userBubble : styles.aiBubble) }}>
        {message.loading ? (
          <span style={styles.loading}>Thinking…</span>
        ) : (
          <>
            <p style={styles.text}>{message.text}</p>
            {message.agentResponse && (
              <PipelineTrace response={message.agentResponse} />
            )}
          </>
        )}
      </div>

      {isUser && <div style={styles.avatar}>👤</div>}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16,
  },
  avatar: {
    fontSize: 24,
    flexShrink: 0,
    marginTop: 4,
  },
  bubble: {
    maxWidth: '75%',
    padding: '12px 16px',
    borderRadius: 16,
    lineHeight: 1.6,
  },
  userBubble: {
    background: '#6366f1',
    color: '#fff',
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    background: '#fff',
    color: '#1a1a2e',
    borderBottomLeftRadius: 4,
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  text: {
    margin: 0,
    whiteSpace: 'pre-wrap',
  },
  loading: {
    color: '#94a3b8',
    fontStyle: 'italic',
  },
};
