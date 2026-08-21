# Quantum Concepts Interactive Demo (Vercel App)

An animated, scroll-driven web experience explaining quantum computing concepts sequentially,
culminating in a chapter on how the same ideas connect to quantum-enhanced AI.

## What it includes

- **Animated hero** with a canvas particle/qubit background and orbiting nodes
- **Scroll-reveal storytelling**: each chapter animates in as you scroll (fade/slide/scale)
- **Chapter 01 — Classical CPU vs Quantum Processor**: live side-by-side abstraction layers
  (data types, bits, hardware) with an interactive "measure" action
- **Chapter 02 — Runtime Explorer**: adjustable N slider comparing O(N), O(sqrt(N)), O(log N),
  O(log log N) with animated bars and a curve chart quiz
- **Chapter 03 — Grover Lab**: rotating state-vector animation plus a live amplitude bar chart,
  with play/step/reset controls
- **Chapter 04 — Where This Connects to AI**: quantum feature maps, amplitude amplification,
  HHL-style linear algebra speedups, and a simulated classical-vs-quantum-assisted convergence
  chart, with an honest "why it is not automatic" caveat card
- **Chapter 05 — Story Mode Quiz**: four scene-based checkpoint questions
- Smoke-check script validating all chapters are present in the built source

## Tech

- Next.js 16 (App Router), React Server Components composing client "chapter" components
- TypeScript
- Canvas-based particle animation (no extra animation library required)
- IntersectionObserver-based scroll-reveal hook (`app/lib/hooks.ts`)
- Plain CSS with keyframe animations, glass-morphism cards, gradient text

## Project structure

```
app/
  page.tsx                  Composes all chapters (server component)
  globals.css               Design tokens + animation system
  components/
    HeroSection.tsx          Animated hero + particle background
    ParticleField.tsx         Canvas particle/qubit animation
    ScrollProgress.tsx        Top scroll-progress bar
    Reveal.tsx                 Scroll-triggered entrance animation wrapper
    AbstractionCompare.tsx    Classical vs quantum abstraction layers
    RuntimeExplorer.tsx        O(N) vs O(sqrt(N)) explorer + quiz curves
    GroverLab.tsx               Grover rotation animation + amplitude bars
    QuantumAI.tsx                Quantum + AI concepts and convergence chart
    StoryQuiz.tsx                 Scene-based checkpoint quiz
  lib/
    hooks.ts                  useReveal / useScrollProgress hooks
    quantumMath.ts              Shared math helpers (Grover amplitudes, curves)
```

## Local run

```powershell
npm install
npm run check
npm run build
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

This project is configured for Vercel via `vercel.json`.

### Option A: Git-based deployment (recommended)

1. Push this folder to GitHub.
2. Import `Joeljozzz/quantum_concepts` in Vercel.
3. Confirm settings:
   - Framework Preset: `Next.js`
   - Install Command: `npm install`
   - Build Command: `npm run build`
4. Click Deploy.

### Option B: Vercel CLI deployment

```powershell
npm install -g vercel
vercel
vercel --prod
```

## Notes

- Content is written as original educational paraphrases of standard quantum computing and
  quantum-ML concepts.
- The Grover chart uses the standard closed-form amplitude formula for one marked item.
- The Quantum + AI convergence chart is an illustrative simulation, not a hardware benchmark;
  it is meant to visualize the sqrt(N) scaling intuition, not to claim a specific ML result.
