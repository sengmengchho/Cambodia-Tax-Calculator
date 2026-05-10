import React, { useState } from 'react';
import { calcSalaryTax } from '../services/api';
import ResultDisplay from '../components/ResultDisplay';

function SalaryTax() {
  const [form, setForm] = useState({
    salary: '', dependents: 0,
    is_resident: true, fringe_benefits: 0, loan_advance: 0
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
      const res = await calcSalaryTax({
        salary: parseFloat(form.salary),
        dependents: parseInt(form.dependents),
        is_resident: form.is_resident,
        fringe_benefits: parseFloat(form.fringe_benefits) || 0,
        loan_advance: parseFloat(form.loan_advance) || 0
      });
      setResult(res.data);
    } catch (err) {
      setError('Calculation failed. Is Flask running?');
    }
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>💼 Salary Tax Calculator</h3>
      <p style={styles.sub}>Tax 02 · ពន្ធលើប្រាក់បៀវត្ស</p>

      {error && <div style={styles.error}>{error}</div>}

      <div style={styles.grid}>
        <div style={styles.group}>
          <label style={styles.label}>Monthly Salary (KHR)</label>
          <input style={styles.input} name="salary" type="number"
            placeholder="e.g. 2500000" onChange={handleChange}/>
        </div>
        <div style={styles.group}>
          <label style={styles.label}>Fringe Benefits (KHR)</label>
          <input style={styles.input} name="fringe_benefits" type="number"
            placeholder="e.g. 500000" onChange={handleChange} defaultValue="0"/>
        </div>
        <div style={styles.group}>
          <label style={styles.label}>Loan / Advance (KHR)</label>
          <input style={styles.input} name="loan_advance" type="number"
            placeholder="e.g. 0" onChange={handleChange} defaultValue="0"/>
        </div>
        <div style={styles.group}>
          <label style={styles.label}>Number of Dependents</label>
          <input style={styles.input} name="dependents" type="number"
            placeholder="e.g. 2" onChange={handleChange} defaultValue="0"/>
        </div>
        <div style={styles.group}>
          <label style={styles.label}>Residency Status</label>
          <div style={styles.toggleRow}>
            <button
              style={form.is_resident ? styles.toggleOn : styles.toggleOff}
              onClick={() => setForm(p => ({...p, is_resident: true}))}>
              Resident
            </button>
            <button
              style={!form.is_resident ? styles.toggleOn : styles.toggleOff}
              onClick={() => setForm(p => ({...p, is_resident: false}))}>
              Non-Resident
            </button>
          </div>
        </div>
      </div>

      <button style={styles.btn} onClick={handleSubmit}>
        Calculate Tax · គណនា
      </button>

      <ResultDisplay results={result}/>
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
  toggleRow: { display: 'flex', gap: '8px' },
  toggleOn: { flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: '#c9a84c', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  toggleOff: { flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer' },
  btn: { width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #c9a84c, #8a6f30)', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' }
};

export default SalaryTax;