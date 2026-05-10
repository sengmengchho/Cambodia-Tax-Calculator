import React, { useState } from 'react';
import TaxCard from '../components/TaxCard';
import SalaryTax from '../modules/SalaryTax';
import PrepaymentTax from '../modules/PrepaymentTax';
import PenaltyCalc from '../modules/PenaltyCalc';
import PatentTax from '../modules/PatentTax';
import LightingTax from '../modules/LightingTax';  // ← NEW
import SpecialTax from '../modules/SpecialTax';


function Home() {
  const [activeCalc, setActiveCalc] = useState(null);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>
      <h1 style={{ color: '#c9a84c', fontFamily: 'serif', fontSize: '2rem', marginBottom: '0.5rem' }}>
        Tax Calculators
      </h1>
      <p style={{ color: '#8892a4', marginBottom: '2rem' }}>Select a module to begin</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <TaxCard number="01" title="Penalty Calculator" titleKh="វិន័យពន្ធដារ"
          description="Calculate penalties and interest for late or underpaid taxes."
          tags={['Penalty', '1.5%/mo', 'Fixed Fine']}
          onOpen={() => setActiveCalc('penalty')} />
        <TaxCard number="02" title="Tax on Salary" titleKh="ពន្ធលើប្រាក់បៀវត្ស"
          description="Monthly salary tax for resident & non-resident employees."
          tags={['Monthly', 'Progressive', '0–20%']}
          onOpen={() => setActiveCalc('salary')} />
        <TaxCard number="03" title="Prepayment Tax" titleKh="ប្រាក់រំដោះពន្ធ"
          description="Monthly 1% prepayment on revenue. Credited against annual CIT."
          tags={['Monthly', '1% Rate', 'CIT Credit']}
          onOpen={() => setActiveCalc('prepayment')} />
        <TaxCard number="★" title="Patent Tax" titleKh="ពន្ធបា៉ាតង់"
          description="Annual patent tax with penalties for late filing."
          tags={['Annual', '1.2M KHR', 'Penalty']}
          onOpen={() => setActiveCalc('patent')} />

        {/* ← NEW CARD */}
        <TaxCard number="💡" title="Public Lighting Tax" titleKh="អាករបំភ្លឺសាធារណៈ"
          description="Calculate 5% public lighting tax on monthly revenue for eligible businesses."
          tags={['Sub-national', '5% Rate', 'Monthly']}
          onOpen={() => setActiveCalc('lighting')} />
        <TaxCard number="🏷️" title="Special Tax" titleKh="អាករពិសេស"
          description="Beer, Wine, Cigarette, Beverage, Casino. Cement exempted 2025–2026."
          tags={['Beer 30%', 'Wine 35%', 'Cigarette 25%']}
          onOpen={() => setActiveCalc('special')} />


        
      </div>

      {activeCalc === 'penalty'    && <PenaltyCalc />}
      {activeCalc === 'salary'     && <SalaryTax />}
      {activeCalc === 'prepayment' && <PrepaymentTax />}
      {activeCalc === 'patent'     && <PatentTax />}
      {activeCalc === 'lighting'   && <LightingTax />}  {/* ← NEW */}
      {activeCalc === 'special' && <SpecialTax />}
    </div>
  );
}

export default Home;