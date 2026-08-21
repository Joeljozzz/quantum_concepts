"use client";

import { useMemo, useState } from "react";

type StoryQuestion = {
  title: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  reveal: string;
};

const runtimeOptions = ["O(sqrt(N))", "O(log N)", "O(log log N)", "O(1)"];

const storyQuestions: StoryQuestion[] = [
  {
    title: "Scene 1: Misconception Check",
    prompt: "If measurement returns one sampled output, what must an algorithm do before measuring?",
    choices: [
      "Concentrate probability near the correct answer",
      "Read all basis states simultaneously",
      "Avoid superposition"
    ],
    answerIndex: 0,
    reveal:
      "Correct. Superposition does not expose all answers directly; it enables interference to shape the sampling odds."
  },
  {
    title: "Scene 2: Oracle Step",
    prompt: "What does the oracle do in Grover for the marked item?",
    choices: ["Deletes all unmarked states", "Flips the sign (phase) of the marked component", "Measures the key"],
    answerIndex: 1,
    reveal:
      "Correct. The oracle marks phase. Probabilities change after diffusion, not at mark time."
  },
  {
    title: "Scene 3: Runtime Result",
    prompt: "Best asymptotic query complexity for one marked item in unstructured search?",
    choices: ["O(N)", "O(sqrt(N))", "O(log N)"],
    answerIndex: 1,
    reveal: "Correct. This quadratic speedup is the key result and matches the BBBV lower bound order."
  }
];

function clamped(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function formatState(index: number, qubits: number): string {
  return `|${index.toString(2).padStart(qubits, "0")}>`;
}

function randomByWeights(weights: number[]): number {
  const target = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i += 1) {
    sum += weights[i];
    if (target <= sum) {
      return i;
    }
  }
  return weights.length - 1;
}

function curvePath(kind: "linear" | "sqrt" | "log" | "loglog"): string {
  const points: string[] = [];
  for (let i = 0; i <= 10; i += 1) {
    const t = i / 10;
    const x = 30 + t * 360;
    let y = 0;
    if (kind === "linear") {
      y = t;
    } else if (kind === "sqrt") {
      y = Math.sqrt(t);
    } else if (kind === "log") {
      y = Math.log2(1 + 31 * t) / Math.log2(32);
    } else {
      y = Math.log2(1 + Math.log2(1 + 63 * t)) / Math.log2(1 + Math.log2(64));
    }
    points.push(`${x},${220 - y * 170}`);
  }
  return points.join(" ");
}

export default function HomePage() {
  const [qubits, setQubits] = useState(3);
  const [marked, setMarked] = useState(5);
  const [iterations, setIterations] = useState(0);
  const [measuredState, setMeasuredState] = useState<number | null>(null);
  const [nPower, setNPower] = useState(20);
  const [runtimePick, setRuntimePick] = useState<number | null>(null);

  const [storyIndex, setStoryIndex] = useState(0);
  const [storyPick, setStoryPick] = useState<number | null>(null);
  const [storyScore, setStoryScore] = useState(0);

  const stateCount = 2 ** qubits;
  const safeMarked = clamped(marked, 0, stateCount - 1);

  const groverData = useMemo(() => {
    const n = stateCount;
    const theta = Math.asin(1 / Math.sqrt(n));
    const t = (2 * iterations + 1) * theta;
    const markedAmp = Math.sin(t);
    const unmarkedAmp = Math.cos(t) / Math.sqrt(n - 1);
    const markedProbability = markedAmp * markedAmp;
    const unmarkedProbability = unmarkedAmp * unmarkedAmp;
    const probabilities = Array.from({ length: n }, (_, idx) =>
      idx === safeMarked ? markedProbability : unmarkedProbability
    );
    const optimal = Math.max(1, Math.round((Math.PI / 4) * Math.sqrt(n)));
    return {
      probabilities,
      markedProbability,
      optimal,
      theta
    };
  }, [iterations, safeMarked, stateCount]);

  const classicalByte = clamped(safeMarked, 0, 255);
  const classicalBits = classicalByte.toString(2).padStart(8, "0");
  const classicalChar = String.fromCharCode(classicalByte);

  const nValue = 2 ** nPower;
  const classicalWork = nValue / 2;
  const quantumWork = (Math.PI / 4) * Math.sqrt(nValue);
  const logWork = Math.log2(nValue);
  const loglogWork = Math.log2(Math.max(2, Math.log2(nValue)));
  const scale = classicalWork;

  const activeStory = storyQuestions[storyIndex];

  return (
    <main>
      <section className="hero mt-surface-external">
        <h1>Quantum Concepts Interactive Demo</h1>
        <p>
          A modern concept lab inspired by your screenshots: layers of abstraction, runtime intuition,
          and Grover mechanics in one interactive experience.
        </p>
      </section>

      <section>
        <h2>Classical CPU vs Quantum Processor</h2>
        <p>Interactive side-by-side model based on the comparison visuals you shared.</p>
        <div className="compare-shell">
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

          <div className="compare-col quantum-col">
            <h3>Quantum Processor</h3>
            <div className="layer-row">
              <span className="layer-title">Data types</span>
              <span className="layer-value">{formatState(safeMarked, qubits)}</span>
            </div>
            <div className="layer-row">
              <span className="layer-title">Readout</span>
              <span className="layer-value">
                {measuredState === null ? "Not measured" : formatState(measuredState, qubits)}
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
          <button onClick={() => setMeasuredState(randomByWeights(groverData.probabilities))}>
            Measure Quantum State
          </button>
        </div>
      </section>

      <section>
        <h2>Sequential Walkthrough</h2>
        <p>Use this runtime board to mirror the quiz-style curve comparison from the screenshots.</p>
        <div className="grid cols-2">
          <div className="card">
            <h3>Runtime Explorer</h3>
            <label>
              Search space size N = 2^
              <input
                type="range"
                min={8}
                max={30}
                value={nPower}
                onChange={(e) => setNPower(Number(e.target.value))}
              />
              {nPower}
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
              N={nValue.toLocaleString()}, classical avg checks {classicalWork.toLocaleString()}, Grover rounds about {Math.round(quantumWork).toLocaleString()}.
            </p>
          </div>

          <div className="card">
            <h3>Quiz Curves</h3>
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
                Your pick: {runtimeOptions[runtimePick]}. For unstructured search with one marked item,
                the correct scaling is O(sqrt(N)).
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section>
        <h2>Grover Visualizer</h2>
        <p>Apply rounds and watch amplitude concentration shift toward the marked state.</p>
        <div className="toolbar">
          <button onClick={() => setIterations((prev) => prev + 1)}>Apply 1 Grover Round</button>
          <button onClick={() => setIterations(0)}>Reset Rounds</button>
          <span className="badge">Current rounds: {iterations}</span>
          <span className="badge">Suggested rounds: {groverData.optimal}</span>
          <span className="badge">Marked probability: {(groverData.markedProbability * 100).toFixed(2)}%</span>
        </div>
        <div className="bar-chart">
          {groverData.probabilities.map((prob, idx) => {
            const heightPx = Math.max(8, Math.round(prob * 210));
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
      </section>

      <section>
        <h2>Quick Quiz</h2>
        <p>Story mode: progress scene-by-scene like a short narrated lesson.</p>
        <div className="card">
          <h3>
            {activeStory.title} ({storyIndex + 1}/{storyQuestions.length})
          </h3>
          <p>{activeStory.prompt}</p>
          {activeStory.choices.map((choice, idx) => {
            const isPicked = storyPick === idx;
            const isAnswer = idx === activeStory.answerIndex;
            const className =
              storyPick === null
                ? "quiz-option"
                : `quiz-option ${isAnswer ? "correct" : isPicked ? "wrong" : ""}`;
            return (
              <button
                key={choice}
                className={className}
                disabled={storyPick !== null}
                onClick={() => {
                  setStoryPick(idx);
                  if (idx === activeStory.answerIndex) {
                    setStoryScore((prev) => prev + 1);
                  }
                }}
              >
                {choice}
              </button>
            );
          })}
          {storyPick !== null ? (
            <div className="notice">
              <p className="small">{activeStory.reveal}</p>
            </div>
          ) : null}
          <div className="toolbar">
            <span className="badge">
              Story score: {storyScore} / {storyQuestions.length}
            </span>
            <button
              onClick={() => {
                if (storyIndex < storyQuestions.length - 1) {
                  setStoryIndex((prev) => prev + 1);
                  setStoryPick(null);
                }
              }}
              disabled={storyPick === null || storyIndex === storyQuestions.length - 1}
            >
              Next Scene
            </button>
            <button
              onClick={() => {
                setStoryIndex(0);
                setStoryPick(null);
                setStoryScore(0);
              }}
            >
              Restart Story
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

