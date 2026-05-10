import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Reference from './pages/Reference';
import About from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <div style={{ background: '#0a0e1a', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;