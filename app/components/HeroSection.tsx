"use client";

import React from 'react';
import ParticleField from './ParticleField';
import Reveal from './Reveal';

export default function HeroSection() {
  return (
    <header className='hero-shell'>
      <ParticleField />
      <div className='hero-content'>
        <span className='hero-eyebrow'>The Future of Computing</span>
        <h1 className='hero-title'>
          Understanding <span className='grad-text'>Quantum Computing</span>{' '}
          & Its <span className='grad-text-alt'>Impact on AI</span>
        </h1>
        <p className='hero-sub'>
          An interactive journey through quantum mechanics, real quantum hardware,
          and how quantum computing will revolutionize artificial intelligence
          and the infrastructure that powers our world.
        </p>
        <div className='hero-cta-row'>
          <a href='#why-quantum' className='hero-cta'>Begin the Journey ↓</a>
          <span className='hero-hint'>Scroll to explore</span>
        </div>
      </div>
      <div className='hero-chip' aria-hidden='true'>
        <div className='hero-chip-inner' />
      </div>
      <div className='hero-orbit' aria-hidden='true'>
        <span className='orbit-node n1' />
        <span className='orbit-node n2' />
        <span className='orbit-node n3' />
        <span className='orbit-node n4' />
        <span className='orbit-ring r1' />
        <span className='orbit-ring r2' />
      </div>
    </header>
  );
}
