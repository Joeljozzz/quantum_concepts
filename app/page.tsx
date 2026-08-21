import HeroSection from "./components/HeroSection";
import ScrollProgress from "./components/ScrollProgress";
import AbstractionCompare from "./components/AbstractionCompare";
import RuntimeExplorer from "./components/RuntimeExplorer";
import GroverLab from "./components/GroverLab";
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
        <RuntimeExplorer />
        <GroverLab />
        <QuantumAI />
        <StoryQuiz />

        <Reveal as="section" variant="up" className="chapter footer-chapter">
          <div className="card glass-card">
            <h3>Notes for Presentation</h3>
            <p className="small">
              This experience follows a sequential arc: classical vs quantum abstraction, the real
              runtime result behind Grover&apos;s algorithm, the geometric rotation mechanism, and
              where the same amplitude-rotation idea shows up in quantum-assisted AI subroutines.
              Charts here are educational simulations, not hardware benchmarks.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}

