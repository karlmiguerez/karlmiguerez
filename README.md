# Karlo Miguel Perez — `Karlmiguerez`

**Design lead at W Labs.** I take products from the first conversation through to
what actually launches — research, interface design, design systems, and the
decisions in between.

Eight years in, mostly on work that had to survive contact with real users:
medical imaging tools, live-commerce platforms, surveillance dashboards, and the
brand and product design behind them.

🔗 **[karlmiguerez.vercel.app](https://karlmiguerez.vercel.app)** — portfolio and case studies
📐 **[/foundations](https://karlmiguerez.vercel.app/foundations)** — the design system behind that site, audited against a public standard, including the gaps I haven't closed yet
💬 [LinkedIn](https://www.linkedin.com/in/karlomiguelperez/)

I care about the parts of design that don't photograph well: whether a keyboard
user can reach what they need, whether a decision is written down somewhere the
next person can find it, and whether the thing shipped.

---

<details>
<summary><strong>Technical documentation for this repository</strong> — architecture, conventions, and the docs contract</summary>

<br />

Static portfolio site. Plain HTML, CSS and vanilla JS.
**No build step, no framework, no dependencies.** Deployed on Vercel.

> **Reading this as an AI agent?** Start here, then `docs/design-system.md` for the
> component map and `docs/progress.md` for history. The rules are in `CLAUDE.md`;
> the sync contract is under [Documentation contract](#documentation-contract).

## Running it

```bash
# Simplest — no server needed for most work
open index.html

# With clean URLs + the /api routes working (recommended)
./dev.sh                 # starts server.js detached on port 4830
open http://localhost:4830
```

`dev.sh` runs `server.js`, a dependency-free Node server that mirrors Vercel's
behaviour locally: clean URLs (`/tmc` → `tmc.html`), Range requests for video, and
delegation of `/api/*` to the handlers in `api/`. Port **4830** is reserved for this
project so it won't collide with anything else.

There is nothing to install and nothing to compile. Editing a file and reloading is
the entire loop.

## Layout

```
.
├── index.html                  # Home: Projects → What I do → Q&A → Let's talk
├── foundations.html            # The design system, documented and self-audited
│
├── tmc.html                    # ── 8 case studies, one file each ──
├── snaplive-2.html
├── w-labs-brand-website-revamp.html
├── smart-surveillance-system.html
├── wiz-assistant.html
├── lc-oct-skin-measurement-analysis.html
├── cafune-scalp-condition-tracking.html
├── brainarch-brain-ct-lesion-analysis.html
│
├── style.css                   # ALL styles. :root is the token source of truth.
├── script.js                   # ALL behaviour. Independent IIFEs, see below.
│
├── assets/
│   ├── partials/               # nav.html + footer.html, fetched at runtime
│   ├── images/                 # 1x and @2x pairs; see naming rules below
│   └── videos/                 # Q&A answers, promos, animated vectors
│
├── api/status.js               # Vercel function: live-status checks (allowlisted)
├── server.js                   # Local dev server (mirrors Vercel)
├── dev.sh                      # Starts server.js on :4830
│
├── docs/
│   ├── design-system.md        # Atomic-design map of every class
│   └── progress.md             # Session-by-session history
├── tools/check-docs.mjs        # Verifies docs match style.css :root
└── .githooks/pre-commit        # Warns on doc drift (see below)
```

## Architecture

**Nav and footer are injected at runtime.** Every page contains
`<div id="nav-partial"></div>` and `<div id="footer-partial"></div>`; `script.js`
fetches `assets/partials/*.html` and *replaces* those placeholders. Two consequences
that bite if you forget them:

- Editing navigation means editing `assets/partials/nav.html` **once**, not nine pages.
- The placeholder elements no longer exist after load — don't query `#footer-partial`
  to test whether the footer rendered. Query `.footer`.
- Anything depending on nav/footer DOM must run *after* `initPartials()`.

**`script.js` is a sequence of independent IIFEs**, each guarding its own existence
(`if (!el) return;`), so every page loads the same file and each feature simply
no-ops where its markup is absent. Add features the same way; don't introduce a
router or a bundler.

**Case-study pages share one section order** — Overview → context → Process → work →
Outcome. This is deliberate and normalised across all eight. Keep it.

**`api/status.js`** checks whether each project's production site is up. URLs are
allowlisted **server-side on purpose** — accepting a URL from the query string would
make it an open proxy (SSRF). To add a project, add it to the `SITES` map there.

## The token layer

`style.css :root` is the **single source of truth** for design tokens. Everything
else — this file, `docs/design-system.md`, `foundations.html` — describes what
`:root` declares. When they disagree, `:root` is right and the docs are stale.

| Group | Tokens | Notes |
|---|---|---|
| Color | `--bg` `--bg-card` `--white` `--text` `--text-muted` `--accent` `--border` | Every text value clears WCAG AA (4.5:1) on all three surfaces |
| Semantic | `--success` `--danger` `--warning` `--info` | **Fills only.** Too light for text |
| Semantic text | `--success-text` | Darkened for labels — a fill and a label can't share one value |
| Spacing | `--space-4xs` … `--space-9xl` | 16 steps, derived from values already in use |
| Elevation | `--shadow-sm/md/lg` | Defined; not yet adopted (7 hand-written shadows remain) |
| Layering | `--z-raised` … `--z-modal-ui` | Named layers — never write a bare `z-index` |
| Motion | `--ease-standard` `--ease-out` `--dur-fast/base/slow` | All collapse to ~0 under reduced motion |

Exact current values live in `:root`. They are **not duplicated here on purpose** —
one place to change, and `tools/check-docs.mjs` enforces that any value the docs
*do* quote matches.

### Rules

- **Never write a raw `z-index`.** Pick a layer token.
- **Never use a semantic color as text.** Use its `-text` variant, or add one.
- **Prefer a `--space-*` token** over a new rem value. 77% of spacing declarations
  are on-scale; 37 remain off-scale and are tracked in `foundations.html`.
- **Two CSS blocks must stay last, in this order:** `ACCESSIBILITY`, then
  `REDUCED MOTION`. They use `!important` to beat the temporary `FLAT MODE` block
  above them. Appending after them will silently break focus outlines.

## Accessibility

Non-negotiable, and already implemented — don't regress it:

- Skip link is the first tab stop on every page (WCAG 2.4.1).
- All text meets AA contrast, verified by computation not eyeballing.
- Collapsed Q&A panels are `inert` — a clipped panel must never keep focusable
  children, or keyboard users tab into invisible controls.
- Keyboard focus *reveals* what it reaches: focusing a Q&A question opens it,
  focusing a workflow dot shows its step and pauses the carousel.
- All motion respects `prefers-reduced-motion`.
- Decorative SVGs carry `aria-hidden`.

`foundations.html` documents the reasoning and lists what's still open.

## Conventions

- **Spelling:** `Karlmiguerez` is one word, capitalised or lowercase. Never two words.
- **Asset paths:** always `assets/images/filename.ext` — never root-relative guesses.
- **Hi-res images:** ship `name.jpg` plus `name-2x.jpg`; the lightbox reads
  `data-hires` and swaps in the 2× above 1025px.
- **Slugs:** page filenames are descriptive, not numbered. A title should tell a
  visitor what the project is without opening it.
- **Headline copy** lives in the `headlineCopies` array at the top of `script.js`.
- **Accent colour** changes in `:root` only; everything cascades.

## Documentation contract

**This README must be updated in the same commit as any change to structure,
tokens, conventions, architecture, or how to run the project.**

It is the first thing a human or an AI agent reads. A README describing a repo that
no longer exists is worse than none — it makes confident, wrong decisions cheap.

Who updates what:

| Change | Update |
|---|---|
| Tokens, scales, colors | `:root`, then `foundations.html`, then `docs/design-system.md` |
| New component or class | `docs/design-system.md` |
| Structure, tooling, conventions, setup | **`README.md`** (this section) |
| Anything at all | `docs/progress.md` session log |

### Enforcement

```bash
node tools/check-docs.mjs      # exit 1 on drift
node tools/check-docs.mjs --warn
```

It parses `:root` and flags any token value quoted in `README.md`, `docs/*.md` or
`foundations.html` that disagrees. Historical changelog lines (`#1B4FFF → #6155F5`)
are recognised and skipped; use `<!-- doc-check:ignore -->` for anything else that
intentionally quotes an old value.

A **warning** pre-commit hook runs it and also flags source changes that leave
`README.md` untouched. It does not block the commit — it prompts you to think.
Enable it once per clone:

```bash
git config core.hooksPath .githooks
```

## Deploying

Push to `main`. Vercel redeploys automatically. `vercel.json` sets `cleanUrls` and
`trailingSlash: false` — `server.js` mirrors both locally, so what you see on :4830
is what ships.

</details>

---

<sub>Portfolio built with care · No frameworks · No dependencies</sub>
