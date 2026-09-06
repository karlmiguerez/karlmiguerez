# Karlmiguerez Portfolio — Design System (Atomic Design map)

A map of the portfolio's existing elements onto **Atomic Design** (Foundations → Atoms → Molecules → Organisms → Templates → Pages). Class names refer to `style.css`; behaviors refer to `script.js`. Boundaries between layers are a communication tool, not a law — a few pieces (project card, lightbox) sit on a fence and are flagged as such.

---

## Foundations (design tokens & core styles)

The DNA — nothing renders on its own, but everything inherits from it. Defined in `:root` and the reset/typography blocks.

**Color** — `--bg` `#EFEFED`, `--bg-card` `#E4E4E2`, `--text` `#141414`, `--text-muted` `#6B6B6B`, `--accent` `#6155F5` (indigo), `--border` `#D4D4D2`, `--white` `#F8F8F6`. Semantic: `--success` `#4ECCA3`, `--danger` `#FF6B35`, `--warning` `#FFC93C`, `--info` `#8980F8`.

**Typography** — `--font-display` Syne (headings), `--font-sans` DM Sans (body, weight 300), `--font-mono` DM Mono (labels/meta). Type scale via `clamp()` on `.section-heading`; base 16px, line-height 1.7.

**Spacing & layout** — `--max-w` 1100px, `--section-gap` 9rem, section padding `9rem 2rem`, CSS grid for columns.

**Radius** — 4px (cards, images, media), 99px (pills/chips), 50% (round icon buttons), 3px (timeline node).

**Elevation & surface** — lightbox shadow `0 24px 70px rgba(0,0,0,.5)`, nav hairline + `backdrop-filter: blur()`, card fills.

**Motion** — `--transition` 0.25s ease; scroll-reveal (0.7s cubic-bezier), WAAPI auto-pan (24s linear, `playbackRate 0.5` on hover), ASCII glitch timing. Respects `prefers-reduced-motion`.

**Breakpoints** — 640 (mobile), 768, 1024 (tablet), 1025+ (desktop; also the `data-hires` threshold).

**Base/reset** — `box-sizing: border-box`, `img` defaults, smooth scroll, link/list resets.

---

## Atoms

Smallest functional elements; built directly from foundations, rarely useful alone.

- **Buttons** — `.btn-primary`, `.btn-ghost`, `.back-top`, `.lb-close`, `.lb-tools button` (− / Fit / +)
- **Chips / pills** — `.skill-chip`, `.ptl-phase span`, `.ptl-year span`
- **Labels & text** — `.section-label`, `.section-heading`, `.pfig-cap`, `.meta-label`, `.meta-value`, `.project-type`, `.project-year`, `.project-title`, `.pn-label`, `.pn-title`, `.pn-type`, `.lb-name`, `.lb-count`, `.lb-dir`, `.stat-num`, `.stat-label`, `.step-title`, `.step-desc`, `.step-number`
- **Icons & marks** — `.nav-logo-img` (logo), `.nav-avail-dot` / `.dot` (status dot), `.step-icon`, `.toggle-icon`, `.play-icon`, `.arrow`, `.ptl-node i` (diamond node), `.bc-sep`, `.divider`, `.scroll-line`
- **Media primitives** — a single `<img>` tile, a single `<video>` loop (`.vectors-col video`), the ASCII portrait layers (`.ascii-img`, `.ascii-glitch-layer`)
- **Date stamp** — `.ptl-when`

> No form-input atoms exist yet (the site has no forms) — if a contact form is ever added, `input` / `textarea` / `checkbox` atoms would live here.

---

## Molecules

Small groups of atoms bonded to do one job.

- **`.nav-availability`** — status dot + "available for work"
- **`.hero-cta`** — primary + ghost buttons
- **`.hero-scroll`** — scroll line + label
- **`.stat`** (in `.about-stat-block`) — number + label
- **`.skills-row`** — group of skill chips
- **`.workflow-step`** — icon/number + title + description
- **`.project-meta`** — type + year
- **`.meta-block`** — label + value (repeated in the case-study meta aside)
- **`.breadcrumb`** — links + separators + current page
- **`.qa-trigger`** — question + toggle icon
- **`.qa-video-wrap`** — video + play button
- **`.ptl-evt`** — one timeline event: node + date + title + description
- **Preview figures** — `.logo-studies figure`, `.web-studies figure`, `.product-shots figure`, `.vectors-collection` (media + `figcaption`)
- **`.lb-bar`** — the lightbox pager: prev + `name · n/N` + next
- **`.lb-tools`** — zoom control cluster (− / Fit / +)
- **`.social-row`** — set of social links

---

## Organisms

Larger, self-contained sections composed of molecules + atoms.

- **`.nav` + `.mobile-menu`** — logo/availability + nav links + toggle (injected from `partials/nav.html`)
- **`.hero`** — tag + animated headline + sub + CTA + scroll cue
- **`.about-grid`** — about text + skills row + ASCII portrait + stat block
- **`.workflow-steps`** — header/intro + list of `.workflow-step`
- **`.projects-grid`** — grid of `.project-card`
- **`.contact`** — heading + sub + email + social row
- **`.footer`** — divider + copyright + back-to-top (from `partials/footer.html`)
- **`.breadcrumb-bar`** — case-study breadcrumb
- **`.project-hero`** — meta + title + brief
- **`.project-cover`** — hero cover (now a zoom-lightbox trigger)
- **`.project-details-grid`** — overview + meta aside
- **`.ptl`** — the center-axis process timeline (phases + years + events)
- **Gallery sections** — `.logo-studies`, `.web-studies` (incl. `.cols-3` progression), `.product-shots` (+`.pan-shots`), `.vectors-layout` (loops + sticky Figma board)
- **`.qa`** — accordion of `.qa-item`
- **`.project-nav`** — prev/next project pager
- **`#lightbox`** — global overlay: close + tools + stage(image) + pager bar; three modes (`contain` / `lb-scroll` / `lb-zoom`)

> **Fence-sitters:** `.project-card` is a molecule that behaves like a small organism (cover + meta + title + desc + link). `#lightbox` is arguably a full "utility organism"/overlay pattern rather than a page section. Don't over-agonize — the label matters less than the composition.

---

## Templates (page skeletons, no real content)

- **Home template** — nav → hero → about → workflow → projects → contact → footer
- **Case-study template** — nav → breadcrumb → project-hero → cover → content (overview + meta aside, prose body, process timeline, galleries, before/after, animated vectors) → project-nav → footer

Shared organisms (`nav`, `footer`) are injected via `partials/` in `script.js`, which is your templating mechanism.

---

## Pages (templates + real content)

- **`index.html`** — home
- **`w-labs-brand-website-revamp.html`**, **`snaplive-2.html`**, **`tmc.html`**, **`wiz-assistant.html`**, **`smart-surveillance-system.html`**, **`lc-oct-skin-measurement-analysis.html`** — six case studies on the case-study template

---

## Interaction patterns (behaviors, cross-cutting)

Not atomic components, but reusable behaviors in `script.js` worth cataloguing alongside the system:

- **Partials loader** — fetches/injects nav + footer
- **Scroll-reveal** — IntersectionObserver fade/slide-in
- **Timeline reveal** — events slide out from the center spine
- **Lightbox** — gallery grouping by parent grid, pager, keyboard nav, three modes, zoom/pan (`data-hires` for 2× on desktop)
- **Auto-pan previews** — WAAPI object-position pan, hover slow-down (`.logo-studies`, `.pan-shots`)
- **Q&A accordion** — open/close + lazy video load + autoplay
- **Headline cycling** & **ASCII glitch** — hero micro-interactions
- **Media-download deterrence** — contextmenu/drag blocking, `controlsList`

---

## How to use this map

1. **Change once, cascade everywhere** — adjust a token in `:root` (e.g. `--accent`) and every atom/molecule/organism inherits it.
2. **Compose upward** — build new sections from existing molecules/organisms before writing new CSS.
3. **Name consistently** — the class prefixes (`.project-`, `.qa-`, `.ptl-`, `.lb-`, `.nav-`) already act as component namespaces; keep new components in that pattern.
4. **Gaps to formalize later** — no form atoms yet; semantic colors (`--success/--danger/--warning`) are defined but lightly used; component states (hover/focus/disabled/active) are consistent but not documented per-component.
