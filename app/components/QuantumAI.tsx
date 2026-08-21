"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";

type ConceptCard = {
  title: string;
  body: string;
  tag: string;
};

const conceptCards: ConceptCard[] = [
  {
    tag: "Feature Space",
    title: "Quantum Feature Maps",
    body:
      "Classical data can be encoded into an exponentially large Hilbert space using quantum gates. This lets a quantum kernel separate patterns that are hard to untangle with a compact classical feature map."
  },
  {
    tag: "Search Subroutine",
    title: "Amplitude Amplification",
    body:
      "Same rotation idea as Grover's algorithm, applied inside a training loop: instead of scanning every candidate split, batch, or configuration, quadratically fewer evaluations are needed to concentrate probability on a good one."
  },
  {
    tag: "Linear Algebra",
    title: "Quantum Linear Systems (HHL-style)",
    body:
      "Certain structured linear-algebra subroutines used inside ML pipelines (like solving well-conditioned sparse systems) admit exponential speedups on paper, but only under strict input/output and conditioning assumptions."
  },
  {
    tag: "Reality Check",
    title: "Why It Is Not Automatic",
    body:
      "Most quantum ML advantage claims are for specific subroutines, not full end-to-end training. Noise, qubit count, and data loading costs (the 'input problem') often remove the theoretical advantage on real hardware today."
  }
];

function classicalIterations(n: number): number {
  return n;
}

function quantumIterations(n: number): number {
  return Math.max(1, Math.round((Math.PI / 4) * Math.sqrt(n)));
}

export default function QuantumAI() {
  const [datasetPower, setDatasetPower] = useState(14);
  const [activeCard, setActiveCard] = useState(0);

  const n = 2 ** datasetPower;

  const chartPoints = useMemo(() => {
    const classicalPoints: string[] = [];
    const quantumPoints: string[] = [];
    const steps = 24;

    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const x = 30 + t * 360;

      const classicalProgress = 1 - Math.exp(-3 * t);
      const quantumProgress = 1 - Math.exp(-3 * t * Math.sqrt(n) * 0.02);

      classicalPoints.push(`${x},${220 - classicalProgress * 170}`);
      quantumPoints.push(`${x},${220 - Math.min(1, quantumProgress) * 170}`);
    }

    return {
      classical: classicalPoints.join(" "),
      quantum: quantumPoints.join(" ")
    };
  }, [n]);

  const classicalSteps = classicalIterations(n);
  const quantumSteps = quantumIterations(n);
  const speedupFactor = classicalSteps / quantumSteps;

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">04</span>
        <h2>Where This Connects to AI</h2>
        <p>
          The same amplitude-rotation trick behind Grover&apos;s algorithm is the seed idea behind
          several proposed quantum machine learning speedups. Here is why a quantum-enhanced
          subroutine can converge faster, and where the claims should be treated carefully.
        </p>
      </Reveal>

      <div className="concept-grid">
        {conceptCards.map((card, idx) => (
          <Reveal key={card.title} as="div" variant="scale" delay={idx * 90}>
            <button
              className={`concept-card glass-card ${activeCard === idx ? "concept-active" : ""}`}
              onClick={() => setActiveCard(idx)}
            >
              <span className="concept-tag">{card.tag}</span>
              <h3>{card.title}</h3>
              <p className="small">{card.body}</p>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal as="div" variant="up" delay={120}>
        <div className="card glass-card">
          <h3>Simulated Convergence: Classical vs Quantum-Assisted Subroutine</h3>
          <p className="small">
            This chart is an illustrative model, not a hardware benchmark: it shows how a
            quantum-assisted search subroutine can reach a target confidence level in fewer steps
            as the candidate space N grows, following the sqrt(N) scaling from Grover&apos;s
            algorithm.
          </p>

          <label className="slider-label">
            Candidate space N = 2^
            <input
              type="range"
              min={6}
              max={24}
              value={datasetPower}
              onChange={(e) => setDatasetPower(Number(e.target.value))}
            />
            <span className="slider-value">{datasetPower}</span>
          </label>

          <svg viewBox="0 0 420 240" className="curve-svg">
            <line x1="30" y1="220" x2="390" y2="220" className="axis-line" />
            <line x1="30" y1="220" x2="30" y2="20" className="axis-line" />
            <polyline points={chartPoints.classical} className="curve-linear" />
            <polyline points={chartPoints.quantum} className="curve-sqrt" />
          </svg>

          <div className="toolbar">
            <span className="badge">Classical steps: {classicalSteps.toLocaleString()}</span>
            <span className="badge">Quantum-assisted steps: {quantumSteps.toLocaleString()}</span>
            <span className="badge">Speedup factor: {speedupFactor.toFixed(1)}x</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

