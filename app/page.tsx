import HeroSection from "./components/HeroSection";
import ScrollProgress from "./components/ScrollProgress";
import AbstractionCompare from "./components/AbstractionCompare";
import QubitVector from "./components/QubitVector";
import OracleLab from "./components/OracleLab";
import CircuitView from "./components/CircuitView";
import RuntimeExplorer from "./components/RuntimeExplorer";
import GroverLab from "./components/GroverLab";
import MeasurementLab from "./components/MeasurementLab";
import QuantumAI from "./components/QuantumAI";
import StoryQuiz from "./components/StoryQuiz";
import Reveal from "./components/Reveal";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <main className="chapters-shell">
        <AbstractionCompare />
        <QubitVector />
        <OracleLab />
        <CircuitView />
        <RuntimeExplorer />
        <GroverLab />
        <MeasurementLab />
        <QuantumAI />
        <StoryQuiz />

        <Reveal as="section" variant="up" className="chapter footer-chapter">
          <div className="card glass-card">
            <h3>Notes for Presentation</h3>
            <p className="small">
              This experience follows a sequential arc: classical vs quantum abstraction, a single
              qubit as a rotating vector, the verifier function behind every search problem, the
              actual circuit the processor runs, the real runtime result behind Grover&apos;s
              algorithm, the geometric rotation mechanism, what measurement collapse really means,
              and where the same amplitude-rotation idea shows up in quantum-assisted AI
              subroutines. Charts here are educational simulations, not hardware benchmarks.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}

