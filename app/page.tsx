"use client";

import { useEffect, useMemo, useState } from "react";

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

type StoryBeat = {
  title: string;
  narration: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  reveal: string;
};

type ShowcaseFrame = {
  title: string;
  subtitle: string;
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

const storyBeats: StoryBeat[] = [
  {
    title: "Scene 1: The Misconception",
    narration:
      "You hear: quantum checks every input in parallel, so search should be instant. The mission is to challenge that intuition.",
    prompt: "If measurement gives one sampled output, what does that imply?",
    options: [
      "You still need amplitude concentrated on the right state",
      "You can always read all states at once",
      "Runtime must be O(1)"
    ],
    answerIndex: 0,
    reveal:
      "Correct. Superposition alone is not enough. The algorithm must shape amplitudes so the right state is likely when sampled."
  },
  {
    title: "Scene 2: Oracle Marking",
    narration:
      "The verifier becomes an oracle that flips only the marked state's sign, leaving all others unchanged.",
    prompt: "What changes immediately after the sign flip?",
    options: [
      "The probabilities instantly become 100% on the key",
      "Only phase/sign changes; probability is not yet amplified",
      "All states collapse to the key"
    ],
    answerIndex: 1,
    reveal:
      "Right. The sign flip is a phase mark. Diffusion is the step that turns that phase information into higher key probability."
  },
  {
    title: "Scene 3: Two Reflections",
    narration:
      "Reflection about the marked-sign axis and reflection about the balance axis combine into a geometric rotation.",
    prompt: "Each Grover round behaves like:",
    options: [
      "A random jump",
      "A 2theta rotation in the search plane",
      "A full collapse"
    ],
    answerIndex: 1,
    reveal:
      "Exactly. Two reflections compose into a rotation, which steadily steers the state vector toward the key direction."
  },
  {
    title: "Scene 4: The Decision",
    narration:
      "The state approaches the key direction near the peak. If you keep iterating, you overshoot and probability falls again.",
    prompt: "Best stopping intuition for one marked item?",
    options: [
      "Stop near pi/4 * sqrt(N)",
      "Stop at log2(N)",
      "Never stop; more rounds is always better"
    ],
    answerIndex: 0,
    reveal:
      "Yes. The peak arrives near pi/4 * sqrt(N), matching the runtime result highlighted in the video."
  }
];

const showcaseFrames: ShowcaseFrame[] = [
  {
    title: "Layers of Abstraction (Side-by-Side)",
    subtitle: "Classical CPU and quantum processor both expose data layers, but with different state models."
  },
  {
    title: "Classical Stack",
    subtitle: "Classical data types map to deterministic bit patterns and transistor hardware."
  },
  {
    title: "Runtime Milestones",
    subtitle: "BBBV lower bound and Grover's matching O(sqrt(N)) algorithm in the 1990s."
  },
  {
    title: "Quiz Curves",
    subtitle: "Compare O(N), O(sqrt(N)), O(log N), O(log log N), and O(1) growth intuition."
  },
  {
    title: "k-Qubit State Vector",
    subtitle: "A k-qubit system corresponds to 2^k basis outcomes in the computational basis."
  },
  {
    title: "Classical AI Pipeline (Reference)",
    subtitle: "A familiar classical stack: attention + MLP blocks composed in sequence."
  },
  {
    title: "Predictive Embedding Pipeline (Reference)",
    subtitle: "Encoder-predictor-encoder structure shown as a comparison-style systems diagram."
  }
];

function clamped(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function formatState(index: number, qubits: number): string {
  return `|${index.toString(2).padStart(qubits, "0")}>`;
}

function ShowcaseVisual({ frameIndex }: { frameIndex: number }) {
  if (frameIndex === 0) {
    return (
      <svg viewBox="0 0 900 360" className="showcase-svg" aria-label="Classical and quantum abstraction layers">
        <rect x="0" y="0" width="900" height="360" fill="#020202" />
        <line x1="450" y1="0" x2="450" y2="360" className="showcase-line" />
        <text x="210" y="45" className="showcase-chip">C</text>
        <text x="660" y="45" className="showcase-chip">|Q&gt;</text>
        <rect x="0" y="85" width="900" height="75" className="showcase-band-a" />
        <rect x="0" y="160" width="900" height="75" className="showcase-band-b" />
        <rect x="0" y="235" width="900" height="75" className="showcase-band-c" />
        <text x="30" y="126" className="showcase-label">Data types</text>
        <text x="30" y="201" className="showcase-label">Bits</text>
        <text x="30" y="276" className="showcase-label">Hardware</text>
        <text x="225" y="126" className="showcase-main">67</text>
        <text x="285" y="126" className="showcase-main">'C'</text>
        <text x="635" y="126" className="showcase-main">|81&gt;</text>
        <text x="160" y="201" className="showcase-main">01000011</text>
        <text x="585" y="201" className="showcase-main">|01010001&gt;</text>
        <text x="205" y="336" className="showcase-footer">Classical CPU</text>
        <text x="585" y="336" className="showcase-footer">Quantum Processor</text>
      </svg>
    );
  }

  if (frameIndex === 1) {
    return (
      <svg viewBox="0 0 900 360" className="showcase-svg" aria-label="Classical-only abstraction panel">
        <rect x="0" y="0" width="900" height="360" fill="#020202" />
        <text x="450" y="50" textAnchor="middle" className="showcase-chip">C</text>
        <rect x="170" y="80" width="530" height="230" className="showcase-band-a" />
        <rect x="170" y="155" width="530" height="75" className="showcase-band-b" />
        <rect x="170" y="230" width="530" height="80" className="showcase-band-c" />
        <text x="65" y="124" className="showcase-label">Data types</text>
        <text x="95" y="199" className="showcase-label">Bits</text>
        <text x="75" y="275" className="showcase-label">Hardware</text>
        <text x="375" y="124" className="showcase-main">67</text>
        <text x="470" y="124" className="showcase-main">'C'</text>
        <text x="300" y="199" className="showcase-main">01000011</text>
        <text x="715" y="195" className="showcase-title">Layers</text>
        <text x="715" y="226" className="showcase-title">of</text>
        <text x="715" y="258" className="showcase-title">Abstraction</text>
      </svg>
    );
  }

  if (frameIndex === 2) {
    return (
      <svg viewBox="0 0 900 360" className="showcase-svg" aria-label="Grover and BBBV runtime timeline">
        <rect x="0" y="0" width="900" height="360" fill="#020202" />
        <line x1="30" y1="300" x2="870" y2="300" className="showcase-axis" />
        <path d="M 45 35 C 20 120, 70 250, 120 300" className="curve-red" />
        <path d="M 75 95 C 90 160, 120 240, 170 300" className="curve-cyan" />
        <text x="28" y="34" className="curve-red-text">BBBV theorem (1994): Search &gt;= O(sqrt(N))</text>
        <text x="80" y="130" className="curve-cyan-text">Grover (1996): Search = O(sqrt(N))</text>
        <text x="675" y="45" className="showcase-main">N = 1,000,000</text>
        <text x="28" y="328" className="showcase-label">1990</text>
        <text x="132" y="328" className="showcase-label">1995</text>
        <text x="245" y="328" className="showcase-label">2000</text>
        <text x="770" y="328" className="showcase-label">2025</text>
      </svg>
    );
  }

  if (frameIndex === 3) {
    return (
      <svg viewBox="0 0 900 360" className="showcase-svg" aria-label="Runtime quiz curves">
        <rect x="0" y="0" width="900" height="360" fill="#020202" />
        <text x="42" y="65" className="showcase-main">A) O(sqrt(N))</text>
        <text x="42" y="115" className="showcase-main">B) O(log(N))</text>
        <text x="42" y="165" className="showcase-main">C) O(log(log(N)))</text>
        <text x="42" y="215" className="showcase-main">D) O(1)</text>
        <line x1="390" y1="35" x2="390" y2="305" className="showcase-axis" />
        <line x1="390" y1="305" x2="860" y2="305" className="showcase-axis" />
        <path d="M 395 300 L 760 55" className="curve-yellow" />
        <path d="M 395 300 C 460 250, 575 230, 760 195" className="curve-orange" />
        <path d="M 395 300 C 470 268, 600 260, 760 240" className="curve-red" />
        <path d="M 395 300 C 490 286, 625 282, 760 276" className="curve-red-soft" />
        <text x="765" y="60" className="curve-yellow-text">O(N)</text>
        <text x="765" y="198" className="curve-orange-text">O(sqrt(N))</text>
        <text x="765" y="243" className="curve-red-text">O(log(N))</text>
        <text x="765" y="280" className="curve-red-soft-text">O(log(log(N)))</text>
      </svg>
    );
  }

  if (frameIndex === 4) {
    return (
      <svg viewBox="0 0 900 360" className="showcase-svg" aria-label="k-qubit to 2^k state components">
        <rect x="0" y="0" width="900" height="360" fill="#020202" />
        <text x="130" y="70" className="showcase-main">k-qubit quantum computer</text>
        <line x1="120" y1="78" x2="560" y2="78" className="showcase-line" />
        <text x="300" y="180" className="showcase-chip">|Q&gt;</text>
        <path d="M 470 180 L 610 180" className="showcase-axis" />
        <path d="M 610 180 L 590 166" className="showcase-axis" />
        <path d="M 610 180 L 590 194" className="showcase-axis" />
        <rect x="710" y="45" width="9" height="260" fill="#d9d9d9" />
        <rect x="724" y="45" width="9" height="260" fill="#9fe7ff" opacity="0.6" />
        <text x="750" y="182" className="showcase-main">2^k</text>
      </svg>
    );
  }

  if (frameIndex === 5) {
    return (
      <svg viewBox="0 0 900 360" className="showcase-svg" aria-label="Classical AI transformer-like block diagram">
        <rect x="0" y="0" width="900" height="360" fill="#020202" />
        <rect x="55" y="45" width="790" height="270" rx="8" className="showcase-outline" />
        <rect x="78" y="68" width="200" height="225" rx="6" className="showcase-outline" />
        <rect x="305" y="68" width="170" height="225" rx="6" className="showcase-outline" />
        <rect x="505" y="68" width="200" height="225" rx="6" className="showcase-outline" />
        <rect x="728" y="68" width="95" height="225" rx="6" className="showcase-outline" />
        <text x="118" y="285" className="showcase-label">ATTENTION</text>
        <text x="333" y="275" className="showcase-label">MULTILAYER</text>
        <text x="335" y="297" className="showcase-label">PERCEPTRON</text>
        <text x="545" y="285" className="showcase-label">ATTENTION</text>
        <text x="732" y="275" className="showcase-label">MLP</text>
        <text x="405" y="330" className="showcase-label">CLASSICAL PIPELINE</text>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 900 360" className="showcase-svg" aria-label="Predictive embedding block diagram">
      <rect x="0" y="0" width="900" height="360" fill="#020202" />
      <text x="120" y="52" className="showcase-main">Predictive embedding architecture</text>
      <rect x="190" y="190" width="120" height="80" rx="8" className="showcase-outline" />
      <text x="220" y="237" className="showcase-label">ENCODER</text>
      <rect x="390" y="115" width="130" height="80" rx="8" className="showcase-outline" />
      <text x="420" y="160" className="showcase-label">PREDICTOR</text>
      <rect x="620" y="190" width="120" height="80" rx="8" className="showcase-outline" />
      <text x="650" y="237" className="showcase-label">ENCODER</text>
      <path d="M 320 225 L 380 155" className="showcase-axis" />
      <path d="M 530 155 L 610 225" className="showcase-axis" />
      <text x="120" y="150" className="curve-cyan-text">[0.1, -0.1, ..., 0.2]</text>
      <text x="560" y="150" className="curve-yellow-text">[0.1, -0.2, ..., 0.2]</text>
      <text x="230" y="300" className="showcase-main">x</text>
      <text x="677" y="300" className="showcase-main">y</text>
    </svg>
  );
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
  const [autoPlay, setAutoPlay] = useState(false);

  const [storyIndex, setStoryIndex] = useState(0);
  const [storyPick, setStoryPick] = useState<number | null>(null);
  const [storyScore, setStoryScore] = useState(0);
  const [showcaseIndex, setShowcaseIndex] = useState(0);
  const [showcaseAutoPlay, setShowcaseAutoPlay] = useState(true);

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
  const activeStory = storyBeats[storyIndex];

  const thetaDegrees = (groverData.theta * 180) / Math.PI;
  const progress = clamped(iterations / Math.max(groverData.optimal, 1), 0, 1.5);
  const rotationDegrees = clamped(progress * 90, 0, 135);

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    const loopLimit = Math.max(groverData.optimal + 3, 5);
    const timer = setInterval(() => {
      setIterations((prev) => (prev >= loopLimit ? 0 : prev + 1));
    }, 700);

    return () => clearInterval(timer);
  }, [autoPlay, groverData.optimal]);

  useEffect(() => {
    if (!showcaseAutoPlay) {
      return;
    }
    const timer = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % showcaseFrames.length);
    }, 2600);

    return () => clearInterval(timer);
  }, [showcaseAutoPlay]);

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

  const handleStoryChoose = (choiceIdx: number): void => {
    if (storyPick !== null) {
      return;
    }
    setStoryPick(choiceIdx);
    if (choiceIdx === activeStory.answerIndex) {
      setStoryScore((prev) => prev + 1);
    }
  };

  const handleNextStory = (): void => {
    if (storyIndex === storyBeats.length - 1) {
      return;
    }
    setStoryIndex((prev) => prev + 1);
    setStoryPick(null);
  };

  const handleStoryRestart = (): void => {
    setStoryIndex(0);
    setStoryPick(null);
    setStoryScore(0);
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
        <h2>Classical CPU vs Quantum Processor Showcase</h2>
        <p>
          This storyboard follows your reference frames as a mini video sequence focused on the
          contrast between classical and quantum computation.
        </p>
        <div className="showcase-stage">
          <div className="showcase-viewport">
            <ShowcaseVisual frameIndex={showcaseIndex} />
          </div>
          <div className="showcase-caption">
            <h3>
              Frame {showcaseIndex + 1}: {showcaseFrames[showcaseIndex].title}
            </h3>
            <p>{showcaseFrames[showcaseIndex].subtitle}</p>
          </div>
          <div className="toolbar">
            <button
              onClick={() => {
                setShowcaseAutoPlay(false);
                setShowcaseIndex((prev) => (prev === 0 ? showcaseFrames.length - 1 : prev - 1));
              }}
            >
              Previous Frame
            </button>
            <button onClick={() => setShowcaseAutoPlay((prev) => !prev)}>
              {showcaseAutoPlay ? "Pause Reel" : "Play Reel"}
            </button>
            <button
              onClick={() => {
                setShowcaseAutoPlay(false);
                setShowcaseIndex((prev) => (prev + 1) % showcaseFrames.length);
              }}
            >
              Next Frame
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2>Video-Style Animation Demo</h2>
        <p>
          This animated panel mimics the video&apos;s geometric story: repeated Grover rounds rotate
          the state toward the key direction, then overshoot if you continue.
        </p>
        <div className="grid cols-2">
          <div className="card">
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
            <p className="small">
              Rotation progress: {rotationDegrees.toFixed(1)} degrees, theta approx {thetaDegrees.toFixed(2)} degrees.
            </p>
          </div>
          <div className="card">
            <h3>Playback Controls</h3>
            <div className="toolbar">
              <button onClick={() => setAutoPlay((prev) => !prev)}>
                {autoPlay ? "Pause Animation" : "Play Animation"}
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
                Reset Animation
              </button>
            </div>
            <p className="small">
              Use play for continuous motion or step mode for slide-by-slide storytelling.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2>Story Mode Quiz</h2>
        <p>
          Walk through four short scenes inspired by the lesson. Each scene asks one checkpoint
          question before you unlock the next scene.
        </p>
        <div className="card">
          <h3>
            {activeStory.title} ({storyIndex + 1}/{storyBeats.length})
          </h3>
          <p>{activeStory.narration}</p>
          <p>{activeStory.prompt}</p>

          {activeStory.options.map((choice, idx) => {
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
                onClick={() => handleStoryChoose(idx)}
                disabled={storyPick !== null}
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
              Story score: {storyScore} / {storyBeats.length}
            </span>
            <button
              onClick={handleNextStory}
              disabled={storyPick === null || storyIndex === storyBeats.length - 1}
            >
              Next Scene
            </button>
            <button onClick={handleStoryRestart}>Restart Story</button>
          </div>
        </div>
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

