#!/usr/bin/env node
// scripts/check-version-sync.mjs
// The release version lives in four files; fail when any of them drift.
// Run from anywhere: node scripts/check-version-sync.mjs
import { readFileSync } from "node:fs";

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const found = {};

found["README.md header"] = read("README.md").match(/^\*\*Version:\*\* (\S+)/m)?.[1];
found["website/package.json"] = JSON.parse(read("website/package.json")).version;
found["website/lib/site.ts VERSION"] = read("website/lib/site.ts").match(
  /export const VERSION = "([^"]+)"/,
)?.[1];

const prompt = read("prompts/SYSTEM_PROMPT.md");
found["SYSTEM_PROMPT.md header"] = prompt.match(/SYSTEM PROMPT \(v([\d.]+)\)/)?.[1];
const footers = [...prompt.matchAll(/Running GAIA Code ([\d.]+)/g)].map((m) => m[1]);
footers.forEach((v, i) => {
  found[`SYSTEM_PROMPT.md footer #${i + 1}`] = v;
});
if (footers.length === 0) found["SYSTEM_PROMPT.md footer"] = undefined;

for (const [where, v] of Object.entries(found)) {
  console.log(`${(v ?? "NOT FOUND").padEnd(10)} ${where}`);
}

const versions = new Set(Object.values(found));
if (versions.size !== 1 || versions.has(undefined)) {
  console.error("\n✗ Version drift detected — all locations must carry the same version.");
  process.exit(1);
}
console.log(`\n✓ All version strings agree: ${[...versions][0]}`);
