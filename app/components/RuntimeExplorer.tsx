"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { curvePath } from "../lib/quantumMath";

const runtimeOptions = ["O(sqrt(N))", "O(log N)", "O(log log N)", "O(1)"];

export default function RuntimeExplorer() {
  const [nPower, setNPower] = useState(20);
  const [runtimePick, setRuntimePick] = useState<number | null>(null);

  const nValue = 2 ** nPower;
  const classicalWork = nValue / 2;
  const quantumWork = (Math.PI / 4) * Math.sqrt(nValue);
  const logWork = Math.log2(nValue);
  const loglogWork = Math.log2(Math.max(2, Math.log2(nValue)));
  const scale = classicalWork;

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">05</span>
        <h2>How Fast Is the Speedup, Really?</h2>
        <p>
          Pop-science says quantum search is instant. It is not. The real, provable result is a
          quadratic speedup: O(sqrt(N)) instead of O(N).
        </p>
      </Reveal>

      <div className="grid cols-2">
        <Reveal as="div" variant="left" delay={80}>
          <div className="card glass-card">
            <h3>Runtime Explorer</h3>
            <label className="slider-label">
              Search space size N = 2^
              <input
                type="range"
                min={8}
                max={30}
                value={nPower}
                onChange={(e) => setNPower(Number(e.target.value))}
              />
              <span className="slider-value">{nPower}</span>
            </label>
            <div className="runtime-bars">
              <div className="runtime-row">
                <span>Classical O(N)</span>
                <div className="runtime-track">
                  <div className="runtime-fill linear" style={{ width: "100%" }} />
                </div>
              </div>
              <div className="runtime-row">
                <span>Grover O(sqrt(N))</span>
                <div className="runtime-track">
                  <div className="runtime-fill sqrt" style={{ width: `${(quantumWork / scale) * 100}%` }} />
                </div>
              </div>
              <div className="runtime-row">
                <span>O(log N)</span>
                <div className="runtime-track">
                  <div className="runtime-fill log" style={{ width: `${(logWork / scale) * 100}%` }} />
                </div>
              </div>
              <div className="runtime-row">
                <span>O(log log N)</span>
                <div className="runtime-track">
                  <div className="runtime-fill loglog" style={{ width: `${(loglogWork / scale) * 100}%` }} />
                </div>
              </div>
            </div>
            <p className="small">
              N={nValue.toLocaleString()} &middot; classical avg checks {Math.round(classicalWork).toLocaleString()}
              {" "}&middot; Grover rounds about {Math.round(quantumWork).toLocaleString()}.
            </p>
          </div>
        </Reveal>

        <Reveal as="div" variant="right" delay={160}>
          <div className="card glass-card">
            <h3>Quiz: Pick the Real Speedup</h3>
            <svg viewBox="0 0 420 240" className="curve-svg">
              <line x1="30" y1="220" x2="390" y2="220" className="axis-line" />
              <line x1="30" y1="220" x2="30" y2="20" className="axis-line" />
              <polyline points={curvePath("linear")} className="curve-linear" />
              <polyline points={curvePath("sqrt")} className="curve-sqrt" />
              <polyline points={curvePath("log")} className="curve-log" />
              <polyline points={curvePath("loglog")} className="curve-loglog" />
            </svg>
            <div className="toolbar">
              {runtimeOptions.map((option, idx) => (
                <button key={option} onClick={() => setRuntimePick(idx)}>
                  {option}
                </button>
              ))}
            </div>
            {runtimePick !== null ? (
              <p className="small">
                Your pick: {runtimeOptions[runtimePick]}. For unstructured search with one marked
                item, the proven answer is <strong>O(sqrt(N))</strong>.
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

