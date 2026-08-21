"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { clamped, formatState, groverAmplitudes, randomByWeights } from "../lib/quantumMath";

export default function AbstractionCompare() {
  const [qubits, setQubits] = useState(3);
  const [marked, setMarked] = useState(5);
  const [measuredState, setMeasuredState] = useState<number | null>(null);

  const stateCount = 2 ** qubits;
  const safeMarked = clamped(marked, 0, stateCount - 1);
  const classicalByte = clamped(safeMarked, 0, 255);
  const classicalBits = classicalByte.toString(2).padStart(8, "0");
  const classicalChar = String.fromCharCode(classicalByte > 32 ? classicalByte : classicalByte + 65);

  const measure = () => {
    const { probabilities } = groverAmplitudes(stateCount, 0, safeMarked);
    setMeasuredState(randomByWeights(probabilities));
  };

  return (
    <section id="compare" className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">01</span>
        <h2>Classical CPU vs Quantum Processor</h2>
        <p>
          Same three layers, wildly different physics underneath: data types, bits, and hardware
          look nothing alike once you cross into the quantum world.
        </p>
      </Reveal>

      <Reveal as="div" variant="scale" delay={100}>
        <div className="compare-shell glass-card">
          <div className="compare-col classical-col">
            <h3>Classical CPU</h3>
            <div className="layer-row">
              <span className="layer-title">Data types</span>
              <span className="layer-value">{classicalByte}</span>
              <span className="layer-value">&apos;{classicalChar}&apos;</span>
            </div>
            <div className="layer-row">
              <span className="layer-title">Bits</span>
              <span className="layer-bits">{classicalBits}</span>
            </div>
            <div className="layer-row">
              <span className="layer-title">Hardware</span>
              <div className="hardware-line">
                {Array.from({ length: 8 }, (_, idx) => (
                  <span key={`t-${idx}`} className="transistor-dot" />
                ))}
              </div>
            </div>
          </div>

          <div className="compare-divider" aria-hidden="true">
            <span>vs</span>
          </div>

          <div className="compare-col quantum-col">
            <h3>Quantum Processor</h3>
            <div className="layer-row">
              <span className="layer-title">State</span>
              <span className="layer-value pulse-text">{formatState(safeMarked, qubits)}</span>
            </div>
            <div className="layer-row">
              <span className="layer-title">Readout</span>
              <span className="layer-value">
                {measuredState === null ? "Not measured yet" : formatState(measuredState, qubits)}
              </span>
            </div>
            <div className="layer-row">
              <span className="layer-title">Hardware</span>
              <div className="hardware-line">
                {Array.from({ length: 8 }, (_, idx) => (
                  <span key={`q-${idx}`} className={`ion-dot ${idx === safeMarked % 8 ? "active" : ""}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal as="div" variant="up" delay={160}>
        <div className="toolbar glass-toolbar">
          <label>
            Qubits{" "}
            <input
              type="number"
              min={2}
              max={6}
              value={qubits}
              onChange={(e) => {
                const nextQubits = clamped(Number(e.target.value) || 2, 2, 6);
                const maxState = 2 ** nextQubits - 1;
                setQubits(nextQubits);
                setMarked((prev) => clamped(prev, 0, maxState));
                setMeasuredState(null);
              }}
            />
          </label>
          <label>
            Marked state{" "}
            <select
              value={safeMarked}
              onChange={(e) => {
                setMarked(Number(e.target.value));
                setMeasuredState(null);
              }}
            >
              {Array.from({ length: stateCount }, (_, idx) => (
                <option key={idx} value={idx}>
                  {formatState(idx, qubits)}
                </option>
              ))}
            </select>
          </label>
          <button onClick={measure}>Measure Quantum State</button>
        </div>
      </Reveal>
    </section>
  );
}

