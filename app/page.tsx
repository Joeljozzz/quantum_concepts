import HeroSection from "./components/HeroSection";
import ScrollProgress from "./components/ScrollProgress";
import WhyQuantum from "./components/WhyQuantum";
import BitsVsQubits from "./components/BitsVsQubits";
import QuantumSuperpowers from "./components/QuantumSuperpowers";
import RealWorldProblems from "./components/RealWorldProblems";
import QuantumComputers from "./components/QuantumComputers";
import HowItWorks from "./components/HowItWorks";
import QuantumPlusAI from "./components/QuantumPlusAI";
import FutureInfrastructure from "./components/FutureInfrastructure";
import Quiz from "./components/Quiz";
import Reveal from "./components/Reveal";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <HeroSection />
      <main className="chapters-shell">
        <WhyQuantum />
        <BitsVsQubits />
        <QuantumSuperpowers />
        <RealWorldProblems />
        <QuantumComputers />
        <HowItWorks />
        <QuantumPlusAI />
        <FutureInfrastructure />
        <Quiz />

        <Reveal as="section" variant="up" className="chapter">
          <div className="glass-card" style={{ textAlign: "center", padding: "48px 24px" }}>
            <h3 style={{ marginBottom: 12 }}>Thank You</h3>
            <p>
              Quantum computing is not science fiction — it is happening now.
              The organizations that prepare today will lead tomorrow.
            </p>
            <p className="small" style={{ marginTop: 16, opacity: 0.6 }}>
              This interactive experience is for educational purposes.
              Charts and comparisons are illustrative simulations, not hardware benchmarks.
            </p>
          </div>
        </Reveal>
      </main>
    </>
  );
}
