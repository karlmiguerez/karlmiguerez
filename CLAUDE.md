# CLAUDE.md

Contract for AI agents working in this repository. Read `README.md` first — it is the
map. This file is the rules.

## Orientation (read in this order)

1. **`README.md`** — architecture, how to run it, conventions, token rules.
2. **`docs/design-system.md`** — every class, mapped onto atomic design.
3. **`foundations.html`** — the rendered design system and its open gaps.
4. **`docs/progress.md`** — session-by-session history and why things are the way they are.

## Hard rules

**1. `style.css :root` is the single source of truth for design tokens.**
Never document a token value that contradicts it. After changing `:root`, run
`node tools/check-docs.mjs` and fix whatever it reports.

**2. Update `README.md` in the same change as any structural change.**
Structure, tooling, conventions, setup, token rules, architecture → README. A README
describing a repo that no longer exists is worse than none: it makes confident, wrong
decisions cheap. The pre-commit hook warns about this; don't wait for it.

**3. Log every session in `docs/progress.md`.**
Record the decision and the reasoning, not just the diff. Future agents need to know
*why* — especially where something looks wrong but isn't.

**4. Never regress accessibility.** Specifically:
- A collapsed or visually hidden container must not keep focusable children. Use
  `inert`. This has already been a real bug here (20 invisible tab stops).
- Every text colour clears WCAG AA 4.5:1 on `--bg`, `--bg-card` and `--white`.
  Compute it; don't eyeball it.
- Never use a semantic fill colour (`--success`, `--danger`, `--warning`, `--info`)
  as text. Add or use a `-text` variant.
- All motion respects `prefers-reduced-motion`.
- The skip link stays the first tab stop.

**5. Never write a bare `z-index`.** Use a `--z-*` layer token.

**6. These two CSS blocks must stay last, in this order:** `ACCESSIBILITY`, then
`REDUCED MOTION`. They need `!important` to beat the `FLAT MODE` block above them.
Appending CSS after them silently breaks focus indicators. This has already happened once.

## Working style

- **No build step, no framework, no dependencies.** Don't add a bundler, a router or
  a package manager. Plain HTML/CSS/JS is the deliberate choice.
- **`script.js` is independent IIFEs**, each guarding its own existence so one file
  serves every page. Add features the same way.
- **Surgical changes.** Every changed line should trace to the request. Don't
  "improve" adjacent code, don't refactor what isn't broken, match existing style.
- **Verify, don't assume.** This repo has a habit of proving intuitions wrong —
  `:focus-visible` matching on mouse clicks, reduced-motion freezing an element at
  `scaleY(0)` and making it vanish. When a change could move pixels, measure before
  and after rather than asserting it's fine.
- **Surface tradeoffs instead of picking silently.** Where a change is a design
  decision rather than a refactor (snapping off-scale spacing, consolidating
  shadows), say so and let the owner decide.

## Owner

Karlo Miguel Perez — design lead at W Labs. The site's purpose is to evidence
**design leadership**: process, decision-making and accountability, not just visual
output. Content choices should serve that. `Karlmiguerez` is one word.
