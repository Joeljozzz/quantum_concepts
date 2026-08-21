export function clamped(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function formatState(index: number, qubits: number): string {
  return `|${index.toString(2).padStart(qubits, "0")}>`;
}

export function randomByWeights(weights: number[]): number {
  const target = Math.random();
  let sum = 0;
  for (let i = 0; i < weights.length; i += 1) {
    sum += weights[i];
    if (target <= sum) {
      return i;
    }
  }
  return weights.length - 1;
}

export type CurveKind = "linear" | "sqrt" | "log" | "loglog";

export function curvePath(kind: CurveKind): string {
  const points: string[] = [];
  for (let i = 0; i <= 10; i += 1) {
    const t = i / 10;
    const x = 30 + t * 360;
    let y = 0;
    if (kind === "linear") {
      y = t;
    } else if (kind === "sqrt") {
      y = Math.sqrt(t);
    } else if (kind === "log") {
      y = Math.log2(1 + 31 * t) / Math.log2(32);
    } else {
      y = Math.log2(1 + Math.log2(1 + 63 * t)) / Math.log2(1 + Math.log2(64));
    }
    points.push(`${x},${220 - y * 170}`);
  }
  return points.join(" ");
}

export function groverAmplitudes(n: number, iterations: number, markedIndex: number) {
  const theta = Math.asin(1 / Math.sqrt(n));
  const t = (2 * iterations + 1) * theta;
  const markedAmp = Math.sin(t);
  const unmarkedAmp = Math.cos(t) / Math.sqrt(Math.max(n - 1, 1));
  const markedProbability = markedAmp * markedAmp;
  const unmarkedProbability = unmarkedAmp * unmarkedAmp;
  const probabilities = Array.from({ length: n }, (_, idx) =>
    idx === markedIndex ? markedProbability : unmarkedProbability
  );
  const optimal = Math.max(1, Math.round((Math.PI / 4) * Math.sqrt(n)));
  return { probabilities, markedProbability, optimal, theta };
}

