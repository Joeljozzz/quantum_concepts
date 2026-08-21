"use client";

import React, { useMemo } from "react";
import Reveal from "./Reveal";
import { useAnimatedCounter } from "../lib/hooks";

export default function QuantumPlusAI() {
  const pointsClassical = useMemo(() => {
    let pts = [];
    for (let i = 0; i <= 30; i++) {
      let x = 30 + (i / 30) * 360;
      let t = i / 30;
      let y = 200 - 170 * (1 - Math.exp(-2 * t));
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  }, []);

  const pointsQuantum = useMemo(() => {
    let pts = [];
    for (let i = 0; i <= 30; i++) {
      let x = 30 + (i / 30) * 360;
      let t = i / 30;
      let y = 200 - 170 * (1 - Math.exp(-5 * t));
      pts.push(`${x},${y}`);
    }
    return pts.join(" ");
  }, []);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal variant="up">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-4xl font-mono text-muted-foreground/50">07</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Quantum + AI: The Ultimate Convergence</h2>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <div className="ai-hero-stat flex flex-wrap justify-center gap-8 mb-16">
            <div className="ai-stat-card glass-card p-6 text-center flex-1 min-w-[200px]">
              <div className="text-5xl font-bold text-cyan-400 mb-2 ai-stat-number cyan">√N</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Search Speedup</div>
            </div>
            <div className="ai-stat-card glass-card p-6 text-center flex-1 min-w-[200px]">
              <div className="text-5xl font-bold text-purple-400 mb-2 ai-stat-number purple">2^N</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">State Space Scaling</div>
            </div>
            <div className="ai-stat-card glass-card p-6 text-center flex-1 min-w-[200px]">
              <div className="text-5xl font-bold text-green-400 mb-2 ai-stat-number green">1000×</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Simulation Advantage</div>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={200}>
          <div className="usecase-grid grid md:grid-cols-2 gap-6 mb-16">
            <div className="usecase-card glass-card p-6">
              <div className="text-4xl mb-4 usecase-icon">🧠</div>
              <h3 className="text-xl font-bold mb-3">Quantum Machine Learning</h3>
              <p className="text-muted-foreground">Quantum kernels map data into exponentially large feature spaces, enabling pattern recognition that classical ML cannot achieve. This means better classification, clustering, and anomaly detection.</p>
            </div>
            <div className="usecase-card glass-card p-6">
              <div className="text-4xl mb-4 usecase-icon">🔍</div>
              <h3 className="text-xl font-bold mb-3">Faster Training Search</h3>
              <p className="text-muted-foreground">Amplitude amplification (the same principle as Grover's algorithm) speeds up hyperparameter tuning and architecture search by evaluating candidates quadratically faster.</p>
            </div>
            <div className="usecase-card glass-card p-6">
              <div className="text-4xl mb-4 usecase-icon">💊</div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Drug Discovery</h3>
              <p className="text-muted-foreground">Quantum simulation generates molecular interaction data that feeds into AI models, creating a virtuous cycle: quantum computes what classical can't, AI learns patterns from the results.</p>
            </div>
            <div className="usecase-card glass-card p-6">
              <div className="text-4xl mb-4 usecase-icon">⚡</div>
              <h3 className="text-xl font-bold mb-3">Optimization at Scale</h3>
              <p className="text-muted-foreground">Quantum-enhanced optimization solves combinatorial problems in AI pipelines — from neural architecture search to reinforcement learning action selection — exponentially faster.</p>
            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={300}>
          <div className="convergence-chart glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Convergence Speed: Classical AI vs Quantum-Enhanced AI</h3>
            <div className="flex flex-col items-center">
              <svg viewBox="0 0 420 220" className="w-full max-w-lg chart-svg mb-4">
                <line x1="30" y1="20" x2="30" y2="200" stroke="currentColor" strokeWidth="2" className="chart-axis opacity-50" />
                <line x1="30" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="2" className="chart-axis opacity-50" />
                <text x="215" y="215" fill="currentColor" fontSize="12" textAnchor="middle" className="chart-label opacity-70">Training Steps</text>
                <text x="15" y="110" fill="currentColor" fontSize="12" textAnchor="middle" transform="rotate(-90 15 110)" className="chart-label opacity-70">Accuracy</text>
                
                <polyline points={pointsClassical} fill="none" stroke="#f97316" strokeWidth="3" className="chart-line-classical" />
                <polyline points={pointsQuantum} fill="none" stroke="#22d3ee" strokeWidth="3" className="chart-line-quantum" />
              </svg>
              <div className="chart-legend flex gap-6 mt-2 mb-6">
                <div className="legend-item flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Classical AI</span>
                </div>
                <div className="legend-item flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                  <span className="text-sm">Quantum-Enhanced AI</span>
                </div>
              </div>
              <p className="text-muted-foreground text-center max-w-2xl">
                Quantum algorithms can significantly accelerate the learning curve, reaching higher accuracy in fewer training steps by exploring the solution space more efficiently.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
