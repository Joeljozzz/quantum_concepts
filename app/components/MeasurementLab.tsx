"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { formatState, groverAmplitudes, randomByWeights } from "../lib/quantumMath";

const QUBITS = 3;
const STATE_COUNT = 2 ** QUBITS;

export default function MeasurementLab() {
  const [markedIndex, setMarkedIndex] = useState(5);
  const [rounds, setRounds] = useState(2);
  const [collapsedIndex, setCollapsedIndex] = useState<number | null>(null);

  const groverData = useMemo(
    () => groverAmplitudes(STATE_COUNT, rounds, markedIndex),
    [rounds, markedIndex]
  );

  const displayedProbabilities =
    collapsedIndex === null
      ? groverData.probabilities
      : groverData.probabilities.map((_, idx) => (idx === collapsedIndex ? 1 : 0));

  const measure = () => {
    const outcome = randomByWeights(groverData.probabilities);
    setCollapsedIndex(outcome);
  };

  const reprepare = () => {
    setCollapsedIndex(null);
  };

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">07</span>
        <h2>Measurement Collapses the State</h2>
        <p>
          Reading out is a one-time random sample. The instant you measure, the state vector
          snaps entirely onto whatever value you saw. Measuring again without re-preparing the
          state just gives you the same answer every time.
        </p>
      </Reveal>

      <Reveal as="div" variant="scale" delay={100}>
        <div className="card glass-card">
          <div className="toolbar">
            <label>
              Marked state{" "}
              <select
                value={markedIndex}
                onChange={(e) => {
                  setMarkedIndex(Number(e.target.value));
                  setCollapsedIndex(null);
                }}
              >
                {Array.from({ length: STATE_COUNT }, (_, idx) => (
                  <option key={idx} value={idx}>
                    {formatState(idx, QUBITS)}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Grover rounds before measuring{" "}
              <input
                type="range"
                min={0}
                max={groverData.optimal + 2}
                value={rounds}
                onChange={(e) => {
                  setRounds(Number(e.target.value));
                  setCollapsedIndex(null);
                }}
              />
              <span className="slider-value">{rounds}</span>
            </label>
          </div>

          <div className="bar-chart">
            {displayedProbabilities.map((prob, idx) => {
              const heightPx = Math.max(8, Math.round(prob * 190));
              const isMarked = idx === markedIndex;
              return (
                <div key={idx} className="bar-col">
                  <div
                    className={`bar ${isMarked ? "marked" : "normal"}`}
                    style={{ height: `${heightPx}px` }}
                    title={`${formatState(idx, QUBITS)} = ${(prob * 100).toFixed(2)}%`}
                  />
                  <span className="small">{formatState(idx, QUBITS)}</span>
                </div>
              );
            })}
          </div>

          <div className="toolbar">
            <button onClick={measure}>Measure Now</button>
            <button onClick={reprepare}>Re-prepare State</button>
            <span className="badge">
              {collapsedIndex === null
                ? "Not measured: this is the true probability distribution"
                : `Collapsed to ${formatState(collapsedIndex, QUBITS)}`}
            </span>
          </div>
          <p className="small">
            Try measuring several times in a row without re-preparing: you will keep seeing the
            same collapsed outcome, because the state no longer holds the original distribution.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

