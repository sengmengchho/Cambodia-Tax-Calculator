import React, { useState } from 'react';
import { calcPatentTax } from '../services/api';
import ResultDisplay from '../components/ResultDisplay';

function PatentTax() {
  const [form, setForm] = useState({
    taxpayer_size: 'small',
    years_unpaid: '1',
    months_overdue: '0',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      setError('');
      const res = await calcPatentTax({
        taxpayer_size: form.taxpayer_size,
        years_unpaid: parseInt(form.years_unpaid) || 1,
        months_overdue: parseInt(form.months_overdue) || 0,
      });
      setResult(res.data);
    } catch (err) {
      setError('Calculation failed. Is Flask running on port 5000?');
    }
  };

  const handleReset = () => {
    setForm({ taxpayer_size: 'small', years_unpaid: '1', months_overdue: '0' });
    setResult(null);
    setError('');
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>📋 Patent Tax Calculator</h3>
      <p style={styles.sub}>ពន្ធប៉ាតង់ · Annual 1,200,000 KHR/year</p>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.infoBox}>
        📌 Patent tax must be paid every year by <strong>March 31</strong>.
        Fixed amount: <strong>1,200,000 KHR/year</strong> regardless of taxpayer size.
      </div>

      <div style={styles.grid}>
        <div style={styles.group}>
          <label style={styles.label}>Taxpayer Size · ប្រភេទអ្នកជាប់ពន្ធ</label>
          <select style={styles.select} name="taxpayer_size" value={form.taxpayer_size} onChange={handleChange}>
            <option value="small">Small · តូច (250M–700M KHR/yr)</option>
            <option value="medium">Medium · មធ្យម (700M–4,000M KHR/yr)</option>
            <option value="large">Large · ធំ (&gt; 4,000M KHR/yr)</option>
          </select>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Years of Unpaid Patent Tax</label>
          <input
            style={styles.input} type="number" name="years_unpaid"
            min="1" value={form.years_unpaid} onChange={handleChange}
          />
          <span style={styles.hint}>Annual patent tax = 1,200,000 KHR × years</span>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Months Overdue Since Last Deadline</label>
          <input
            style={styles.input} type="number" name="months_overdue"
            min="0" value={form.months_overdue} onChange={handleChange}
          />
          <span style={styles.hint}>Used to calculate 1.5%/month interest</span>
        </div>
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
  infoBox: { padding: '12px 16px', borderRadius: '8px', background: 'rgba(201,168,76,0.08)', border: '1px solid #8a6f30', color: '#c9a84c', fontSize: '0.83rem', marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  group: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.82rem', color: '#8892a4' },
  input: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#e8eaf0', fontSize: '0.9rem' },
  select: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#e8eaf0', fontSize: '0.9rem' },
  hint: { fontSize: '0.72rem', color: '#4a5568' },
  actions: { display: 'flex', gap: '10px' },
  btn: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #c9a84c, #8a6f30)', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' },
  resetBtn: { padding: '12px 20px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer', fontSize: '0.88rem' },
};

export default PatentTax;