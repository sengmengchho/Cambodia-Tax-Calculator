import React from 'react';

function Reference() {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Tax Reference Guide</h1>
      <p style={styles.sub}>Quick reference for Cambodian tax rates and rules</p>

      <div style={styles.grid}>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>📊 Salary Tax Brackets (Resident)</h4>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Monthly Taxable Salary (KHR)</th>
                <th style={styles.th}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['0 – 1,500,000', '0%'],
                ['1,500,001 – 2,000,000', '5%'],
                ['2,000,001 – 8,500,000', '10%'],
                ['8,500,001 – 12,500,000', '15%'],
                ['> 12,500,000', '20%'],
              ].map(([range, rate]) => (
                <tr key={range}>
                  <td style={styles.td}>{range}</td>
                  <td style={{ ...styles.td, color: '#c9a84c', fontWeight: 'bold' }}>{rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={styles.note}>Non-Resident: Flat 20% on all Cambodian-source income</p>
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>📅 Filing Deadlines</h4>
          {[
            ['Monthly Declaration', '20th of next month'],
            ['Annual Patent Tax', 'March 31 each year'],
            ['Annual Profit Tax', 'March 31 (next year)'],
            ['Complaint Filing', 'Within 30 days'],
            ['GDT Resolution', 'Within 60 days'],
            ['Court Appeal', 'Within 30 days'],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.key}>{k}</span>
              <span style={styles.val}>{v}</span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>⚠️ Penalty Rates</h4>
          {[
            ['Minor Offense (fixed)', '2,000,000 KHR'],
            ['Underpayment < 10%', '10% + 1.5%/mo'],
            ['Underpayment ≥ 10%', '25% + 1.5%/mo'],
            ['No Accounting Records', '40% + 1.5%/mo'],
            ['Interest Rate', '1.5% per month'],
            ['Annual Patent Tax', '1,200,000 KHR/yr'],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.key}>{k}</span>
              <span style={{ ...styles.val, color: '#e63946' }}>{v}</span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>🏢 Taxpayer Categories</h4>
          {[
            ['Small Revenue', '250M – 700M KHR/yr'],
            ['Small Employees', '10 – 50 people'],
            ['Medium Revenue', '700M – 4,000M KHR/yr'],
            ['Medium Employees', '51 – 100 people'],
            ['Large Revenue', '> 4,000M KHR/yr'],
            ['Large (also)', 'Multinational / QIP'],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.key}>{k}</span>
              <span style={styles.val}>{v}</span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>💰 Deductions</h4>
          {[
            ['Non-working spouse', '150,000 KHR/mo'],
            ['Each qualifying child', '150,000 KHR/mo'],
            ['Child age limit', '< 14 years old'],
            ['Student child limit', '< 25 years old'],
            ['Fringe benefit tax', '20% (flat rate)'],
            ['Prepayment tax rate', '1% of revenue'],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.key}>{k}</span>
              <span style={styles.val}>{v}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2rem' },
  heading: { color: '#c9a84c', fontFamily: 'serif', fontSize: '2rem', marginBottom: '0.5rem' },
  sub: { color: '#8892a4', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' },
  card: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '12px', padding: '1.5rem' },
  cardTitle: { color: '#c9a84c', marginBottom: '1rem', fontSize: '1rem' },
  table: { width: '100%', borderCollapse: 'collapse', marginBottom: '10px' },
  th: { fontSize: '0.72rem', color: '#4a5568', textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #1e2d45' },
  td: { fontSize: '0.82rem', color: '#8892a4', padding: '7px 8px', borderBottom: '1px solid #0a0e1a' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '7px 10px', borderRadius: '6px', background: '#0a0e1a', marginBottom: '5px' },
  key: { fontSize: '0.82rem', color: '#8892a4' },
  val: { fontSize: '0.82rem', color: '#e8eaf0', fontWeight: '500' },
  note: { fontSize: '0.75rem', color: '#4a5568', marginTop: '8px' },
};

export default Reference;