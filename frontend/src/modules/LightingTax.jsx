import React, { useState } from 'react';
import axios from 'axios';
import ResultDisplay from '../components/ResultDisplay';

const BASE = "http://127.0.0.1:5000/api";

const PRODUCTS = [
  { key: 'wine',      label: 'ស្រា (Wine / Liquor)',      emoji: '🍷', eligible: true  },
  { key: 'beer',      label: 'Beer',                       emoji: '🍺', eligible: true  },
  { key: 'cigarette', label: 'បារី (Cigarette)',           emoji: '🚬', eligible: true  },
  { key: 'beverage',  label: 'ភេសជ្ជៈ (Sugary Beverage)', emoji: '🥤', eligible: true  },
  { key: 'cement',    label: 'ស៊ីម៉ង់ត៍ (Cement)',        emoji: '🏗️', eligible: false },
  { key: 'other',     label: 'Other Product',              emoji: '📦', eligible: false },
];

function LightingTax() {
  const [product, setProduct] = useState('beer');
  const [revenue, setRevenue] = useState('');
  const [includesVat, setIncludesVat] = useState(true);
  const [includesLighting, setIncludesLighting] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const selectedProduct = PRODUCTS.find(p => p.key === product);

  const handleSubmit = async () => {
    try {
      setError('');
      if (!revenue) { setError('Please enter revenue amount.'); return; }
      const res = await axios.post(`${BASE}/lighting-tax`, {
        product,
        revenue: parseFloat(revenue),
        includes_vat: includesVat,
        includes_lighting: includesLighting
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
      <h3 style={styles.heading}>💡 Public Lighting Tax Calculator</h3>
      <p style={styles.sub}>អាករសម្រាប់បំភ្លឺសាធារណៈ · Rate: 5%</p>

      {error && <div style={styles.error}>{error}</div>}

      {/* ELIGIBLE PRODUCTS TABLE */}
      <div style={styles.eligibleBox}>
        <div style={styles.eligibleTitle}>
          ទំនិញជាប់អាករបំភ្លឺ · Products Subject to Lighting Tax
        </div>
        <div style={styles.productGrid}>
          {PRODUCTS.map(p => (
            <div
              key={p.key}
              onClick={() => { setProduct(p.key); setResult(null); }}
              style={{
                ...styles.productItem,
                ...(product === p.key ? styles.productActive : {}),
                ...(!p.eligible ? styles.productIneligible : {})
              }}
            >
              <span style={styles.productEmoji}>{p.emoji}</span>
              <span style={styles.productName}>{p.label}</span>
              {p.eligible
                ? <span style={styles.eligibleBadge}>✅ 5%</span>
                : <span style={styles.ineligibleBadge}>❌ Exempt</span>
              }
            </div>
          ))}
        </div>
      </div>

      {/* NOT ELIGIBLE WARNING */}
      {!selectedProduct?.eligible && (
        <div style={styles.warningBox}>
          ❌ <strong>{selectedProduct?.label}</strong> is <strong>NOT subject</strong> to
          Public Lighting Tax. This tax only applies to:
          ស្រា, Beer, បារី, and ភេសជ្ជៈ.
        </div>
      )}

      {/* EXAMPLE BOX */}
      <div style={styles.exampleBox}>
        <div style={styles.exampleTitle}>📖 Example · Beer Shop</div>
        <div style={styles.exampleRow}>
          <span>Revenue (incl. VAT + Lighting)</span>
          <span>$2,100</span>
        </div>
        <div style={styles.exampleRow}>
          <span>Tax Base = 2,100 ÷ (1.1 × 1.05)</span>
          <span>≈ $1,818.18</span>
        </div>
        <div style={styles.exampleRow}>
          <span>Lighting Tax = 1,818.18 × 5%</span>
          <span style={{ color: '#c9a84c', fontWeight: 'bold' }}>≈ $90.91</span>
        </div>
      </div>

      <div style={styles.grid}>
        <div style={styles.group}>
          <label style={styles.label}>
            Selected Product · {selectedProduct?.emoji} {selectedProduct?.label}
          </label>
          <select
            style={styles.select}
            value={product}
            onChange={e => { setProduct(e.target.value); setResult(null); }}
          >
            {PRODUCTS.map(p => (
              <option key={p.key} value={p.key}>
                {p.emoji} {p.label} {p.eligible ? '— 5%' : '— Not Eligible'}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Revenue Amount (KHR) · ចំណូល</label>
          <input
            style={styles.input}
            type="number"
            placeholder="e.g. 2100"
            value={revenue}
            onChange={e => setRevenue(e.target.value)}
            disabled={!selectedProduct?.eligible}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Revenue includes VAT (10%)?</label>
          <div style={styles.toggleRow}>
            <button
              style={includesVat ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesVat(true)}
              disabled={!selectedProduct?.eligible}>
              Yes · មាន VAT
            </button>
            <button
              style={!includesVat ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesVat(false)}
              disabled={!selectedProduct?.eligible}>
              No · គ្មាន VAT
            </button>
          </div>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Revenue includes Lighting Tax?</label>
          <div style={styles.toggleRow}>
            <button
              style={includesLighting ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesLighting(true)}
              disabled={!selectedProduct?.eligible}>
              Yes · រួមហើយ
            </button>
            <button
              style={!includesLighting ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesLighting(false)}
              disabled={!selectedProduct?.eligible}>
              No · មិនរួម
            </button>
          </div>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Formula</label>
          <div style={styles.formulaBox}>
            {selectedProduct?.eligible
              ? includesVat && includesLighting
                ? 'Tax Base = Revenue ÷ (1.1 × 1.05)\nLighting Tax = Tax Base × 5%'
                : includesVat && !includesLighting
                ? 'Tax Base = Revenue ÷ 1.1\nLighting Tax = Tax Base × 5%'
                : 'Tax Base = Revenue\nLighting Tax = Tax Base × 5%'
              : '❌ This product is not subject to Public Lighting Tax'
            }
          </div>
        </div>
      </div>

      <div style={styles.actions}>
        <button
          style={selectedProduct?.eligible ? styles.btn : styles.btnDisabled}
          onClick={handleSubmit}
          disabled={!selectedProduct?.eligible}>
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
  eligibleBox: { background: '#0a0e1a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #1e2d45' },
  eligibleTitle: { fontSize: '0.75rem', color: '#4a5568', textTransform: 'uppercase', marginBottom: '10px' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' },
  productItem: { padding: '10px', borderRadius: '8px', background: '#111827', border: '1px solid #1e2d45', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '4px', transition: 'all 0.2s' },
  productActive: { border: '1px solid #c9a84c', background: 'rgba(201,168,76,0.08)' },
  productIneligible: { opacity: 0.5, cursor: 'not-allowed' },
  productEmoji: { fontSize: '1.3rem' },
  productName: { fontSize: '0.75rem', color: '#8892a4' },
  eligibleBadge: { fontSize: '0.7rem', color: '#2a9d8f', fontWeight: 'bold' },
  ineligibleBadge: { fontSize: '0.7rem', color: '#e63946' },
  warningBox: { padding: '12px 16px', borderRadius: '8px', background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.3)', color: '#e63946', fontSize: '0.83rem', marginBottom: '1.5rem' },
  exampleBox: { padding: '1rem', background: '#0a0e1a', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid #1e2d45' },
  exampleTitle: { fontSize: '0.78rem', color: '#4a5568', textTransform: 'uppercase', marginBottom: '8px' },
  exampleRow: { display: 'flex', justifyContent: 'space-between', fontSize: '0.83rem', color: '#8892a4', padding: '5px 0', borderBottom: '1px solid #1e2d45' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  group: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.82rem', color: '#8892a4' },
  input: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#e8eaf0', fontSize: '0.9rem' },
  select: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#e8eaf0', fontSize: '0.9rem' },
  formulaBox: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#8892a4', fontSize: '0.78rem', lineHeight: '2', whiteSpace: 'pre-line', gridColumn: 'span 2' },
  toggleRow: { display: 'flex', gap: '8px' },
  toggleOn: { flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: '#c9a84c', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  toggleOff: { flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer' },
  actions: { display: 'flex', gap: '10px' },
  btn: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #c9a84c, #8a6f30)', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' },
  btnDisabled: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#1e2d45', color: '#4a5568', fontSize: '0.95rem', cursor: 'not-allowed' },
  resetBtn: { padding: '12px 20px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer', fontSize: '0.88rem' },
};

export default LightingTax;