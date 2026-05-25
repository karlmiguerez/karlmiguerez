# Minimalist Web Portfolio

> **Status:** 🟢 Live  
> **URL:** https://karlmiguerez.vercel.app  
> **Last Updated:** May 2026 — Session 4

---

## Stack

- HTML5 / CSS3 / Vanilla JS — no frameworks, no build step
- Hosted on **Vercel** (free plan)
- Source on **GitHub** → `github.com/karlmiguerez`

---

## File Structure

```
portfolio/
├── index.html              — main page
├── project-1.html          — W Labs Brand & Website Revamp (Brand Identity / UI/UX)
├── project-2.html          — SnapLive 2.0 (UI/UX / Web to Mobile)
├── project-3.html          — TMC (UI/UX / Web to Mobile)
├── project-4.html          — AltInvest (UI/UX / Mobile App)
├── project-5.html          — Cirrus White Label Sales & CRM (UI/UX / Web to Mobile)
├── project-6.html          — WIZ Assistant (Brand Identity / Motion Graphics)
├── style.css               — all styles (shared across all pages)
├── script.js               — scroll reveal, nav, mobile menu, animations
├── README.md               — setup & customization guide
└── assets/
    └── images/
        ├── logo.png        — ]k indigo nav logo
        ├── favicon.svg     — svg favicon
        └── ascii-art.png   — ASCII portrait (glitch animated)
```

---

## Design Decisions

- **Palette** — Cool gray `#EFEFED` bg, `#141414` text, `#1B4FFF` accent
- **Typography** — Syne (display/headings) + DM Sans (body) + DM Mono (labels, tags)
- **No italics** — intentional; keeps the feel neutral and structured
- **Logo** — `]k` indigo mark replaces text monogram in nav

---

## Sections

1. **Hero** — animated cycling headline (3 copies, slide-up, every 3s), subtitle, CTA buttons, available-for-work tag
2. **About** — real bio copy, 8 skill chips, ASCII portrait with scanline + glitch animation, stat block (8+ yrs / 6+ projects)
3. **Workflow** — 6 structured methodology steps (Understand, Define, Design, Build, Ship, Iterate) with scroll reveals and hover effects
4. **Work** — 6 project cards linking to individual inner pages
5. **Contact** — `karlmiguerez@gmail.com` + LinkedIn (`/in/karlomiguelperez`) + GitHub (`/karlmiguerez`)
6. **Footer** — © Karlmiguerez

### Project Inner Pages (shared layout)
- **Breadcrumb** — `Home → Work → Project Name`
- **Project Hero** — large title, type · year, brief summary
- **Cover Image** — full-width 16/7 image block
- **Overview + Meta** — copy on left, Role/Tools/Year/Type aside on right
- **Image Blocks** — tall full-width + 2-col pair + final single
- **Process + Outcome** — copy sections
- **Prev / Next Nav** — loops through all 6 projects (Project 1 prev → Project 6, Project 6 next → Project 1)

---

## Session Log

### Session 1 — May 2025
- Scaffolded full portfolio from scratch (HTML/CSS/JS)
- Set cool gray theme, replaced warm palette
- Removed all serif/italic styling, switched to Syne geometric font
- Replaced all `yourname` / `YN` placeholders with `karlmiguerez` / `KM`
- Corrected branding to `Karlmiguerez` (one word, capitalized or lowercase only)
- Swapped `KM.` text logo with `logo.png` (`]k` indigo mark)
- Added `favicon.svg` linked in `<head>`
- Deployed to Vercel — live at https://karlmiguerez.vercel.app

### Session 2 — May 2025
- Added slide-up cycling headline animation (3 copies, every 3s) via `span.headline-animate`
- Added ASCII portrait (`ascii-art.png`) replacing photo placeholder
- Implemented scanline sweep + flicker (CSS) + glitch slice distortion (JS) on portrait
- Filled in real bio copy — Senior UI/UX Design Developer, 13+ years experience
- Updated skill chips: UI/UX, Process & Flow Streamlining, Brand Identity, Platform Design, Figma, HTML/CSS, Vector Animation, Video Generation & Editing
- Updated stat block: 13+ years / 6 projects
- Reorganized assets into `assets/images/` folder
- Fixed recurring issue of favicon and headline animation being lost on index.html overwrites

### Session 3 — May 2025
- Created 3 inner project pages: `project-1.html`, `project-2.html`, `project-3.html`
- Each page includes: breadcrumb (`Home → Work → Project Name`), project hero, full-width cover image, overview + meta aside (Role, Tools, Year, Type), image blocks, Process + Outcome copy sections
- Added Prev / Next navigation at the bottom of each page — disabled and faded on first/last project
- Updated project cards on `index.html` to link to their respective inner pages
- Nav on inner pages is always in `scrolled` state (no transparent flicker)

### Session 4 — May 2026
- Overhauled home page (`index.html`) about section with real bio copy, updated stats (8+ years of experience, 6+ projects), and customized skill chips (adding "AI-Assisted Development" and expanding others).
- Integrated 3 additional projects (making 6 total): "AltInvest", "Cirrus White Label Sales & CRM", and "WIZ Assistant".
- Created and customized 3 new inner project pages: `project-4.html`, `project-5.html`, and `project-6.html` with appropriate metadata, headings, and breadcrumbs.
- Linked all 6 project cards on `index.html` to their respective inner pages.
- Restructured the Prev/Next navigation loop on all 6 project pages to cycle properly from Project 1 through Project 6 (with Project 1 prev pointing to Project 6, and Project 6 next pointing to Project 1).
- Refined layout and margins in `style.css` by commenting out the `max-width: 760px` restriction on `.project-hero-inner` to allow proper breathing room for wide project headings.
- Added custom CSS status variables (`--success`, `--danger`, `--warning`, `--info`) to `:root` block for future expansion.
- Added a new **Workflow** section detailing a 6-step structured methodology (Understand, Define, Design, Build, Ship, Iterate) with slide-in scroll reveal and interactive hover transitions.
- Updated main navigation and mobile menu to include a link to the new "Workflow" section.
- Added a new "Presentation & Flow Designs" skill chip, bringing the total to 8 skill chips.
- Shifted section ordering and labels: Work is now section 03 and Contact is section 04.
- Incorporated `.workflow-step` elements into the scroll reveal animation list in `script.js`.
- Integrated custom SVG icons (`workflow-1.svg` to `workflow-6.svg`) for each step of the Workflow section with active hover states and opacity transitions.
- Redesigned the Workflow step columns from two-column (`120px 1fr`) to (`100px 1fr`) and wrapped the step number + icon into a new `.step-left` flex container.
- Added mobile responsiveness for Workflow steps: implemented a 1-column stack layout on mobile devices (`max-width: 480px`) where the step number and icon flex horizontally.
- Added Project 1 cover images: updated `assets/images/project-1-cover.jpg` as the home page card thumbnail preview and `assets/images/project-1-inner-page-cover.jpg` on `project-1.html`.
- Commented out `mix-blend-mode: multiply` on the ASCII art thumbnail for better layout compatibility.

---

## Still To Do

- [x] Replace photo placeholder with ASCII portrait + glitch animation
- [x] Update bio copy in About section
- [x] Confirm social handles (LinkedIn: `/in/karlomiguelperez`, GitHub: `/karlmiguerez`)
- [x] Add all 6 inner project pages with breadcrumbs and prev/next loop nav
- [x] Fill in real project metadata, titles, and descriptions on home page and inner page heroes
- [ ] Fill in real body content (overview, process, outcome) and images/mockups for all 6 inner pages
- [/] Add cover images to project cards on `index.html` (Project 1 cover added; Projects 2-6 pending cover uploads)
- [ ] Audit `style.css` and `script.js` for any remaining flat asset paths (pre-`assets/images/` refactor)
- [ ] Explore dark mode toggle
- [ ] Add "Live Site" or "View on Figma" CTA inside project meta aside where applicable

---

## Running Locally

**Option 1 — Python server (no install needed)**
```bash
cd path/to/portfolio
python3 -m http.server 3000
```
Then open `http://localhost:3000` in your browser.  
Stop the server with `Ctrl + C`.

**Option 2 — Live Server (auto-refresh on save)**
1. Open the `portfolio/` folder in VS Code or Antigravity
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://127.0.0.1:5500` — refreshes on every save

---

## Pushing to GitHub via Terminal

**First time setup (only once)**
```bash
cd path/to/portfolio
git init
git remote add origin https://github.com/karlmiguerez/portfolio.git
git add .
git commit -m "initial commit"
git push -u origin main
```

**Every update after that**
```bash
git add .
git commit -m "describe what you changed"
git push
```

> Vercel auto-redeploys on every push to `main` — no extra steps needed.

---

## Notes

- `Karlmiguerez` is one word — capitalized (`Karlmiguerez`) or lowercase (`karlmiguerez`) only. Never two words.
- **Source of Truth**: The repository version of `docs/progress.md` is the primary source of truth. The Obsidian file at `/Users/karlomiguelperez/Documents/Zettelkasten/00 North Star (Personal)/Brand & Identity/Karlmiguerez/progress.md` should always follow this file (while retaining its frontmatter).
- Assets live in `assets/images/` — always reference as `assets/images/filename.ext` in HTML/CSS
- **Avoid overwriting index.html with older versions** — always use the latest output file as source of truth
- Local testing: run `python3 -m http.server 3000` in the portfolio folder or use Live Server in VS Code / Antigravity
- Vercel auto-redeploys on every push to `main`
- To change accent color: edit `--accent` in the `:root` block at the top of `style.css`
- To change headline copies: edit the `headlineCopies` array at the top of `script.js`
- To adjust glitch frequency: edit `MIN_INTERVAL` / `MAX_INTERVAL` in `script.js`
