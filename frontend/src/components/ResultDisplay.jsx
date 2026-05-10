import React from 'react';

function ResultDisplay({ results }) {
  if (!results) return null;

  const fmt = (n) => Number(n).toLocaleString('en-US') + ' KHR';

  return (
    <div style={styles.panel}>
      <div style={styles.title}>📊 Calculation Results</div>
      {Object.entries(results).map(([key, value]) => (
        <div key={key} style={styles.row}>
          <span style={styles.key}>{key.replace(/_/g, ' ')}</span>
          <span style={styles.val}>
            {typeof value === 'number' ? fmt(value) : String(value)}
          </span>
        </div>
      ))}
    </div>
  );
}

const styles = {
  panel: { marginTop: '1.5rem', padding: '1.5rem', background: '#0a0e1a', borderRadius: '12px', border: '1px solid #1e2d45' },
  title: { fontSize: '0.78rem', color: '#4a5568', textTransform: 'uppercase', marginBottom: '1rem' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '8px', background: '#111827', marginBottom: '6px' },
  key: { fontSize: '0.85rem', color: '#8892a4', textTransform: 'capitalize' },
  val: { fontSize: '0.92rem', fontWeight: '600', color: '#e8eaf0' }
};

export default ResultDisplay;
