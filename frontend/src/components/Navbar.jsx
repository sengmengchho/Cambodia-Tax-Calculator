import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>🏛️ Cambodia Tax Calculator</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/reference" style={styles.link}>Reference</Link>
        <Link to="/about" style={styles.link}>About</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#111827',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #1e2d45'
  },
  brand: { color: '#c9a84c', fontWeight: 'bold', fontSize: '1.1rem' },
  links: { display: 'flex', gap: '1.5rem' },
  link: { color: '#8892a4', textDecoration: 'none', fontSize: '0.9rem' }
};

export default Navbar;