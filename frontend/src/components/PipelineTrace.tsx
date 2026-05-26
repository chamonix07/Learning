import React, { useState } from 'react';
import { AgentResponse } from '../types';

interface Props {
  response: AgentResponse;
}

const STEP_COLORS: Record<number, string> = {
  1: '#6366f1',
  2: '#f59e0b',
  3: '#10b981',
  4: '#3b82f6',
};

/**
 * Collapsible panel that shows the full pipeline trace:
 * intent, retrieved sources, and each step's output.
 */
export default function PipelineTrace({ response }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.wrapper}>
      {/* Summary badges */}
      <div style={styles.badges}>
        <span style={{ ...styles.badge, background: '#6366f120', color: '#6366f1' }}>
          🎯 Intent: <strong>{response.intent}</strong>
        </span>
        <span style={{ ...styles.badge, background: '#10b98120', color: '#10b981' }}>
          📄 Sources: {response.retrievedSources.join(', ') || 'none'}
        </span>
        <span style={{ ...styles.badge, background: '#f59e0b20', color: '#b45309' }}>
          🔒 Confidence: {response.confidence}
        </span>
      </div>

      {/* Toggle trace */}
      <button style={styles.toggle} onClick={() => setOpen((o) => !o)}>
        {open ? '▲ Hide pipeline trace' : '▼ Show pipeline trace'}
      </button>

      {open && (
        <div style={styles.trace}>
          {response.pipeline.map((step) => (
            <div key={step.step} style={styles.step}>
              <div style={{ ...styles.stepHeader, borderLeft: `4px solid ${STEP_COLORS[step.step] ?? '#888'}` }}>
                <span style={{ color: STEP_COLORS[step.step] ?? '#888', fontWeight: 700 }}>
                  Step {step.step}
                </span>
                <span style={styles.stepName}>{step.name}</span>
              </div>
              <pre style={styles.pre}>{JSON.stringify(step.output, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    marginTop: 8,
    fontSize: 13,
  },
  badges: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  badge: {
    padding: '2px 10px',
    borderRadius: 20,
    fontSize: 12,
  },
  toggle: {
    background: 'none',
    border: 'none',
    color: '#6366f1',
    cursor: 'pointer',
    fontSize: 12,
    padding: 0,
    marginBottom: 6,
  },
  trace: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  step: {
    background: '#f8fafc',
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
  },
  stepHeader: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    padding: '6px 12px',
    background: '#f1f5f9',
  },
  stepName: {
    color: '#475569',
  },
  pre: {
    padding: '8px 12px',
    fontSize: 11,
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    color: '#334155',
    margin: 0,
  },
};
