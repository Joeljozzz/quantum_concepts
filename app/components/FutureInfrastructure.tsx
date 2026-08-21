"use client";

import React from "react";
import Reveal from "./Reveal";

export default function FutureInfrastructure() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <Reveal variant="up">
          <div className="flex items-center gap-4 mb-12">
            <span className="text-4xl font-mono text-muted-foreground/50">08</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Road Ahead: Infrastructure & Timeline</h2>
          </div>
        </Reveal>

        <Reveal variant="up" delay={100}>
          <div className="glass-card p-8 mb-16">
            <h3 className="text-2xl font-bold mb-8">The Quantum Computing Roadmap</h3>
            <div className="timeline relative pl-4 md:pl-0">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2"></div>
              <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-border"></div>

              <div className="timeline-item relative mb-12 md:flex justify-between items-center w-full">
                <div className="md:w-5/12 mb-4 md:mb-0 text-left md:text-right pr-0 md:pr-8 pl-8 md:pl-0">
                  <div className="text-xl font-bold text-primary">2024-2025</div>
                  <h4 className="text-lg font-semibold mt-1">NISQ Era</h4>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 border-4 border-background timeline-dot now -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0"></div>
                <div className="md:w-5/12 pl-8 md:pl-8 text-muted-foreground">
                  Noisy Intermediate-Scale Quantum computers with 50-1000+ qubits. Hybrid classical-quantum algorithms. Cloud access expanding.
                </div>
              </div>

              <div className="timeline-item relative mb-12 md:flex justify-between items-center w-full">
                <div className="md:w-5/12 mb-4 md:mb-0 text-left pl-8 md:pl-8 order-1 md:order-2">
                  <div className="text-xl font-bold text-primary">2026-2028</div>
                  <h4 className="text-lg font-semibold mt-1">Early Fault Tolerance</h4>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-background timeline-dot now -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0 order-2 md:order-1"></div>
                <div className="md:w-5/12 pl-8 md:pr-8 text-left md:text-right text-muted-foreground order-3 md:order-0">
                  Error-corrected logical qubits emerge. 10,000+ physical qubits. First quantum advantage in chemistry and optimization.
                </div>
              </div>

              <div className="timeline-item relative mb-12 md:flex justify-between items-center w-full">
                <div className="md:w-5/12 mb-4 md:mb-0 text-left md:text-right pr-0 md:pr-8 pl-8 md:pl-0">
                  <div className="text-xl font-bold text-primary">2029-2032</div>
                  <h4 className="text-lg font-semibold mt-1">Quantum Advantage</h4>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 border-background timeline-dot near -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0"></div>
                <div className="md:w-5/12 pl-8 md:pl-8 text-muted-foreground">
                  Practical quantum advantage across multiple industries. Quantum-classical hybrid workflows become standard in enterprise computing.
                </div>
              </div>

              <div className="timeline-item relative md:flex justify-between items-center w-full">
                <div className="md:w-5/12 mb-4 md:mb-0 text-left pl-8 md:pl-8 order-1 md:order-2">
                  <div className="text-xl font-bold text-primary">2033+</div>
                  <h4 className="text-lg font-semibold mt-1">Fault-Tolerant Era</h4>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-purple-700 border-4 border-background timeline-dot far -translate-x-[7px] md:-translate-x-1/2 mt-1.5 md:mt-0 order-2 md:order-1"></div>
                <div className="md:w-5/12 pl-8 md:pr-8 text-left md:text-right text-muted-foreground order-3 md:order-0">
                  Million-qubit machines running complex algorithms. Quantum internet. Post-quantum cryptography fully deployed.
                </div>
              </div>

            </div>
          </div>
        </Reveal>

        <Reveal variant="up" delay={200}>
          <h3 className="text-2xl font-bold mb-8">How Infrastructure Will Change</h3>
          <div className="infra-cards grid md:grid-cols-2 gap-6">
            <div className="infra-card glass-card p-6">
              <div className="text-4xl mb-4 infra-icon">☁️</div>
              <h4 className="text-xl font-bold mb-3">Cloud Architecture</h4>
              <p className="text-muted-foreground">Quantum processing units (QPUs) join GPUs and TPUs in cloud data centers. Hybrid orchestration layers route computations to the optimal processor type.</p>
            </div>
            <div className="infra-card glass-card p-6">
              <div className="text-4xl mb-4 infra-icon">🔒</div>
              <h4 className="text-xl font-bold mb-3">Security Overhaul</h4>
              <p className="text-muted-foreground">Post-quantum cryptography replaces RSA and ECC. Quantum Key Distribution enables physically unhackable communication channels.</p>
            </div>
            <div className="infra-card glass-card p-6">
              <div className="text-4xl mb-4 infra-icon">🔄</div>
              <h4 className="text-xl font-bold mb-3">Hybrid Computing</h4>
              <p className="text-muted-foreground">Classical computers handle data I/O and pre-processing. Quantum processors solve the exponentially hard subproblems. Results flow back to classical systems.</p>
            </div>
            <div className="infra-card glass-card p-6">
              <div className="text-4xl mb-4 infra-icon">💻</div>
              <h4 className="text-xl font-bold mb-3">New Programming</h4>
              <p className="text-muted-foreground">Quantum programming languages (Qiskit, Cirq, Q#) become standard skills. Quantum-aware compilers optimize circuit depth and qubit allocation automatically.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
