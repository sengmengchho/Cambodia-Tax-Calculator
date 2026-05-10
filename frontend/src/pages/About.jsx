import React from 'react';

function About() {
  const milestones = [
    { weeks: 'Week 1–2', task: 'Project setup, Flask API, Home dashboard', status: 'done' },
    { weeks: 'Week 3–4', task: 'Salary Tax calculator (Tax 02)', status: 'done' },
    { weeks: 'Week 5–6', task: 'Prepayment Tax (Tax 03)', status: 'active' },
    { weeks: 'Week 7–8', task: 'PDF export, bilingual UI, polish', status: 'pending' },
    { weeks: 'Week 9–10', task: 'Testing, deployment, final report', status: 'pending' },
  ];

  const statusColor = { done: '#2a9d8f', active: '#c9a84c', pending: '#4a5568' };
  const statusLabel = { done: '✅ Done', active: '🔄 In Progress', pending: '⏳ Pending' };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>About This Project</h1>
      <p style={styles.sub}>Course information and team progress</p>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h4 style={styles.cardTitle}>📚 Course Info</h4>
          {[
            ['Subject', 'Economy for Engineer'],
            ['Department', 'Applied Math & Statistics'],
            ['Institution', 'ITC Cambodia'],
            ['Lecturer', 'Mr. TOUCH Sopheak'],
            ['Academic Year', '2025–2026'],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.key}>{k}</span>
              <span style={styles.val}>{v}</span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>⚙️ Tech Stack</h4>
          {[
            ['Frontend', 'React.js'],
            ['Backend', 'Python + Flask'],
            ['API', 'REST / JSON'],
            ['PDF Export', 'ReportLab'],
            ['Deployment', 'Vercel + Render'],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.key}>{k}</span>
              <span style={styles.val}>{v}</span>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h4 style={styles.cardTitle}>📦 Module Status</h4>
          {[
            ['Tax 01 – General Info', '✅ Done'],
            ['Tax 02 – Salary Tax', '✅ Done'],
            ['Tax 03 – Prepayment', '✅ Done'],
            ['Tax 04 – Module 4', '⏳ Pending'],
            ['Tax 05 – Module 5', '⏳ Pending'],
          ].map(([k, v]) => (
            <div key={k} style={styles.row}>
              <span style={styles.key}>{k}</span>
              <span style={styles.val}>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h4 style={styles.cardTitle}>📅 Bi-Weekly Progress</h4>
        {milestones.map((m, i) => (
          <div key={i} style={styles.milestone}>
            <span style={styles.weeks}>{m.weeks}</span>
            <span style={styles.task}>{m.task}</span>
            <span style={{ color: statusColor[m.status], fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              {statusLabel[m.status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { maxWidth: '1100px', margin: '0 auto', padding: '2rem' },
  heading: { color: '#c9a84c', fontFamily: 'serif', fontSize: '2rem', marginBottom: '0.5rem' },
  sub: { color: '#8892a4', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' },
  card: { background: '#111827', border: '1px solid #1e2d45', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.25rem' },
  cardTitle: { color: '#c9a84c', marginBottom: '1rem', fontSize: '1rem' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '7px 10px', borderRadius: '6px', background: '#0a0e1a', marginBottom: '5px' },
  key: { fontSize: '0.82rem', color: '#8892a4' },
  val: { fontSize: '0.82rem', color: '#e8eaf0', fontWeight: '500' },
  milestone: { display: 'flex', alignItems: 'center', gap: '14px', padding: '10px', borderRadius: '8px', background: '#0a0e1a', marginBottom: '6px' },
  weeks: { fontSize: '0.75rem', color: '#8892a4', width: '90px', flexShrink: 0 },
  task: { flex: 1, fontSize: '0.83rem', color: '#8892a4' },
};

export default About;