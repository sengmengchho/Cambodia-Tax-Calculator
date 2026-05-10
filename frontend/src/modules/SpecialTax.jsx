import React, { useState } from 'react';
import axios from 'axios';
import ResultDisplay from '../components/ResultDisplay';

const BASE = "http://127.0.0.1:5000/api";

const PRODUCTS = [
  { key: 'wine',      label: 'ស្រា (Wine / Liquor)',     rate: '35%', emoji: '🍷' },
  { key: 'beer',      label: 'Beer 🍺',                   rate: '30%', emoji: '🍺', note: '90% rule' },
  { key: 'cigarette', label: 'បារី (Cigarette)',          rate: '25%', emoji: '🚬' },
  { key: 'beverage',  label: 'ភេសជ្ជៈ (Beverage)',       rate: '20%', emoji: '🥤' },
  { key: 'casino',    label: 'កាស្បូ (Casino)',           rate: '10%', emoji: '🎰' },
  { key: 'cement',    label: 'ស៊ីម៉ង់ត៍ (Cement)',       rate: '5%',  emoji: '🏗️', exempted: true },
];

function SpecialTax() {
  const [product, setProduct] = useState('beer');
  const [price, setPrice] = useState('');
  const [includesVat, setIncludesVat] = useState(true);
  const [includesSpecial, setIncludesSpecial] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const selectedProduct = PRODUCTS.find(p => p.key === product);

  const handleSubmit = async () => {
    try {
      setError('');
      if (!price) { setError('Please enter selling price.'); return; }
      const res = await axios.post(`${BASE}/special-tax`, {
        product,
        selling_price: parseFloat(price),
        includes_vat: includesVat,
        includes_special_tax: includesSpecial
      });
      setResult(res.data);
    } catch (err) {
      setError('Calculation failed. Is Flask running on port 5000?');
    }
  };

  const handleReset = () => {
    setPrice('');
    setResult(null);
    setError('');
  };

  return (
    <div style={styles.box}>
      <h3 style={styles.heading}>🏷️ Special Tax Calculator</h3>
      <p style={styles.sub}>អាករពិសេស · Specific Tax on Selected Goods</p>

      {error && <div style={styles.error}>{error}</div>}

      {/* RATE TABLE */}
      <div style={styles.rateTable}>
        <div style={styles.rateTitle}>អត្រាអាករពិសេស · Special Tax Rates</div>
        <div style={styles.rateGrid}>
          {PRODUCTS.map(p => (
            <div
              key={p.key}
              style={{
                ...styles.rateItem,
                ...(product === p.key ? styles.rateItemActive : {}),
                ...(p.exempted ? styles.rateItemExempted : {})
              }}
              onClick={() => setProduct(p.key)}
            >
              <span style={styles.rateEmoji}>{p.emoji}</span>
              <span style={styles.rateName}>{p.label}</span>
              <span style={styles.rateVal}>{p.rate}</span>
              {p.note && <span style={styles.rateNote}>{p.note}</span>}
              {p.exempted && <span style={styles.exemptBadge}>Exempted 2025–2026</span>}
            </div>
          ))}
        </div>
      </div>

      {/* CEMENT WARNING */}
      {product === 'cement' && (
        <div style={styles.warningBox}>
          ⚠️ <strong>ស៊ីម៉ង់ត៍ (Cement)</strong> is exempted from Special Tax
          from <strong>2025 to end of 2026</strong>. Tax will apply starting <strong>2027</strong>.
          The result will show 0 tax for current year.
        </div>
      )}

      {/* BEER NOTE */}
      {product === 'beer' && (
        <div style={styles.beerBox}>
          🍺 <strong>Beer special rule:</strong> Special tax is calculated on
          <strong> 90%</strong> of the tax base (not 100%).
          Formula: Tax Base × 90% × 30%
        </div>
      )}

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
                {p.emoji} {p.label} — {p.rate}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Selling Price (KHR) · តម្លៃលក់</label>
          <input
            style={styles.input}
            type="number"
            placeholder="e.g. 10000000"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Price includes VAT (10%)?</label>
          <div style={styles.toggleRow}>
            <button
              style={includesVat ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesVat(true)}>
              Yes · រួម VAT
            </button>
            <button
              style={!includesVat ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesVat(false)}>
              No · មិនរួម
            </button>
          </div>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Price includes Special Tax?</label>
          <div style={styles.toggleRow}>
            <button
              style={includesSpecial ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesSpecial(true)}>
              Yes · រួមហើយ
            </button>
            <button
              style={!includesSpecial ? styles.toggleOn : styles.toggleOff}
              onClick={() => setIncludesSpecial(false)}>
              No · មិនរួម
            </button>
          </div>
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Formula Preview</label>
          <div style={styles.formulaBox}>
            {product === 'beer'
              ? `Tax Base = Price ÷ (${includesVat ? '1.1 × ' : ''}${includesSpecial ? '1.30' : '1'})
Effective Base = Tax Base × 90%
Special Tax = Effective Base × 30%`
              : `Tax Base = Price ÷ (${includesVat ? '1.1' : ''}${includesSpecial ? ` × ${(1 + (PRODUCTS.find(p=>p.key===product)?.rate.replace('%','') / 100)).toFixed(2)}` : ''})
Special Tax = Tax Base × ${selectedProduct?.rate}`
            }
          </div>
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
  rateTable: { background: '#0a0e1a', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #1e2d45' },
  rateTitle: { fontSize: '0.75rem', color: '#4a5568', textTransform: 'uppercase', marginBottom: '10px' },
  rateGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '8px' },
  rateItem: { padding: '10px', borderRadius: '8px', background: '#111827', border: '1px solid #1e2d45', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '3px', transition: 'all 0.2s' },
  rateItemActive: { border: '1px solid #c9a84c', background: 'rgba(201,168,76,0.08)' },
  rateItemExempted: { opacity: 0.6 },
  rateEmoji: { fontSize: '1.2rem' },
  rateName: { fontSize: '0.75rem', color: '#8892a4' },
  rateVal: { fontSize: '0.9rem', color: '#c9a84c', fontWeight: 'bold' },
  rateNote: { fontSize: '0.68rem', color: '#4361ee' },
  exemptBadge: { fontSize: '0.65rem', color: '#e63946', background: 'rgba(230,57,70,0.1)', padding: '2px 6px', borderRadius: '4px', marginTop: '2px' },
  warningBox: { padding: '12px 16px', borderRadius: '8px', background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.3)', color: '#e63946', fontSize: '0.83rem', marginBottom: '1.5rem' },
  beerBox: { padding: '12px 16px', borderRadius: '8px', background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.3)', color: '#8ba4ff', fontSize: '0.83rem', marginBottom: '1.5rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
  group: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '0.82rem', color: '#8892a4' },
  input: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#e8eaf0', fontSize: '0.9rem' },
  select: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#e8eaf0', fontSize: '0.9rem' },
  formulaBox: { padding: '10px 14px', borderRadius: '8px', background: '#0a0e1a', border: '1px solid #1e2d45', color: '#8892a4', fontSize: '0.78rem', lineHeight: '2', whiteSpace: 'pre-line' },
  toggleRow: { display: 'flex', gap: '8px' },
  toggleOn: { flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: '#c9a84c', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  toggleOff: { flex: 1, padding: '9px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer' },
  actions: { display: 'flex', gap: '10px' },
  btn: { flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #c9a84c, #8a6f30)', color: '#000', fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer' },
  resetBtn: { padding: '12px 20px', borderRadius: '8px', border: '1px solid #1e2d45', background: 'transparent', color: '#8892a4', cursor: 'pointer', fontSize: '0.88rem' },
};

export default SpecialTax;