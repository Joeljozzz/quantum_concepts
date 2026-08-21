"use client";

import { useScrollProgress } from "../lib/hooks";

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
    </div>
  );
}

