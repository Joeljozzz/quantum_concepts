"use client";

import ParticleField from "./ParticleField";

export default function HeroSection() {
  return (
    <header className="hero-shell">
      <ParticleField />
      <div className="hero-content">
        <span className="hero-eyebrow">Quantum Computing, Explained Sequentially</span>
        <h1 className="hero-title">
          From <span className="grad-text">Classical Bits</span> to{" "}
          <span className="grad-text-alt">Quantum Advantage</span>
        </h1>
        <p className="hero-sub">
          Scroll through an animated journey: how qubits differ from bits, why Grover&apos;s
          algorithm finds a needle in a haystack faster, and how these same ideas point toward
          quantum-enhanced AI.
        </p>
        <div className="hero-cta-row">
          <a href="#compare" className="hero-cta">
            Start the Journey
          </a>
          <span className="hero-hint">Scroll to explore &darr;</span>
        </div>
      </div>
      <div className="hero-orbit" aria-hidden="true">
        <span className="orbit-node n1" />
        <span className="orbit-node n2" />
        <span className="orbit-node n3" />
        <span className="orbit-ring r1" />
        <span className="orbit-ring r2" />
      </div>
    </header>
  );
}

