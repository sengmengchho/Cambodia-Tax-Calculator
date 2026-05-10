import React, { useState } from 'react';
import { calcPrepayment } from '../services/api';
import ResultDisplay from '../components/ResultDisplay';

function PrepaymentTax() {
  const [revenue, setRevenue] = useState('');
  const [includesVat, setIncludesVat] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      setError('');
      if (!revenue) { setError('Please enter monthly revenue.'); return; }
      const res = await calcPrepayment({
        monthly_revenue: parseFloat(revenue),
        includes_vat: includesVat
      });
      setResult(res.data);
    } catch (err) {
      setError('Calculation failed. Is Flask running on port 5000?');
    }
  };

  const handleReset = () => {
    setRevenue('');
    setResult(null);
    setError('');
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>📈 Prepayment Tax Calculator</h3>
      <p style={styles.sub}>Tax 03 · ប្រាក់រំដោះពន្ធលើប្រាក់ចំណេញ</p>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.grid}>
        <div style={styles.group}>
          <label style={styles.label}>Monthly Revenue (KHR) · ចំណូលប្រចាំខែ</label>
          <input
            style={styles.input}
            type="number"
            placeholder="e.g. 50000000"
            value={revenue}
            onChange={e => setRevenue(e.target.value)}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Revenue Type · ប្រភេទចំណូល</label>
          <div style={styles.toggleRow}>
            <button
              style={includesVat ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesVat(true)}>
              Includes VAT (÷1.1)
            </button>
            <button
              style={!includesVat ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesVat(false)}>
              Excludes VAT
            </button>
          </div>
          <span style={styles.hint}>
            VAT-registered businesses divide revenue by 1.1 to get tax base
          </span>
        </div>
      </div>

      <div style={styles.noteBox}>
        💡 Prepayment tax = 1% of monthly revenue. This amount is credited
        against your annual Profit Tax (CIT) when filing in March.
      </div>

      <div style={styles.actions}>
        <button style={styles.btn} onClick={handleSubmit}>
          Calculate · គណនា
        </button>
        <button style={styles.resetBtn} onClick={handleReset}>
          Reset
        </button>
      </div>

      <ResultDisplay results={result} />
    </div>
  );
}

const styles = {
  box: { background: '#111827', borderRadius: '12px', padding: '2rem', border: '1px solid #1e2d45' },
  heading: { color: '#e8eaf0', fontFamily: 'serif', fontSize: '1.3rem', marginBottom: '4px' },
  sub: { color: '#8892a4', fontSize: '0.8rem', marginBottom: '1.5rem' },
  error: { padding: '10px', background: 'rgba(230,57,70,0.1)', border: '1px solid #e63946', borderRadius: '8px', color: '#e63946', fontSize: '0.85rem', marginBottom: '1rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  group: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.82rem', color: '#8892a4' },
  input: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#e8eaf0', fontSize: '0.9rem' },
  hint: { fontSize: '0.72rem', color: '#4a5568' },
  toggleRow: { display: 'flex', gap: '8px' },
  toggleOn: { flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: '#c9a84c', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  toggleOff: { flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer' },
  noteBox: { padding: '12px 16px', borderRadius: '8px', background: 'rgba(67,97,238,0.1)', border: '1px solid rgba(67,97,238,0.3)', color: '#8ba4ff', fontSize: '0.82rem', marginBottom: '1.5rem' },
  actions: { display: 'flex', gap: '10px' },
  btn: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #c9a84c, #8a6f30)', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' },
  resetBtn: { padding: '12px 20px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer', fontSize: '0.88rem' },
};

export default PrepaymentTax;