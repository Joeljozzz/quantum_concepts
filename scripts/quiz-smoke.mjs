import fs from "node:fs";
import path from "node:path";

const appDir = path.resolve(process.cwd(), "app");

function readAllSource(dir) {
  let combined = "";
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      combined += readAllSource(fullPath);
    } else if (/\.(tsx?|css)$/.test(entry.name)) {
      combined += fs.readFileSync(fullPath, "utf8");
    }
  }
  return combined;
}

if (!fs.existsSync(appDir)) {
  console.error("Smoke check failed: app directory was not found.");
  process.exit(1);
}

const source = readAllSource(appDir);

const requiredStrings = [
  "Grover",
  "Classical CPU vs Quantum Processor",
  "Test Your Understanding",
  "Step 1 Round",
  "Where This Connects to AI",
  "Amplitude Amplification",
  "Runtime Explorer"
];

const missing = requiredStrings.filter((token) => !source.includes(token));

if (missing.length > 0) {
  console.error("Smoke check failed: missing expected UI text:");
  for (const item of missing) {
    console.error(`- ${item}`);
  }
  process.exit(1);
}

const promptCount = (source.match(/prompt:/g) || []).length;
if (promptCount < 4) {
  console.error(`Smoke check failed: expected at least 4 quiz prompts, found ${promptCount}.`);
  process.exit(1);
}

console.log(
  "Smoke check passed: hero, classical-vs-quantum lab, runtime explorer, Grover lab, quantum+AI chapter, and story quiz all detected."
);

