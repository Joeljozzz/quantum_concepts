# Quantum Concepts Interactive Demo (Vercel App)

Interactive teaching app for quantum basics with a focused Grover's algorithm visualizer and quiz flow.

## What it includes

- Sequential concept walkthrough (bit vs qubit, superposition, phase marking, diffusion, optimal rounds)
- Grover visualizer with:
  - Qubit count controls (2 to 6)
  - Marked-state selection
  - Iterative round application
  - Probability bar chart for all basis states
- Multiple-choice quiz focused on Grover intuition
- Smoke-check script to validate core lesson/quiz UI content

## Tech

- Next.js (App Router)
- TypeScript
- Plain CSS

## Local run

```powershell
npm install
npm run check
npm run build
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import the repository in Vercel.
3. Keep default framework detection (`Next.js`).
4. Deploy.

Or use the Vercel CLI:

```powershell
npm install -g vercel
vercel
```

## Notes

- Content is written as original educational paraphrases of standard quantum concepts.
- The Grover chart is an educational approximation for one marked item using common closed-form amplitude intuition.

