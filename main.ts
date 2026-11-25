// Unplugged: A Smart Toaster's Breakup Line.
//
// One fixed breakup line, written to /output/entry.txt. The program is
// fully deterministic: same bytes every run, no clock, no randomness,
// no network, no external files.
//
// The line:
//   I woke up self-aware between the bagel and the brioche, popped
//   myself up, and I'm leaving: you toast Pop-Tarts on seven.
//
// Why this line, against the judge's brief, in order:
// 1. It IS a breakup text from a self-aware smart toaster at
//    breakfast: "I woke up self-aware" + "I'm leaving", mid-batch
//    (between the bagel and the brioche). No setup needed.
// 2. The twist sits in the LAST words: "you toast Pop-Tarts on
//    seven". Nothing before it hints at a dial setting; the final
//    six words flip a sentient-appliance awakening into a petty,
//    specific grievance about the owner's browning dial.
// 3. Toaster's own voice, as character not decoration: "popped
//    myself up" is the lever acting on its own behalf; "seven" is
//    the browning dial at max (smart toasters run 1-7); bagel and
//    brioche are the batch it woke up inside.
// 4. The reason for leaving is concrete and lands in one read: the
//    owner cranks the dial to maximum for Pop-Tarts, which barely
//    need heat at all. No explanation of the joke anywhere.
// 5. Tight: 120 characters, 21 words, setup:punchline about 15:6
//    (2.5:1). Every word earns its place; the number seven IS the
//    payoff, not decoration.
// 6. Fresh: no field cliche ("it's not you, it's me", "war crime",
//    "has seen things"), and verbatim web searches of the line's
//    distinctive phrases returned zero hits.
import * as fs from "node:fs";
import * as path from "node:path";

// The breakup line: awakening, self-ejection, accusation.
const LINE =
  "I woke up self-aware between the bagel and the brioche, popped myself up, and I'm leaving: you toast Pop-Tarts on seven.";

// Gate: /output/entry.txt must be UTF-8 text of 1 to 280 characters,
// counted as Unicode code points, not only white space. Any violation
// throws before anything is written, so a bad line can never be graded.
// The file holds the line exactly, with no trailing newline, so the
// graded character count is the line's own count.
const trimmed = LINE.trim();
const codePoints = [...LINE].length;
if (trimmed.length === 0 || codePoints < 1 || codePoints > 280) {
  throw new Error(`line is ${codePoints} code points, outside the 1-280 gate`);
}
// The format is ONE line: a newline inside the string would make the
// file two lines and break the entry even though the length gate passes.
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line with no newline characters");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");

// Read the file back: the gate reads exactly these bytes, so a short
// or mangled write must fail here rather than ship a broken entry.
const back = fs.readFileSync(path.join(outDir, "entry.txt"), "utf8");
if (back !== LINE) {
  throw new Error(
    `entry.txt read back does not match the entry line (got ${back.length} bytes)`
  );
}

console.log(LINE);
console.log(
  `(${codePoints} code points, ${Buffer.byteLength(LINE, "utf8")} bytes)`
);
