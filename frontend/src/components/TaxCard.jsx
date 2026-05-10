import React from 'react';

function TaxCard({ number, title, titleKh, description, tags, onOpen, comingSoon }) {
  return (
    <div style={styles.card}>
      <div style={styles.num}>Tax Module {number}</div>
      <div style={styles.title}>{title}</div>
      <div style={styles.titleKh}>{titleKh}</div>
      <div style={styles.desc}>{description}</div>
      <div style={styles.tags}>
        {tags.map(t => (
          <span key={t} style={comingSoon ? styles.tagGray : styles.tag}>{t}</span>
        ))}
      </div>
      <button
        style={comingSoon ? styles.btnDisabled : styles.btn}
        onClick={onOpen}
        disabled={comingSoon}
      >
        {comingSoon ? 'Coming Soon' : 'Open Calculator'}
      </button>
    </div>
  );
}

const styles = {
  card: {
    background: '#111827', border: '1px solid #1e2d45',
    borderRadius: '12px', padding: '1.5rem',
    display: 'flex', flexDirection: 'column', gap: '8px'
  },
  num: { fontSize: '0.72rem', color: '#c9a84c', textTransform: 'uppercase' },
  title: { fontSize: '1.1rem', color: '#e8eaf0', fontWeight: 'bold' },
  titleKh: { fontSize: '0.85rem', color: '#8a6f30' },
  desc: { fontSize: '0.82rem', color: '#8892a4', lineHeight: '1.5' },
  tags: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  tag: { padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', background: 'rgba(201,168,76,0.1)', border: '1px solid #8a6f30', color: '#c9a84c' },
  tagGray: { padding: '2px 10px', borderRadius: '20px', fontSize: '0.72rem', background: '#1a2235', border: '1px solid #4a5568', color: '#4a5568' },
  btn: { marginTop: '8px', padding: '10px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #c9a84c, #8a6f30)', color: '#000', fontWeight: 'bold', cursor: 'pointer' },
  btnDisabled: { marginTop: '8px', padding: '10px', borderRadius: '8px', border: 'none', background: '#1e2d45', color: '#4a5568', cursor: 'not-allowed' }
};

export default TaxCard;
