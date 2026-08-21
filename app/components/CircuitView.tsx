"use client";

import { useState } from "react";
import Reveal from "./Reveal";

export default function CircuitView() {
  const [rounds, setRounds] = useState(2);

  const wireCount = 3;
  const wireGap = 46;
  const topPad = 30;
  const startX = 40;
  const hadamardX = 110;
  const oracleWidth = 70;
  const diffuserWidth = 90;
  const roundGap = 190;
  const oracleStartX = 190;

  const wires = Array.from({ length: wireCount }, (_, i) => topPad + i * wireGap);
  const endX = oracleStartX + rounds * roundGap + 40;

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">04</span>
        <h2>Under the Hood: The Actual Circuit</h2>
        <p>
          This is what the processor really runs: a Hadamard gate on every wire to create
          superposition, then the oracle and diffuser blocks repeated a set number of rounds,
          then a final measurement.
        </p>
      </Reveal>

      <Reveal as="div" variant="scale" delay={100}>
        <div className="card glass-card">
          <div className="toolbar">
            <label>
              Grover rounds{" "}
              <input
                type="range"
                min={1}
                max={4}
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
              />
              <span className="slider-value">{rounds}</span>
            </label>
          </div>

          <div className="circuit-scroll">
            <svg viewBox={`0 0 ${endX} ${topPad + wireCount * wireGap}`} className="circuit-svg">
              {wires.map((y, idx) => (
                <line key={idx} x1={startX} y1={y} x2={endX - 20} y2={y} className="circuit-wire" />
              ))}

              {wires.map((y, idx) => (
                <rect
                  key={`h-${idx}`}
                  x={hadamardX}
                  y={y - 16}
                  width="32"
                  height="32"
                  rx="6"
                  className="circuit-gate hadamard-gate"
                />
              ))}
              {wires.map((y, idx) => (
                <text key={`ht-${idx}`} x={hadamardX + 16} y={y + 5} className="circuit-gate-label">
                  H
                </text>
              ))}

              {Array.from({ length: rounds }, (_, r) => {
                const oracleX = oracleStartX + r * roundGap;
                const diffuserX = oracleX + oracleWidth + 24;
                return (
                  <g key={r}>
                    <rect
                      x={oracleX}
                      y={topPad - 18}
                      width={oracleWidth}
                      height={wireCount * wireGap - wireGap + 36}
                      rx="10"
                      className="circuit-gate oracle-gate"
                    />
                    <text x={oracleX + oracleWidth / 2} y={topPad + wireCount * wireGap - wireGap - 4} className="circuit-gate-label">
                      Oracle
                    </text>

                    <rect
                      x={diffuserX}
                      y={topPad - 18}
                      width={diffuserWidth}
                      height={wireCount * wireGap - wireGap + 36}
                      rx="10"
                      className="circuit-gate diffuser-gate"
                    />
                    <text
                      x={diffuserX + diffuserWidth / 2}
                      y={topPad + wireCount * wireGap - wireGap - 4}
                      className="circuit-gate-label"
                    >
                      Diffuser
                    </text>
                  </g>
                );
              })}

              <g transform={`translate(${endX - 20}, ${topPad + (wireCount - 1) * wireGap / 2})`}>
                <rect x="-4" y="-18" width="34" height="36" rx="6" className="circuit-gate measure-gate" />
                <text x="13" y="6" className="circuit-gate-label">
                  M
                </text>
              </g>
            </svg>
          </div>

          <p className="small">
            Each oracle+diffuser pair is one Grover round. The circuit repeats for the number of
            rounds you chose, then every wire is measured at once, collapsing to one classical
            bitstring.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

