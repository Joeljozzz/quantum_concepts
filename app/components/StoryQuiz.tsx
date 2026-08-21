"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type StoryQuestion = {
  title: string;
  prompt: string;
  choices: string[];
  answerIndex: number;
  reveal: string;
};

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
    reveal: "Correct. The oracle marks phase. Probabilities change after diffusion, not at mark time."
  },
  {
    title: "Scene 3: Runtime Result",
    prompt: "Best asymptotic query complexity for one marked item in unstructured search?",
    choices: ["O(N)", "O(sqrt(N))", "O(log N)"],
    answerIndex: 1,
    reveal: "Correct. This quadratic speedup is the key result and matches the BBBV lower bound order."
  },
  {
    title: "Scene 4: AI Connection",
    prompt: "Why is a quadratic quantum speedup still valuable for AI subroutines?",
    choices: [
      "Because it turns any classical model into a quantum one automatically",
      "Because fewer evaluations are needed to concentrate probability on a good candidate",
      "Because it removes the need for training data entirely"
    ],
    answerIndex: 1,
    reveal:
      "Correct. Fewer required evaluations mean faster search-like subroutines, even without a full end-to-end quantum model."
  }
];

export default function StoryQuiz() {
  const [storyIndex, setStoryIndex] = useState(0);
  const [storyPick, setStoryPick] = useState<number | null>(null);
  const [storyScore, setStoryScore] = useState(0);

  const activeStory = storyQuestions[storyIndex];

  return (
    <section className="chapter">
      <Reveal as="div" className="chapter-heading" variant="up">
        <span className="chapter-index">09</span>
        <h2>Test Your Understanding</h2>
        <p>Four short scenes, four checkpoint questions. Unlock the next scene by answering.</p>
      </Reveal>

      <Reveal as="div" variant="scale" delay={100}>
        <div className="card glass-card story-card">
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
      </Reveal>
    </section>
  );
}

