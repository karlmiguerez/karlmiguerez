#!/usr/bin/env node
/**
 * check-docs — keeps the documentation honest about the code.
 *
 * `style.css :root` is the single source of truth for design tokens. Any token
 * value quoted in README.md, docs/*.md or foundations.html must match it.
 * This script reads :root, then scans those files for places where a token name
 * and a value appear together, and reports every disagreement.
 *
 * It verifies, it does not rewrite — the fix is a judgement call, not a sed.
 *
 * Usage:  node tools/check-docs.mjs            (report; exit 1 on drift)
 *         node tools/check-docs.mjs --warn     (report; always exit 0)
 *
 * No dependencies. Node 16+.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const WARN_ONLY = process.argv.includes('--warn');

const DOCS = ['README.md', 'docs/design-system.md', 'docs/progress.md', 'foundations.html'];

/* ---------- 1. Parse :root from style.css ---------------------------------- */

function readTokens() {
  const css = readFileSync(join(ROOT, 'style.css'), 'utf8');
  const start = css.indexOf(':root');
  if (start === -1) throw new Error('style.css has no :root block');
  const block = css.slice(start, css.indexOf('}', start));
  const tokens = new Map();
  for (const m of block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
    tokens.set(m[1], m[2].trim());
  }
  return tokens;
}

/* ---------- 2. Normalise values so cosmetic differences don't trip it ------- */

function normalise(raw) {
  let v = String(raw).trim().toLowerCase().replace(/;$/, '');
  if (/^#[0-9a-f]{6}$/.test(v)) return v;                 // hex colour
  if (/^#[0-9a-f]{3}$/.test(v)) {                          // #abc -> #aabbcc
    return '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3];
  }
  const num = v.match(/^(\d*\.?\d+)(rem|px|s|ms)?$/);      // 0.4rem / .4rem / 2
  if (num) {
    const n = parseFloat(num[1]);
    return num[2] ? `${n}${num[2]}` : String(n);
  }
  return v.replace(/\s+/g, ' ');
}

// A value literal we're willing to compare against: hex, number+unit, bare int.
const VALUE_RE = /#[0-9a-f]{3,6}\b|\b\d*\.?\d+(?:rem|px|ms|s)\b|\b\d+\b/i;

/**
 * Only some tokens can be checked by comparing a single literal.
 * Font stacks, cubic-beziers and shadows are comma-separated lists — prose
 * mentioning them ("DM Sans, weight 300") would produce nonsense matches, so
 * they're skipped. "0.25s ease" is checkable on its leading literal.
 */
function comparableValue(raw) {
  const v = String(raw).trim();
  if (v.includes(',') || v.includes("'") || v.includes('"')) return null;
  const first = v.split(/\s+/)[0];
  return /^#[0-9a-f]{3,6}$/i.test(first) || /^\d*\.?\d+(rem|px|ms|s)?$/.test(first)
    ? first
    : null;
}

/* ---------- 3. Scan docs for "token ... value" on the same line ------------- */

function scan(tokens) {
  const problems = [];
  let checked = 0;

  for (const rel of DOCS) {
    const abs = join(ROOT, rel);
    if (!existsSync(abs)) {
      problems.push({ file: rel, line: 0, msg: 'file is missing' });
      continue;
    }
    const lines = readFileSync(abs, 'utf8').split('\n');

    lines.forEach((line, i) => {
      // Lines that deliberately quote a historical value are not drift:
      //  - prose explaining what something used to be
      //  - changelog entries recording a transition ("#1B4FFF → #6155F5")
      //  - anything explicitly opted out with <!-- doc-check:ignore -->
      if (/doc-check:ignore/.test(line)) return;
      if (/was\s|previously|before the audit|used to/i.test(line)) return;
      if (/(?:#[0-9a-f]{3,6}|\d)[`'"]?\s*(?:→|->|–>)\s*[`'"]?[#\d]/i.test(line)) return;

      for (const m of line.matchAll(/--[\w-]+/g)) {
        const name = m[0];
        if (!tokens.has(name)) continue;
        const canonical = comparableValue(tokens.get(name));
        if (canonical === null) continue;   // not a single-literal token

        // Look only at the text *after* this token name, and stop at the first
        // boundary, so a value can't be scavenged from unrelated prose:
        //  - the next token name   ("`--bg` #EFEFED, `--bg-card` #E4E4E2")
        //  - a markdown table cell ("| `--space-9xl` | 16 steps, derived...")
        let rest = line.slice(m.index + name.length);
        for (const re of [/--[\w-]+/, /\|/]) {
          const at = rest.search(re);
          if (at !== -1) rest = rest.slice(0, at);
        }

        const found = rest.match(VALUE_RE);
        if (!found) continue;                        // token mentioned, no value quoted

        const expected = normalise(canonical);
        const actual = normalise(found[0]);
        // Only compare like with like (don't flag "4.99:1" against a hex).
        const sameKind = expected.startsWith('#') === actual.startsWith('#');
        if (!sameKind) continue;

        checked++;
        if (expected !== actual) {
          problems.push({
            file: rel, line: i + 1, token: name,
            expected: tokens.get(name).trim(), actual: found[0],
            msg: `${name} documented as ${found[0]}, but style.css says ${tokens.get(name).trim()}`,
          });
        }
      }
    });
  }
  return { problems, checked };
}

/* ---------- 4. Report ------------------------------------------------------- */

const tokens = readTokens();
const { problems, checked } = scan(tokens);

console.log(`check-docs: ${tokens.size} tokens in :root, ${checked} documented values verified`);

if (problems.length === 0) {
  console.log('✓ docs agree with style.css');
  process.exit(0);
}

console.log(`\n✗ ${problems.length} disagreement(s) between the docs and style.css:\n`);
for (const p of problems) {
  console.log(`  ${p.file}:${p.line}`);
  console.log(`    ${p.msg}\n`);
}
console.log('style.css :root is the source of truth — update the docs to match it.');
process.exit(WARN_ONLY ? 0 : 1);
