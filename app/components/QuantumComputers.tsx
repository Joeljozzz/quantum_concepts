"use client";
import React, { useState } from "react";
import Reveal from "./Reveal";

export default function QuantumComputers() {
  const [selectedComputer, setSelectedComputer] = useState<number | null>(null);

  const computers = [
    { icon: '❄️', name: 'IBM Quantum', tech: 'Superconducting', visualClass: 'sc', qubits: '1,121', detail: 'IBM\'s Condor processor achieved 1,121 superconducting qubits. IBM provides cloud access through IBM Quantum Experience, making quantum computing accessible to researchers worldwide.', stats: ['1,121 Qubits', '127μs Coherence', 'Cloud Access'], achievement: 'First to offer public cloud quantum computing access' },
    { icon: '🔮', name: 'Google Quantum AI', tech: 'Superconducting', visualClass: 'sc', qubits: '72', detail: 'Google\'s Sycamore processor demonstrated quantum supremacy in 2019 by completing a calculation in 200 seconds that would take classical supercomputers ~10,000 years.', stats: ['72 Qubits', 'Quantum Supremacy', 'Willow Chip'], achievement: 'First verifiable quantum supremacy demonstration' },
    { icon: '⚡', name: 'IonQ', tech: 'Trapped Ion', visualClass: 'ion', qubits: '36', detail: 'IonQ uses trapped ytterbium ions manipulated by lasers. Their approach offers high gate fidelity (99.9%+) and all-to-all qubit connectivity.', stats: ['36 Qubits', '99.9% Fidelity', 'All-to-All'], achievement: 'Highest gate fidelity in commercial quantum computers' },
    { icon: '🌊', name: 'D-Wave', tech: 'Quantum Annealing', visualClass: 'anneal', qubits: '5,000+', detail: 'D-Wave takes a different approach with quantum annealing, optimized for optimization problems. Their Advantage system has 5,000+ qubits.', stats: ['5,000+ Qubits', 'Annealing', 'Optimization'], achievement: 'Most qubits in any commercial quantum system' },
    { icon: '🔷', name: 'Quantinuum', tech: 'Trapped Ion', visualClass: 'ion', qubits: '56', detail: 'Formed from Honeywell Quantum Solutions, Quantinuum\'s H-Series processors use trapped ions with industry-leading quantum volume scores.', stats: ['56 Qubits', 'Highest QV', 'H-Series'], achievement: 'Record quantum volume scores' },
    { icon: '🔶', name: 'Microsoft Azure', tech: 'Topological (R&D)', visualClass: 'topo', qubits: 'R&D', detail: 'Microsoft is pursuing topological qubits that would be inherently more stable. Azure Quantum provides cloud access to partner hardware from IonQ, Quantinuum, and others.', stats: ['Topological', 'Azure Cloud', 'Multi-vendor'], achievement: 'Pioneering topological qubit approach for error resilience' },
  ];

  return (
    <section className="quantum-section">
      <Reveal variant="up">
        <div className="chapter-heading">
          <span className="chapter-index">05</span>
          <h2>Quantum Computers That Exist Today</h2>
        </div>
      </Reveal>
      
      <div className="computer-showcase">
        {computers.map((comp, i) => (
          <Reveal key={i} variant="up" delay={i * 100}>
            <div 
              className={`computer-card glass-card ${selectedComputer === i ? 'selected' : ''}`}
              onClick={() => setSelectedComputer(i)}
            >
              <div className={`computer-visual ${comp.visualClass}`}>{comp.icon}</div>
              <h3>{comp.name}</h3>
              <div className="tech-badge">{comp.tech}</div>
              <div className="qubit-count">{comp.qubits} Qubits</div>
            </div>
          </Reveal>
        ))}
      </div>

      {selectedComputer !== null && (
        <Reveal variant="up">
          <div className="computer-detail glass-card mt-8">
            <h3>{computers[selectedComputer].name}</h3>
            <p>{computers[selectedComputer].detail}</p>
            <div className="detail-stats">
              {computers[selectedComputer].stats.map((stat, i) => (
                <div key={i} className="detail-stat card">{stat}</div>
              ))}
            </div>
            <p className="achievement mt-4"><strong>Key Achievement:</strong> {computers[selectedComputer].achievement}</p>
          </div>
        </Reveal>
      )}
    </section>
  );
}
