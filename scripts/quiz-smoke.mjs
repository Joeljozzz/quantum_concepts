import fs from "node:fs";
import path from "node:path";

const pagePath = path.resolve(process.cwd(), "app", "page.tsx");

if (!fs.existsSync(pagePath)) {
  console.error("Smoke check failed: app/page.tsx was not found.");
  process.exit(1);
}

const source = fs.readFileSync(pagePath, "utf8");

const requiredStrings = [
  "Grover Visualizer",
  "Sequential Walkthrough",
  "Quick Quiz",
  "Apply 1 Grover Round"
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

console.log("Smoke check passed: quantum lesson, Grover visualizer, and quiz content detected.");

