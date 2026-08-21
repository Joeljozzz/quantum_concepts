"use client";
import React, { useState } from "react";
import Reveal from "./Reveal";

export default function RealWorldProblems() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const problems = [
    { icon: '💊', title: 'Drug Discovery', desc: 'Simulating molecular interactions to design new medicines', detail: 'Classical computers cannot accurately simulate molecules with more than ~50 atoms. Quantum computers naturally simulate quantum systems, potentially reducing drug development timelines from 12 years to months.', classical: 100, quantum: 15 },
    { icon: '🔐', title: 'Cryptography', desc: 'Breaking and building unbreakable encryption', detail: 'Shor\'s algorithm can factor large numbers exponentially faster, threatening RSA encryption. But quantum key distribution (QKD) creates truly unbreakable communication channels.', classical: 100, quantum: 8 },
    { icon: '🚚', title: 'Supply Chain', desc: 'Optimizing routes across thousands of variables', detail: 'The traveling salesman problem grows factorially. Quantum optimization algorithms can explore solution spaces exponentially faster, saving billions in logistics costs.', classical: 100, quantum: 20 },
    { icon: '🌍', title: 'Climate Modeling', desc: 'Simulating complex Earth systems accurately', detail: 'Climate models require solving coupled differential equations across millions of grid points. Quantum simulation could model atmospheric chemistry at molecular precision.', classical: 100, quantum: 12 },
    { icon: '📊', title: 'Financial Modeling', desc: 'Portfolio optimization and risk analysis', detail: 'Monte Carlo simulations for financial risk run quadratically faster with quantum amplitude estimation, enabling real-time risk assessment for complex portfolios.', classical: 100, quantum: 25 },
    { icon: '🔬', title: 'Materials Science', desc: 'Designing new materials with specific properties', detail: 'Predicting material properties requires quantum-level simulation. Quantum computers can model electron behavior in crystal lattices to design superconductors and catalysts.', classical: 100, quantum: 10 },
  ];

  return (
    <section className="quantum-section">
      <Reveal variant="up">
        <div className="chapter-heading">
          <span className="chapter-index">04</span>
          <h2>Problems That Need Quantum Computing</h2>
        </div>
      </Reveal>
      
      <div className="problem-grid">
        {problems.map((prob, i) => (
          <Reveal key={i} variant="up" delay={i * 100}>
            <div 
              className={`problem-card glass-card glass-card-glow ${activeCard === i ? 'active' : ''}`}
              onClick={() => setActiveCard(activeCard === i ? null : i)}
            >
              <div className="problem-icon">{prob.icon}</div>
              <h3>{prob.title}</h3>
              <p>{prob.desc}</p>
              
              {activeCard === i && (
                <div className="problem-detail">
                  <p>{prob.detail}</p>
                  <div className="advantage-bars">
                    <div className="advantage-bar-row">
                      <span>Classical</span>
                      <div className="advantage-bar-track">
                        <div className="advantage-fill classical" style={{ width: `${prob.classical}%` }}></div>
                      </div>
                    </div>
                    <div className="advantage-bar-row">
                      <span>Quantum</span>
                      <div className="advantage-bar-track">
                        <div className="advantage-fill quantum" style={{ width: `${prob.quantum}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
