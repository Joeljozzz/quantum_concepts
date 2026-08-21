"use client";

import { useMemo, useState } from "react";

type LessonStep = {
  title: string;
  message: string;
  visualHint: string;
};

type QuizQuestion = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

const lessonSteps: LessonStep[] = [
  {
    title: "1) Bit vs Qubit",
    message:
      "A classical bit is either 0 or 1. A qubit can be in a weighted combination of both until you measure it.",
    visualHint: "Imagine two bars (|0> and |1>) that can both be non-zero at once."
  },
  {
    title: "2) Superposition",
    message:
      "A Hadamard-like operation spreads amplitude across many states, which lets one operation influence many possibilities.",
    visualHint:
      "Start from one tall bar at |00...0>; then flatten to equal bars across all states."
  },
  {
    title: "3) Phase Marking",
    message:
      "In Grover's search, the target state's phase is flipped. You do not directly increase probability yet; you mark it for interference.",
    visualHint: "Target bar keeps size but changes sign (phase), setting up the next step."
  },
  {
    title: "4) Diffusion (Inversion About Mean)",
    message:
      "The diffusion operation reflects amplitudes around the average, making the marked state grow while others shrink.",
    visualHint: "Think of bars mirrored around a center line; target becomes taller."
  },
  {
    title: "5) Repeat Near Optimal Count",
    message:
      "Repeat oracle + diffusion around pi/4 * sqrt(N) times for one marked item. Too many rounds overshoot.",
    visualHint: "Probability rises like a wave, peaks, then falls if you keep going."
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    prompt: "In Grover's algorithm, what does the oracle primarily do?",
    choices: [
      "Measures all qubits",
      "Flips the phase of the marked state",
      "Sorts the basis states",
      "Copies the marked state"
    ],
    answerIndex: 1,
    explanation:
      "The oracle marks the desired state by phase inversion so interference can amplify it in later steps."
  },
  {
    prompt: "Why is diffusion useful after the phase flip?",
    choices: [
      "It randomizes amplitudes",
      "It deletes unmarked states",
      "It reflects amplitudes around the mean to amplify the target",
      "It converts qubits into bits"
    ],
    answerIndex: 2,
    explanation:
      "Diffusion is the amplitude-amplification step that increases target probability."
  },
  {
    prompt: "For one marked item, the rough optimal number of Grover rounds is:",
    choices: ["log2(N)", "N/2", "pi/4 * sqrt(N)", "N"],
    answerIndex: 2,
    explanation:
      "The amplitude rotation angle leads to an optimal iteration count around pi/4 * sqrt(N)."
  },
  {
    prompt: "What can happen if you keep applying Grover rounds past the optimum?",
    choices: [
      "Probability stays at 100%",
      "The system freezes",
      "You overshoot and target probability drops",
      "The oracle no longer works"
    ],
    answerIndex: 2,
    explanation:
      "Amplitude rotates continuously, so extra rounds move away from the peak."
  }
];

function clamped(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function formatState(index: number, qubits: number): string {
  return `|${index.toString(2).padStart(qubits, "0")}>`;
}

export default function HomePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [qubits, setQubits] = useState(3);
  const [marked, setMarked] = useState(5);
  const [iterations, setIterations] = useState(0);

  const [quizCursor, setQuizCursor] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);

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

  const activeQuestion = quizQuestions[quizCursor];

  const handleChoose = (choiceIdx: number): void => {
    if (picked !== null) {
      return;
    }
    setPicked(choiceIdx);
    if (choiceIdx === activeQuestion.answerIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = (): void => {
    if (quizCursor === quizQuestions.length - 1) {
      return;
    }
    setQuizCursor((prev) => prev + 1);
    setPicked(null);
  };

  const handleResetQuiz = (): void => {
    setQuizCursor(0);
    setPicked(null);
    setScore(0);
  };

  return (
    <main>
      <section className="hero mt-surface-external">
        <h1>Quantum Concepts Interactive Demo</h1>
        <p>
          This app turns common quantum-computing explanations into an interactive web story,
          with a focused section on Grover&apos;s algorithm and quick quizzes.
        </p>
        <p className="small">
          Prepared for <span className="mt-company-name">Mettler Toledo</span>
          <span className="mt-trademark-symbol">TM</span> educational presentations.
        </p>
      </section>

      <section>
        <h2>Sequential Walkthrough</h2>
        <div className="toolbar">
          <span className="badge">
            Step {stepIndex + 1} / {lessonSteps.length}
          </span>
          <button
            onClick={() => setStepIndex((prev) => clamped(prev - 1, 0, lessonSteps.length - 1))}
            disabled={stepIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={() => setStepIndex((prev) => clamped(prev + 1, 0, lessonSteps.length - 1))}
            disabled={stepIndex === lessonSteps.length - 1}
          >
            Next
          </button>
        </div>
        <div className="card">
          <h3>{lessonSteps[stepIndex].title}</h3>
          <p>{lessonSteps[stepIndex].message}</p>
          <p className="small">Visual cue: {lessonSteps[stepIndex].visualHint}</p>
        </div>
      </section>

      <section>
        <h2>Grover Visualizer</h2>
        <p>
          Change qubits, choose a marked state, and apply Grover rounds to see probability
          amplification.
        </p>

        <div className="toolbar">
          <label>
            Qubits:{" "}
            <input
              type="number"
              min={2}
              max={6}
              value={qubits}
              onChange={(e) => {
                const nextQubits = clamped(Number(e.target.value) || 2, 2, 6);
                setQubits(nextQubits);
                const maxState = 2 ** nextQubits - 1;
                setMarked((prev) => clamped(prev, 0, maxState));
                setIterations(0);
              }}
            />
          </label>

          <label>
            Marked state:{" "}
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

          <button onClick={() => setIterations((prev) => prev + 1)}>Apply 1 Grover Round</button>
          <button onClick={() => setIterations(0)}>Reset Rounds</button>
        </div>

        <div className="grid cols-2">
          <div className="card">
            <h3>Iteration Stats</h3>
            <p className="small">Current rounds: {iterations}</p>
            <p className="small">Suggested near-optimal rounds: {groverData.optimal}</p>
            <p className="small">
              Marked-state probability: {(groverData.markedProbability * 100).toFixed(2)}%
            </p>
            <p className="small">Rotation parameter theta: {groverData.theta.toFixed(4)} rad</p>
          </div>
          <div className="card">
            <h3>Concept Note</h3>
            <p className="small">
              Each round combines an oracle phase flip and diffusion reflection. Probability moves
              toward the marked state, then overshoots with too many rounds.
            </p>
          </div>
        </div>

        <div className="bar-chart">
          {groverData.probabilities.map((prob, idx) => {
            const heightPx = Math.max(8, Math.round(prob * 200));
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
        <p>
          Test your understanding of Grover&apos;s idea: phase marking plus interference-driven
          amplification.
        </p>
        <div className="card">
          <h3>
            Question {quizCursor + 1} / {quizQuestions.length}
          </h3>
          <p>{activeQuestion.prompt}</p>

          {activeQuestion.choices.map((choice, idx) => {
            const isPicked = picked === idx;
            const isAnswer = idx === activeQuestion.answerIndex;
            const className =
              picked === null
                ? "quiz-option"
                : `quiz-option ${isAnswer ? "correct" : isPicked ? "wrong" : ""}`;

            return (
              <button
                key={choice}
                className={className}
                onClick={() => handleChoose(idx)}
                disabled={picked !== null}
              >
                {choice}
              </button>
            );
          })}

          {picked !== null ? (
            <div className="notice">
              <p className="small">{activeQuestion.explanation}</p>
            </div>
          ) : null}

          <div className="toolbar">
            <span className="badge">
              Score: {score} / {quizQuestions.length}
            </span>
            <button onClick={handleNextQuestion} disabled={picked === null || quizCursor === quizQuestions.length - 1}>
              Next Question
            </button>
            <button onClick={handleResetQuiz}>Restart Quiz</button>
          </div>
        </div>
      </section>

      <section>
        <h2>Notes for Presentation</h2>
        <p>
          The explanations here are original paraphrases of standard quantum concepts and are
          designed for interactive teaching in a Vercel-ready web UI.
        </p>
      </section>
    </main>
  );
}

