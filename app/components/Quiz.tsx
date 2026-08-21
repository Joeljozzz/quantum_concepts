"use client";

import React, { useState } from "react";
import Reveal from "./Reveal";

const QUESTIONS = [
  {
    question: "What makes quantum computers fundamentally different from classical computers?",
    choices: ["They use faster transistors", "They use qubits that can exist in superposition", "They have more memory", "They run at higher clock speeds"],
    correctIndex: 1,
    explanation: "Qubits leverage superposition and entanglement — phenomena that have no classical equivalent — to process information in fundamentally new ways."
  },
  {
    question: "How much faster is Grover's quantum search compared to classical search?",
    choices: ["10× faster", "Exponentially faster", "Quadratically faster (√N vs N)", "The same speed but more accurate"],
    correctIndex: 2,
    explanation: "Grover's algorithm provides a proven quadratic speedup: √N queries instead of N. This is significant — for a billion items, that's ~31,623 vs 1,000,000,000 checks."
  },
  {
    question: "What happens when you measure a qubit in superposition?",
    choices: ["You see both states simultaneously", "It collapses to either 0 or 1 probabilistically", "Nothing changes", "It always shows 1"],
    correctIndex: 1,
    explanation: "Measurement collapses the superposition. The qubit randomly becomes |0⟩ or |1⟩ based on its probability amplitudes. This is why algorithms must amplify the right answer's probability before measuring."
  },
  {
    question: "Which company demonstrated quantum supremacy first?",
    choices: ["IBM", "Microsoft", "Google", "D-Wave"],
    correctIndex: 2,
    explanation: "Google's Sycamore processor completed a specific calculation in 200 seconds that would take the best classical supercomputer approximately 10,000 years."
  },
  {
    question: "How does quantum computing enhance AI?",
    choices: ["It replaces neural networks entirely", "It speeds up search and optimization subroutines within AI pipelines", "It eliminates the need for training data", "It only helps with image recognition"],
    correctIndex: 1,
    explanation: "Quantum computing doesn't replace AI — it supercharges specific subroutines like search, optimization, and simulation that are bottlenecks in AI pipelines."
  },
  {
    question: "Why must quantum processors be cooled to near absolute zero?",
    choices: ["To make them run faster", "To reduce electrical resistance and maintain quantum coherence", "To save energy", "It's just for show"],
    correctIndex: 1,
    explanation: "Superconducting qubits require temperatures of ~15 millikelvin to eliminate thermal noise. At these temperatures, quantum states can be maintained long enough to perform useful computations."
  }
];

export default function Quiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ picked: number; correct: boolean }[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (selectedAnswer !== null) return; // prevent multiple clicks
    setSelectedAnswer(index);
    const isCorrect = index === QUESTIONS[currentQ].correctIndex;
    setAnswers([...answers, { picked: index, correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
  };

  const currentQuestionData = QUESTIONS[currentQ];
  const isAnswered = selectedAnswer !== null;
  const isCorrect = isAnswered && selectedAnswer === currentQuestionData.correctIndex;
  
  const score = answers.filter(a => a.correct).length;
  let praiseMessage = "Keep learning — quantum is complex! 🔬";
  if (score === 6) praiseMessage = "Perfect! You're quantum-ready! 🎉";
  else if (score === 5) praiseMessage = "Excellent! Almost perfect! 🌟";
  else if (score === 4) praiseMessage = "Great job! Solid understanding! 💪";
  else if (score === 3) praiseMessage = "Good start! Keep exploring! 📚";

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <Reveal variant="up">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-4xl font-mono text-muted-foreground/50">09</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Test Your Quantum Knowledge</h2>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <div className="quiz-shell glass-card p-6 md:p-10">
            {!showResult ? (
              <>
                <div className="flex gap-2 mb-8 justify-center">
                  {QUESTIONS.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-3 h-3 rounded-full quiz-dot ${
                        idx === currentQ ? 'bg-primary scale-125' : 
                        answers[idx] ? (answers[idx].correct ? 'bg-green-500' : 'bg-red-500') : 'bg-muted'
                      } transition-all`}
                    />
                  ))}
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 quiz-question">
                    Question {currentQ + 1} of {QUESTIONS.length}: {currentQuestionData.question}
                  </h3>
                  
                  <div className="flex flex-col gap-3 quiz-choices">
                    {currentQuestionData.choices.map((choice, idx) => {
                      let btnClass = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
                      if (isAnswered) {
                        if (idx === currentQuestionData.correctIndex) {
                          btnClass = "bg-green-500/20 border-green-500 border text-green-500";
                        } else if (idx === selectedAnswer) {
                          btnClass = "bg-red-500/20 border-red-500 border text-red-500";
                        } else {
                          btnClass = "bg-secondary/50 opacity-50";
                        }
                      }
                      
                      return (
                        <button 
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          disabled={isAnswered}
                          className={`p-4 rounded-lg text-left transition-all quiz-choice ${btnClass}`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {isAnswered && (
                  <div className={`p-4 rounded-lg mb-6 quiz-feedback ${isCorrect ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    <div className="font-bold mb-2">{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</div>
                    <p>{currentQuestionData.explanation}</p>
                  </div>
                )}

                <div className="flex justify-end">
                  <button 
                    onClick={handleNext}
                    disabled={!isAnswered}
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold disabled:opacity-50 transition-all hover:bg-primary/90"
                  >
                    {currentQ === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 quiz-result">
                <div className="text-6xl mb-6">🏆</div>
                <h3 className="text-3xl font-bold mb-4">Quiz Completed!</h3>
                <div className="text-5xl font-mono font-bold text-primary mb-6 quiz-score">
                  {score} / {QUESTIONS.length}
                </div>
                <p className="text-xl text-muted-foreground mb-8 quiz-result-text">{praiseMessage}</p>
                <button 
                  onClick={resetQuiz}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold transition-all hover:bg-primary/90 text-lg"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
