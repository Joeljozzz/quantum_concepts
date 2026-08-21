"use client";

import React, { useState } from 'react';
import Reveal from './Reveal';

export default function BitsVsQubits() {
  const [bitValue, setBitValue] = useState<0 | 1>(0);
  const [qubitState, setQubitState] = useState<'0' | '1' | 'superposition'>('0');

  const putInSuperposition = () => {
    setQubitState('superposition');
  };

  const measureQubit = () => {
    const result = Math.random() < 0.5 ? '0' : '1';
    setQubitState(result);
  };

  const probZero = qubitState === 'superposition' ? 50 : (qubitState === '0' ? 100 : 0);
  const probOne = qubitState === 'superposition' ? 50 : (qubitState === '1' ? 100 : 0);

  return (
    <Reveal as="section" className="chapter-section" variant="up">
      <div className="chapter-heading">
        <span className="chapter-index">02</span>
        <h2>Bits vs Qubits: A Fundamental Difference</h2>
      </div>

      <div className="bits-compare">
        <div className="bit-demo">
           <div className="coin-container">
             <div className="coin-static">
                {bitValue}
             </div>
           </div>
           <div>
              <button onClick={() => setBitValue(0)} disabled={bitValue === 0}>Set 0</button>
              <button onClick={() => setBitValue(1)} disabled={bitValue === 1}>Set 1</button>
           </div>
        </div>

        <div className="vs-divider">VS</div>

        <div className="qubit-demo">
           <div className="coin-container">
             <div className={`coin ${qubitState === 'superposition' ? 'coin-spinning' : (qubitState === '0' ? 'coin-measured-0' : 'coin-measured-1')}`}>
                <div className="coin-heads">|0⟩</div>
                <div className="coin-tails">|1⟩</div>
             </div>
           </div>
           <div>
              <button onClick={putInSuperposition} disabled={qubitState === 'superposition'}>Put in Superposition</button>
              <button onClick={measureQubit} disabled={qubitState !== 'superposition'}>Measure</button>
           </div>
           
           <div className="prob-bars">
              <div className="prob-bar-col">
                 <div className="prob-bar-track">
                    <div className="prob-bar-fill bar-zero" style={{ height: `${probZero}%` }}></div>
                 </div>
              </div>
              <div className="prob-bar-col">
                 <div className="prob-bar-track">
                    <div className="prob-bar-fill bar-one" style={{ height: `${probOne}%` }}></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="qubit-power-row">
          <div className="qubit-power-stat">
            <strong>1 qubit = 2 states</strong>
          </div>
          <div className="qubit-power-stat">
            <strong>10 qubits = 1,024 states</strong>
          </div>
          <div className="qubit-power-stat">
            <strong>50 qubits = 1,125,899,906,842,624 states</strong>
          </div>
      </div>
    </Reveal>
  );
}
