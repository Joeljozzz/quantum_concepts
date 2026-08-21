# Quantum Concepts Interactive Demo (Vercel App)

An animated, scroll-driven web experience explaining quantum computing concepts sequentially,
culminating in a chapter on how the same ideas connect to quantum-enhanced AI.

## What it includes

- **Mobile-friendly, fully responsive** layout: hero, cards, circuit diagrams, and bar charts all
  reflow for phone-sized screens (single-column grids, full-width controls, scrollable circuit)
- **Animated hero** with a canvas particle/qubit background and orbiting nodes
- **Scroll-reveal storytelling**: each chapter animates in as you scroll (fade/slide/scale)
- **Chapter 01 — Classical CPU vs Quantum Processor**: live side-by-side abstraction layers
  (data types, bits, hardware) with an interactive "measure" action
- **Chapter 02 — The Qubit Is a Rotating Arrow**: single-qubit 2D vector view; apply a Hadamard
  gate and watch the probability split change live
- **Chapter 03 — The Function That Actually Answers**: click-to-query verifier function f(x) on
  a classical grid (one query at a time), next to the same function as a quantum oracle that
  flips one amplitude's sign in a single call
- **Chapter 04 — Under the Hood: The Actual Circuit**: an actual gate-level circuit diagram
  (Hadamard row, repeated Oracle + Diffuser blocks, final measurement), with a round-count slider
- **Chapter 05 — Runtime Explorer**: adjustable N slider comparing O(N), O(sqrt(N)), O(log N),
  O(log log N) with animated bars and a curve chart quiz
- **Chapter 06 — Grover Lab**: rotating state-vector animation plus a live amplitude bar chart,
  with play/step/reset controls
- **Chapter 07 — Measurement Collapses the State**: shows the true probability distribution,
  then "measures" it into one random collapsed outcome that stays fixed until re-prepared
- **Chapter 08 — Where This Connects to AI**: quantum feature maps, amplitude amplification,
  HHL-style linear algebra speedups, and a simulated classical-vs-quantum-assisted convergence
  chart, with an honest "why it is not automatic" caveat card
- **Chapter 09 — Story Mode Quiz**: four scene-based checkpoint questions
- Smoke-check script validating all chapters are present in the built source

## Tech

- Next.js 16 (App Router), React Server Components composing client "chapter" components
- TypeScript
- Canvas-based particle animation (no extra animation library required)
- IntersectionObserver-based scroll-reveal hook (`app/lib/hooks.ts`)
- Plain CSS with keyframe animations, glass-morphism cards, gradient text, and a dedicated
  mobile-responsive breakpoint pass (960px / 720px / 480px)

## Project structure

```
app/
  page.tsx                  Composes all chapters (server component)
  layout.tsx                 Root layout + viewport meta (mobile scaling)
  globals.css               Design tokens + animation system + responsive breakpoints
  components/
    HeroSection.tsx          Animated hero + particle background
    ParticleField.tsx         Canvas particle/qubit animation
    ScrollProgress.tsx        Top scroll-progress bar
    Reveal.tsx                 Scroll-triggered entrance animation wrapper
    AbstractionCompare.tsx    Classical vs quantum abstraction layers
    QubitVector.tsx            Single-qubit 2D rotating vector + Hadamard demo
    OracleLab.tsx               Classical verifier function vs quantum oracle phase flip
    CircuitView.tsx              Gate-level circuit diagram (H, Oracle, Diffuser, Measure)
    RuntimeExplorer.tsx        O(N) vs O(sqrt(N)) explorer + quiz curves
    GroverLab.tsx               Grover rotation animation + amplitude bars
    MeasurementLab.tsx           Measurement/collapse demonstration
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
