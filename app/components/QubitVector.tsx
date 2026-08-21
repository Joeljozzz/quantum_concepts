"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type Mode = "zero" | "one" | "hadamard-zero" | "hadamard-one";

const modeConfig: Record<Mode, { angleDeg: number; label: string }> = {
  zero: { angleDeg: 0, label: "|0>" },
  one: { angleDeg: 90, label: "|1>" },
  "hadamard-zero": { angleDeg: 45, label: "H|0>" },
  "hadamard-one": { angleDeg: 135, label: "H|1>" }
};

export default function QubitVector() {
  const [mode, setMode] = useState<Mode>("zero");

  const { angleDeg, label } = modeConfig[mode];
  const angleRad = (angleDeg * Math.PI) / 180;
  const x = Math.cos(angleRad);
  const y = Math.sin(angleRad);
  const prob0 = x * x;
  const prob1 = y * y;

  const plotSize = 220;
  const cx = plotSize / 2;
  const cy = plotSize / 2;
  const radius = plotSize / 2 - 24;
  const tipX = cx + x * radius;
  const tipY = cy - y * radius;

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">02</span>
        <h2>The Qubit Is a Rotating Arrow</h2>
        <p>
          Before jumping to many qubits, look at just one. A qubit is a unit vector in a 2D
          space: the x-axis component squared gives the probability of reading 0, the y-axis
          component squared gives the probability of reading 1.
        </p>
      </Reveal>

      <div className="grid cols-2">
        <Reveal as="div" variant="left" delay={80}>
          <div className="card glass-card">
            <svg viewBox={`0 0 ${plotSize} ${plotSize}`} className="qubit-svg">
              <circle cx={cx} cy={cy} r={radius} className="qubit-circle" />
              <line x1={cx - radius - 10} y1={cy} x2={cx + radius + 10} y2={cy} className="axis-line" />
              <line x1={cx} y1={cy + radius + 10} x2={cx} y2={cy - radius - 10} className="axis-line" />
              <text x={cx + radius + 6} y={cy + 14} className="qubit-axis-label">
                |0&gt;
              </text>
              <text x={cx - 8} y={cy - radius - 14} className="qubit-axis-label">
                |1&gt;
              </text>
              <line x1={cx} y1={cy} x2={tipX} y2={tipY} className="qubit-vector-line" />
              <circle cx={tipX} cy={tipY} r={7} className="qubit-vector-tip" />
              <text x={tipX + 10} y={tipY - 10} className="qubit-state-label">
                {label}
              </text>
            </svg>
          </div>
        </Reveal>

        <Reveal as="div" variant="right" delay={160}>
          <div className="card glass-card">
            <h3>Try It</h3>
            <div className="toolbar">
              <button onClick={() => setMode("zero")}>Start at |0&gt;</button>
              <button onClick={() => setMode("one")}>Start at |1&gt;</button>
              <button onClick={() => setMode("hadamard-zero")}>Apply Hadamard to |0&gt;</button>
              <button onClick={() => setMode("hadamard-one")}>Apply Hadamard to |1&gt;</button>
            </div>
            <div className="qubit-prob-row">
              <div>
                <span className="badge">P(read 0) = {(prob0 * 100).toFixed(1)}%</span>
              </div>
              <div>
                <span className="badge">P(read 1) = {(prob1 * 100).toFixed(1)}%</span>
              </div>
            </div>
            <p className="small">
              The Hadamard gate rotates a pure |0&gt; or |1&gt; state into an equal 50/50 diagonal
              direction. This is the standard way a program creates superposition; it does not
              reveal an answer by itself, it just changes the shape of the arrow.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

