"use client";

import React, { useState } from 'react';
import Reveal from './Reveal';

export default function QuantumSuperpowers() {
  const [superState, setSuperState] = useState<'super' | '0' | '1'>('super');
  const [entangled, setEntangled] = useState(true);
  const [entangleState, setEntangleState] = useState<'linked' | 'up' | 'down'>('linked');
  const [interferenceMode, setInterferenceMode] = useState<'constructive' | 'destructive'>('constructive');

  const observeSuper = () => {
    setSuperState(Math.random() < 0.5 ? '0' : '1');
  };

  const resetSuper = () => {
    setSuperState('super');
  };

  const measureEntanglement = () => {
    setEntangled(false);
    setEntangleState(Math.random() < 0.5 ? 'up' : 'down');
  };

  const reEntangle = () => {
    setEntangled(true);
    setEntangleState('linked');
  };

  const generateWave = (offset: number, amplitude: number, phase: number, freq: number = 0.05) => {
    let points = '';
    for (let x = 0; x <= 300; x += 2) {
      const y = offset + amplitude * Math.sin(x * freq + phase);
      points += `${x},${y} `;
    }
    return points;
  };

  const wave1Phase = 0;
  const wave2Phase = interferenceMode === 'constructive' ? 0 : Math.PI;

  const w1Points = generateWave(35, 15, wave1Phase);
  const w2Points = generateWave(35, 15, wave2Phase);
  
  let resPoints = '';
  for (let x = 0; x <= 300; x += 2) {
      const y1 = 15 * Math.sin(x * 0.05 + wave1Phase);
      const y2 = 15 * Math.sin(x * 0.05 + wave2Phase);
      resPoints += `${x},${35 + y1 + y2} `;
  }

  return (
    <Reveal as="section" className="chapter-section" variant="up">
      <div className="chapter-heading">
        <span className="chapter-index">03</span>
        <h2>The Three Quantum Superpowers</h2>
      </div>

      <div className="power-cards">
        
        {/* Superposition */}
        <div className="power-card glass-card superposition">
           <div className="power-icon">🌀</div>
           <h3>Superposition</h3>
           <p>A qubit exists in multiple states simultaneously until measured</p>
           <div className="power-demo-area">
              <div className={`super-particle ${superState === 'super' ? 'state-super' : (superState === '0' ? 'state-zero' : 'state-one')}`}>
              </div>
              <div className="super-label">
                 {superState === 'super' ? 'Superposition' : `State: ${superState}`}
              </div>
              <div>
                 <button onClick={observeSuper} disabled={superState !== 'super'}>Observe</button>
                 <button onClick={resetSuper} disabled={superState === 'super'}>Reset</button>
              </div>
           </div>
        </div>

        {/* Entanglement */}
        <div className="power-card glass-card entanglement">
           <div className="power-icon">🔗</div>
           <h3>Entanglement</h3>
           <p>Measuring one entangled particle instantly determines the other</p>
           <div className="power-demo-area">
              <div className="entangle-pair">
                 <div className={`entangle-particle ep-a ${entangleState === 'up' ? 'measured-up' : (entangleState === 'down' ? 'measured-down' : '')}`}></div>
                 <div className={`entangle-line ${entangled ? 'linked' : 'snapped'}`}></div>
                 <div className={`entangle-particle ep-b ${entangleState === 'up' ? 'measured-down' : (entangleState === 'down' ? 'measured-up' : '')}`}></div>
              </div>
              <div>
                 <button onClick={measureEntanglement} disabled={!entangled}>Measure Particle A</button>
                 <button onClick={reEntangle} disabled={entangled}>Re-entangle</button>
              </div>
           </div>
        </div>

        {/* Interference */}
        <div className="power-card glass-card interference">
           <div className="power-icon">〰️</div>
           <h3>Interference</h3>
           <p>Quantum waves amplify correct answers and cancel wrong ones</p>
           <div className="power-demo-area wave-demo">
              <svg className="wave-svg" viewBox="0 0 300 70">
                 <polyline points={w1Points} fill="none" stroke="#22c55e" strokeWidth="2" className="wave-constructive" />
                 <polyline points={w2Points} fill="none" stroke="#e879f9" strokeWidth="2" strokeDasharray="4" className="wave-destructive" />
                 <polyline points={resPoints} fill="none" stroke="#06b6d4" strokeWidth="4" className="wave-result" />
              </svg>
              <div>
                 <button onClick={() => setInterferenceMode(interferenceMode === 'constructive' ? 'destructive' : 'constructive')}>
                    {interferenceMode === 'constructive' ? 'Constructive' : 'Destructive'} Mode
                 </button>
              </div>
           </div>
        </div>

      </div>
    </Reveal>
  );
}
