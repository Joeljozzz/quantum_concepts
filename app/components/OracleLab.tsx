"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";
import { formatState } from "../lib/quantumMath";

const QUBITS = 3;
const STATE_COUNT = 2 ** QUBITS;

export default function OracleLab() {
  const [secretKey, setSecretKey] = useState(5);
  const [queried, setQueried] = useState<Set<number>>(new Set());
  const [lastQuery, setLastQuery] = useState<number | null>(null);
  const [oracleApplied, setOracleApplied] = useState(false);

  const foundIt = queried.has(secretKey);

  const verify = (candidate: number): boolean => candidate === secretKey;

  const handleQuery = (candidate: number) => {
    setLastQuery(candidate);
    setQueried((prev) => {
      const next = new Set(prev);
      next.add(candidate);
      return next;
    });
  };

  const handleReset = (nextSecret?: number) => {
    setQueried(new Set());
    setLastQuery(null);
    setOracleApplied(false);
    if (typeof nextSecret === "number") {
      setSecretKey(nextSecret);
    }
  };

  const signs = useMemo(
    () => Array.from({ length: STATE_COUNT }, (_, idx) => (oracleApplied && idx === secretKey ? -1 : 1)),
    [oracleApplied, secretKey]
  );

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">03</span>
        <h2>The Function That Actually Answers</h2>
        <p>
          Every search problem hides a verifier: a function f(x) that returns true for exactly
          one hidden key and false for everything else. Classically, you can only call this
          function one candidate at a time. Try it below.
        </p>
      </Reveal>

      <div className="grid cols-2">
        <Reveal as="div" variant="left" delay={80}>
          <div className="card glass-card">
            <h3>Classical Queries</h3>
            <p className="small">
              Click a candidate to call f(x). Each click is one classical query. Find the secret
              key by checking candidates one at a time.
            </p>
            <div className="oracle-grid">
              {Array.from({ length: STATE_COUNT }, (_, idx) => {
                const isQueried = queried.has(idx);
                const result = isQueried ? verify(idx) : null;
                return (
                  <button
                    key={idx}
                    className={`oracle-cell ${result === true ? "oracle-true" : ""} ${
                      result === false ? "oracle-false" : ""
                    }`}
                    onClick={() => handleQuery(idx)}
                  >
                    <span>{formatState(idx, QUBITS)}</span>
                    <span className="small">
                      {result === null ? "f(x) = ?" : `f(x) = ${result ? "true" : "false"}`}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="toolbar">
              <span className="badge">Queries used: {queried.size}</span>
              <span className="badge">{foundIt ? "Key found!" : "Key not found yet"}</span>
              <button onClick={() => handleReset()}>Reset Queries</button>
            </div>
            {lastQuery !== null ? (
              <p className="small">
                Last query: {formatState(lastQuery, QUBITS)} &rarr; f(x) ={" "}
                {verify(lastQuery) ? "true" : "false"}
              </p>
            ) : null}
          </div>
        </Reveal>

        <Reveal as="div" variant="right" delay={160}>
          <div className="card glass-card">
            <h3>The Same Function as a Quantum Oracle</h3>
            <p className="small">
              A quantum oracle built from the same logic does not return true/false directly. It
              flips the sign (phase) of the one matching component in a single call, leaving all
              other components unchanged.
            </p>
            <div className="toolbar">
              <label>
                Secret key{" "}
                <select value={secretKey} onChange={(e) => handleReset(Number(e.target.value))}>
                  {Array.from({ length: STATE_COUNT }, (_, idx) => (
                    <option key={idx} value={idx}>
                      {formatState(idx, QUBITS)}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={() => setOracleApplied((prev) => !prev)}>
                {oracleApplied ? "Undo Oracle Call" : "Apply Oracle (1 call)"}
              </button>
            </div>
            <div className="sign-row">
              {signs.map((sign, idx) => (
                <div key={idx} className={`sign-cell ${sign < 0 ? "sign-negative" : ""}`}>
                  <span className="sign-symbol">{sign < 0 ? "-" : "+"}</span>
                  <span className="small">{formatState(idx, QUBITS)}</span>
                </div>
              ))}
            </div>
            <p className="small">
              Notice: probabilities have not changed yet, only the sign of the marked amplitude.
              This single phase flip is what diffusion later converts into higher probability.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

