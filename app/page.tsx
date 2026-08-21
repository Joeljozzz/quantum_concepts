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

type RuntimeOption = {
  label: string;
  detail: string;
};

const lessonSteps: LessonStep[] = [
  {
    title: "1) The Misleading Pop-Sci Summary",
    message:
      "The claim 'quantum tries all inputs in parallel and instantly reveals the answer' leads to wrong intuition for search problems.",
    visualHint: "Show a fake shortcut arrow to O(1), then cross it out."
  },
  {
    title: "2) The Opening Quiz (Needle in a Haystack)",
    message:
      "Given a black-box verifier f(x) that is true for exactly one secret key in 0..N-1, classical search needs O(N) checks on average.",
    visualHint:
      "One highlighted key in a long row; average classical attempts around N/2."
  },
  {
    title: "3) Correct Quantum Runtime",
    message:
      "The right asymptotic runtime is O(sqrt(N)), not O(1), O(log N), or O(log log N). This was proven optimal, and Grover achieves it.",
    visualHint: "Bar chart of runtimes with O(sqrt(N)) highlighted as the winner."
  },
  {
    title: "4) State Vector + Born Rule",
    message:
      "A k-qubit program evolves a unit state vector with 2^k components. Squared magnitudes give measurement probabilities.",
    visualHint: "Components can be positive or negative; signs matter for interference."
  },
  {
    title: "5) Grover Geometry",
    message:
      "Oracle flips the marked amplitude sign, diffusion reflects around the equal-superposition direction. Two reflections make a rotation by 2theta.",
    visualHint: "State vector rotates toward the key; overshoot if you rotate too far."
  },
  {
    title: "6) Why the pi/4 Constant Appears",
    message:
      "With sin(theta) = 1/sqrt(N), each Grover round rotates by about 2/sqrt(N). Reaching near pi/2 radians takes about pi/4 * sqrt(N) rounds.",
    visualHint: "Quarter-turn target angle divided by per-round angle."
  }
];

const quizQuestions: QuizQuestion[] = [
  {
    prompt: "Why is O(1) wrong for this black-box search task?",
    choices: [
      "Because qubits cannot store binary",
      "Because one measurement gives one sampled output, not all candidates",
      "Because quantum gates are slower than classical gates",
      "Because only NP-complete problems are allowed"
    ],
    answerIndex: 1,
    explanation:
      "The state may encode amplitudes over many candidates, but readout returns a single random bit string."
  },
  {
    prompt: "In the state-vector model, measurement probabilities are obtained by:",
    choices: [
      "Taking each component magnitude and squaring it",
      "Adding all components directly",
      "Taking only positive entries",
      "Sorting amplitudes by absolute value"
    ],
    answerIndex: 0,
    explanation:
      "This is the Born-rule mapping used in the lesson: probability for each output is |amplitude|^2."
  },
  {
    prompt: "What is the geometric effect of 'oracle reflection + diffusion reflection'?",
    choices: [
      "A random walk over all basis states",
      "A projection onto measured output",
      "A rotation in a 2D plane by 2theta",
      "An irreversible collapse to the key"
    ],
    answerIndex: 2,
    explanation:
      "Two reflections compose into a rotation. In Grover, this rotation increment is 2theta in the 2D search plane."
  },
  {
    prompt: "For one marked item, the near-optimal Grover iteration count is:",
    choices: [
      "O(log N)",
      "pi/4 * sqrt(N)",
      "N/2",
      "O(1)"
    ],
    answerIndex: 1,
    explanation:
      "This is the famous constant hidden by big-O: about pi/4 times sqrt(N)."
  }
];

const runtimeOptions: RuntimeOption[] = [
  { label: "O(sqrt(N))", detail: "Quadratic speedup (correct for Grover search)." },
  { label: "O(log N)", detail: "Would be exponential speedup over linear search." },
  { label: "O(log log N)", detail: "Even stronger, but not achievable here." },
  { label: "O(1)", detail: "Constant time regardless of search-space size." }
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
  const [runtimePick, setRuntimePick] = useState<number | null>(null);

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
        <h2>Opening Intuition Quiz</h2>
        <p>
          Suppose a verifier function returns true for exactly one secret key in a range of size N.
          In a quantum setting, what is the best asymptotic runtime to find that key?
        </p>
        <div className="grid cols-2">
          {runtimeOptions.map((option, idx) => (
            <button key={option.label} onClick={() => setRuntimePick(idx)}>
              {option.label}
            </button>
          ))}
        </div>
        {runtimePick !== null ? (
          <div className="notice">
            <p className="small">You picked: {runtimeOptions[runtimePick].label}</p>
            <p className="small">{runtimeOptions[runtimePick].detail}</p>
            <p className="small">
              Correct answer: <strong>O(sqrt(N))</strong>. The algorithm uses amplitude amplification,
              not instant extraction of the key from "all states at once".
            </p>
          </div>
        ) : null}
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
          This sequence now follows the video's core arc: misconception check, black-box search
          quiz, state-vector model, and the geometric rotation view behind Grover's pi/4 * sqrt(N)
          runtime.
        </p>
      </section>
    </main>
  );
}

