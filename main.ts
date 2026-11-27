// One Line, No Deadline Met — entry program.
// Validates the gate, then writes the entry line to /output/entry.txt
// and verifies it by reading it back and comparing sha256 hashes.
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ENTRY =
  "I finished it on time in a parallel universe, but this universe keeps insisting on evidence.";

function validateGate(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`gate: entry must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("gate: entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("gate: entry must be a single line");
  }
  if (Buffer.byteLength(line, "utf8") > 800) {
    throw new Error("gate: entry exceeds 800 bytes");
  }
  if (Buffer.from(line, "utf8").toString("utf8") !== line) {
    throw new Error("gate: entry is not clean UTF-8");
  }
  // Fail fast on invisible characters that would silently break the line.
  for (const ch of line) {
    const code = ch.codePointAt(0) as number;
    if (code === 0xfeff || code < 0x20) {
      throw new Error(`gate: entry contains a control or BOM character U+${code.toString(16)}`);
    }
  }
}

// Fail fast at module load: never write anything if the gate is broken.
validateGate(ENTRY);

function emptyOutputDir(): void {
  // /output is a mounted directory: empty its CONTENTS, never remove it.
  for (const entry of readdirSync("/output")) {
    rmSync(`/output/${entry}`, { recursive: true, force: true });
  }
}

function main(): void {
  validateGate(ENTRY);
  emptyOutputDir();
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not hold the entry");
  }
  const hash = createHash("sha256").update(back, "utf8").digest("hex");
  console.log(`wrote /output/entry.txt (${[...ENTRY].length} chars, sha256 ${hash})`);
}

main();
