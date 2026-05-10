import React, { useState } from 'react';
import { calcPenalty } from '../services/api';
import ResultDisplay from '../components/ResultDisplay';

function PenaltyCalc() {
  const [form, setForm] = useState({
    tax_due: '',
    tax_paid: '0',
    months_overdue: '0',
  });
  const [hasAccounting, setHasAccounting] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError('');
      if (!form.tax_due) { setError('Please enter the correct tax amount due.'); return; }
      const res = await calcPenalty({
        tax_due: parseFloat(form.tax_due),
        tax_paid: parseFloat(form.tax_paid) || 0,
        months_overdue: parseInt(form.months_overdue) || 0,
        has_accounting_records: hasAccounting
      });
      setResult(res.data);
    } catch (err) {
      setError('Calculation failed. Is Flask running on port 5000?');
    }
  };

  const handleReset = () => {
    setForm({ tax_due: '', tax_paid: '0', months_overdue: '0' });
    setResult(null);
    setError('');
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>⚠️ Penalty & Interest Calculator</h3>
      <p style={styles.sub}>Tax 01 · វិន័យពន្ធដារ</p>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.grid}>
        <div style={styles.group}>
          <label style={styles.label}>Correct Tax Due (KHR)</label>
          <input
            style={styles.input} type="number" name="tax_due"
            placeholder="e.g. 8000000"
            value={form.tax_due} onChange={handleChange}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Tax Already Paid (KHR)</label>
          <input
            style={styles.input} type="number" name="tax_paid"
            placeholder="e.g. 0"
            value={form.tax_paid} onChange={handleChange}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Months Overdue · ចំនួនខែយឺត</label>
          <input
            style={styles.input} type="number" name="months_overdue"
            placeholder="e.g. 22"
            value={form.months_overdue} onChange={handleChange}
          />
          <span style={styles.hint}>Count from month tax was due until now</span>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Accounting Records Available?</label>
          <div style={styles.toggleRow}>
            <button
              style={hasAccounting ? styles.toggleOn : styles.toggleOff}
              onClick={() => setHasAccounting(true)}>
              Yes · មាន
            </button>
            <button
              style={!hasAccounting ? styles.toggleDanger : styles.toggleOff}
              onClick={() => setHasAccounting(false)}>
              No · គ្មាន (40%)
            </button>
          </div>
          <span style={styles.hint}>No records = 40% penalty (unilateral assessment)</span>
        </div>
      </div>

      <div style={styles.penaltyGuide}>
        <div style={styles.guideTitle}>Penalty Reference</div>
        <div style={styles.guideRow}>
          <span>Underpayment &lt; 10%</span><span style={{color:'#c9a84c'}}>10% + 1.5%/mo</span>
        </div>
        <div style={styles.guideRow}>
          <span>Underpayment ≥ 10%</span><span style={{color:'#e63946'}}>25% + 1.5%/mo</span>
        </div>
        <div style={styles.guideRow}>
          <span>No accounting records</span><span style={{color:'#e63946'}}>40% + 1.5%/mo</span>
        </div>
        <div style={styles.guideRow}>
          <span>Minor offense fine (fixed)</span><span style={{color:'#e63946'}}>2,000,000 KHR</span>
        </div>
      </div>

      <div style={styles.actions}>
        <button style={styles.btn} onClick={handleSubmit}>
          Calculate Penalty · គណនា
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
  toggleDanger: { flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: '#e63946', color: '#fff', fontWeight: 'bold', cursor: 'pointer' },
  penaltyGuide: { padding: '1rem', background: '#0a0e1a', borderRadius: '8px', marginBottom: '1.5rem' },
  guideTitle: { fontSize: '0.75rem', color: '#4a5568', textTransform: 'uppercase', marginBottom: '8px' },
  guideRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#8892a4', padding: '4px 0', borderBottom: '1px solid #1e2d45' },
  actions: { display: 'flex', gap: '10px' },
  btn: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #c9a84c, #8a6f30)', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' },
  resetBtn: { padding: '12px 20px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer', fontSize: '0.88rem' },
};

export default PenaltyCalc;