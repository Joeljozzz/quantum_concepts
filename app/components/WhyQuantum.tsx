"use client";

import React, { useState, useEffect, useRef } from 'react';
import Reveal from './Reveal';

const TOTAL_CELLS = 64; // 8x8 grid

export default function WhyQuantum() {
  const [target, setTarget] = useState<number | null>(null);
  const [checkedCells, setCheckedCells] = useState<number[]>([]);
  const [quantumGlowCells, setQuantumGlowCells] = useState<number[]>([]);
  const [found, setFound] = useState(false);
  const [mode, setMode] = useState<'idle' | 'classical' | 'quantum'>('idle');
  const [classicalSteps, setClassicalSteps] = useState(0);
  const [quantumSteps, setQuantumSteps] = useState(0);

  const classicalIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    reset();
    return () => clearClassicalInterval();
  }, []);

  const clearClassicalInterval = () => {
    if (classicalIntervalRef.current) {
      clearInterval(classicalIntervalRef.current);
      classicalIntervalRef.current = null;
    }
  };

  const reset = () => {
    clearClassicalInterval();
    setTarget(Math.floor(Math.random() * TOTAL_CELLS));
    setCheckedCells([]);
    setQuantumGlowCells([]);
    setFound(false);
    setMode('idle');
    setClassicalSteps(0);
    setQuantumSteps(0);
  };

  const startClassical = () => {
    if (mode !== 'idle') reset();
    setMode('classical');
    
    let currentCheck = 0;
    
    classicalIntervalRef.current = setInterval(() => {
      setCheckedCells(prev => [...prev, currentCheck]);
      setClassicalSteps(prev => prev + 1);
      
      // Fix potential stale state inside setInterval by using function parameter or just looking at currentCheck
      if (currentCheck === target) {
        setFound(true);
        clearClassicalInterval();
      } else {
        currentCheck++;
        if (currentCheck >= TOTAL_CELLS) {
            clearClassicalInterval();
        }
      }
    }, 100);
  };

  const startQuantum = () => {
    if (mode !== 'idle') reset();
    setMode('quantum');
    setQuantumSteps(8);
    
    // Pick ~8 random cells including target
    const glows = new Set<number>();
    if (target !== null) {
       glows.add(target);
    }
    while (glows.size < 8) {
        glows.add(Math.floor(Math.random() * TOTAL_CELLS));
    }
    
    setQuantumGlowCells(Array.from(glows));
    setFound(true);
  };

  return (
    <Reveal as="section" className="chapter-section" variant="up" id="why-quantum">
      <div className="chapter-heading">
        <span className="chapter-index">01</span>
        <h2>Why Quantum? The Limits of Classical Computing</h2>
        <p>Some problems are simply too vast for classical computers. Searching an unsorted database, factoring large numbers, or simulating molecules would take classical computers millions of years. Quantum computers use fundamentally different rules to find answers faster.</p>
      </div>

      <div className="demo-container search-demo">
        <div className="search-controls">
           <button onClick={startClassical} disabled={mode === 'classical' && !found}>Classical Search</button>
           <button onClick={startQuantum} disabled={mode === 'classical' && !found}>Quantum Search</button>
           <button onClick={reset}>Reset</button>
        </div>

        <div className="search-grid">
          {Array.from({ length: TOTAL_CELLS }).map((_, i) => {
            const isChecked = checkedCells.includes(i);
            const isQuantumGlow = quantumGlowCells.includes(i);
            const isFoundTarget = found && i === target;
            
            let cellClass = "search-cell";
            if (isFoundTarget) {
               cellClass += " found";
            } else if (isQuantumGlow) {
               cellClass += " quantum-glow";
            } else if (isChecked) {
               cellClass += " checked";
            }

            return <div key={i} className={cellClass}></div>;
          })}
        </div>

        <div className="counter-row">
           <div className="counter-box classical">
              <span>Classical Steps:</span>
              <strong>{classicalSteps}</strong>
           </div>
           <div className="counter-box quantum">
              <span>Quantum Steps:</span>
              <strong>{quantumSteps}</strong>
           </div>
        </div>
        
        <p className="explanatory-text">
           Classical computers check one item at a time. For a database of N items, that's up to N checks. Quantum search (Grover's algorithm) finds it in roughly √N steps — a quadratic speedup that becomes enormous at scale.
        </p>
      </div>
    </Reveal>
  );
}
