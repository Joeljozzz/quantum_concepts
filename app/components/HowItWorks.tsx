"use client";
import React, { useState, useEffect } from "react";
import Reveal from "./Reveal";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const steps = [
    { icon: '🧊', title: 'Extreme Cooling', desc: 'The quantum processor is cooled to 15 millikelvin — colder than outer space — using a dilution refrigerator. At this temperature, electrical resistance disappears and quantum effects emerge.',
      visual: (isActive: boolean) => (
        <div className="temp-gauge">
          <div className="temp-bar">
            <div className={`temp-fill ${isActive ? 'cold' : ''}`} style={{ width: isActive ? '0.1%' : '100%' }}></div>
          </div>
          <div className="temp-label">15 mK</div>
        </div>
      )
    },
    { icon: '⚛️', title: 'Qubit Initialization', desc: 'Qubits are prepared in a known starting state (|0⟩). This is like clearing a calculator before starting a new computation.',
      visual: () => (
        <div className="gate-flow">
          <div className="gate-box gate-h">INIT</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-h">INIT</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-h">INIT</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-h">INIT</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-h">INIT</div>
        </div>
      )
    },
    { icon: '🔧', title: 'Gate Operations', desc: 'Quantum logic gates manipulate qubits: Hadamard (H) creates superposition, CNOT entangles pairs, and rotation gates fine-tune amplitudes.',
      visual: () => (
        <div className="gate-flow">
          <div className="gate-box gate-h">H</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-cx">CNOT</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-h">Rz</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-cx">CNOT</div>
          <div className="gate-arrows">→</div>
          <div className="gate-box gate-h">H</div>
        </div>
      )
    },
    { icon: '📏', title: 'Measurement', desc: 'The final step collapses the quantum state into a classical result. The beauty is that the algorithm has already arranged for the right answer to have the highest probability.',
      visual: () => (
        <div className="gate-flow">
          <div className="measure-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="gate-box gate-m">M</div>
            <div className="result-label">0</div>
          </div>
          <div className="measure-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="gate-box gate-m">M</div>
            <div className="result-label">1</div>
          </div>
          <div className="measure-col" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="gate-box gate-m">M</div>
            <div className="result-label">0</div>
          </div>
        </div>
      )
    },
    { icon: '🛡️', title: 'Error Correction', desc: 'Quantum states are fragile. Error correction encodes information across multiple physical qubits to protect against decoherence and noise.',
      visual: () => (
        <div className="gate-box" style={{ width: 'auto', padding: '1rem', textAlign: 'center' }}>
          Logical Qubit = Multiple Physical Qubits
        </div>
      )
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlay) {
      timer = setInterval(() => {
        setActiveStep(prev => (prev + 1) % steps.length);
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, steps.length]);

  return (
    <section className="quantum-section">
      <Reveal variant="up">
        <div className="chapter-heading">
          <span className="chapter-index">06</span>
          <h2>How a Quantum Computer Works</h2>
        </div>
      </Reveal>
      
      <div className="controls" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => { setIsAutoPlay(false); setActiveStep(prev => Math.max(0, prev - 1)); }} disabled={activeStep === 0}>Previous Step</button>
        <button onClick={() => { setIsAutoPlay(false); setActiveStep(prev => Math.min(steps.length - 1, prev + 1)); }} disabled={activeStep === steps.length - 1}>Next Step</button>
        <button onClick={() => setIsAutoPlay(!isAutoPlay)}>{isAutoPlay ? 'Stop Auto Play' : 'Auto Play'}</button>
      </div>

      <div className="steps-flow">
        {steps.map((step, i) => (
          <Reveal key={i} variant="up" delay={i * 100}>
            <div className="step-item" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <div className="step-marker" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className={`step-dot ${i <= activeStep ? 'active' : ''}`}>{step.icon}</div>
                {i < steps.length - 1 && <div className={`step-connector ${i < activeStep ? 'active' : ''}`} style={{ flex: 1, width: '2px', background: i < activeStep ? 'var(--glow-color, #4facfe)' : '#333' }}></div>}
              </div>
              <div className="step-content glass-card" style={{ flex: 1 }}>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                <div className="step-visual" style={{ marginTop: '1rem' }}>
                  {step.visual(i <= activeStep)}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
