"use client";

import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";
import { clamped, formatState, groverAmplitudes } from "../lib/quantumMath";

export default function GroverLab() {
  const [qubits, setQubits] = useState(3);
  const [marked, setMarked] = useState(5);
  const [iterations, setIterations] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const stateCount = 2 ** qubits;
  const safeMarked = clamped(marked, 0, stateCount - 1);

  const groverData = useMemo(
    () => groverAmplitudes(stateCount, iterations, safeMarked),
    [stateCount, iterations, safeMarked]
  );

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    const loopLimit = Math.max(groverData.optimal + 3, 5);
    const timer = setInterval(() => {
      setIterations((prev) => (prev >= loopLimit ? 0 : prev + 1));
    }, 650);
    return () => clearInterval(timer);
  }, [autoPlay, groverData.optimal]);

  const rotationDegrees = clamped((iterations / Math.max(groverData.optimal, 1)) * 90, 0, 135);

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">03</span>
        <h2>Grover&apos;s Algorithm: Rotate Toward the Answer</h2>
        <p>
          Every round reflects the state twice: once to mark the answer&apos;s phase, once to
          reflect around the average. Two reflections make a rotation, and the rotation steers
          probability toward the key.
        </p>
      </Reveal>

      <div className="grid cols-2">
        <Reveal as="div" variant="left" delay={80}>
          <div className="card glass-card">
            <div className="orbit-plot" role="img" aria-label="Grover state rotation animation">
              <svg viewBox="0 0 260 220" className="orbit-svg">
                <line x1="30" y1="170" x2="230" y2="170" className="axis-line" />
                <line x1="130" y1="200" x2="130" y2="30" className="axis-line" />
                <path d="M 30 170 A 100 100 0 0 1 130 70" className="arc-line" />
                <g transform={`rotate(${-rotationDegrees} 130 170)`}>
                  <line x1="130" y1="170" x2="210" y2="170" className="state-line" />
                  <circle cx="210" cy="170" r="5" className="state-tip" />
                </g>
              </svg>
            </div>
            <div className="toolbar">
              <button onClick={() => setAutoPlay((prev) => !prev)}>
                {autoPlay ? "Pause" : "Play Rotation"}
              </button>
              <button
                onClick={() => {
                  setAutoPlay(false);
                  setIterations((prev) => prev + 1);
                }}
              >
                Step 1 Round
              </button>
              <button
                onClick={() => {
                  setAutoPlay(false);
                  setIterations(0);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" variant="right" delay={160}>
          <div className="card glass-card">
            <h3>Amplitude Bars</h3>
            <div className="toolbar">
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
                    setIterations(0);
                  }}
                />
              </label>
              <label>
                Marked{" "}
                <select
                  value={safeMarked}
                  onChange={(e) => {
                    setMarked(Number(e.target.value));
                    setIterations(0);
                  }}
                >
                  {Array.from({ length: stateCount }, (_, idx) => (
                    <option key={idx} value={idx}>
                      {formatState(idx, qubits)}
                    </option>
                  ))}
                </select>
              </label>
              <span className="badge">Rounds: {iterations}</span>
              <span className="badge">Optimal: {groverData.optimal}</span>
            </div>
            <div className="bar-chart">
              {groverData.probabilities.map((prob, idx) => {
                const heightPx = Math.max(8, Math.round(prob * 190));
                const isMarked = idx === safeMarked;
                return (
                  <div key={idx} className="bar-col">
                    <div
                      className={`bar ${isMarked ? "marked" : "normal"}`}
                      style={{ height: `${heightPx}px` }}
                      title={`${formatState(idx, qubits)} = ${(prob * 100).toFixed(2)}%`}
                    />
                    <span className="small">{formatState(idx, qubits)}</span>
                  </div>
                );
              })}
            </div>
            <p className="small">
              Marked-state probability: {(groverData.markedProbability * 100).toFixed(2)}%
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

