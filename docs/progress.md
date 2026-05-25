# Minimalist Web Portfolio

> **Status:** 🟢 Live  
> **URL:** https://karlmiguerez.vercel.app  
> **Last Updated:** May 2025 — Session 3

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
├── project-1.html          — Brand Identity inner page
├── project-2.html          — UI/UX Design inner page
├── project-3.html          — Web Design inner page
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
2. **About** — real bio copy, 8 skill chips, ASCII portrait with scanline + glitch animation, stat block (13+ yrs / 6 projects)
3. **Work** — 3 project cards linking to individual inner pages
4. **Contact** — `karlmiguerez@gmail.com` + LinkedIn (`/in/karlomiguelperez`) + GitHub (`/karlmiguerez`)
5. **Footer** — © Karlmiguerez

### Project Inner Pages (shared layout)
- **Breadcrumb** — `Home → Work → Project Name`
- **Project Hero** — large title, type · year, brief summary
- **Cover Image** — full-width 16/7 image block
- **Overview + Meta** — copy on left, Role/Tools/Year/Type aside on right
- **Image Blocks** — tall full-width + 2-col pair + final single
- **Process + Outcome** — copy sections
- **Prev / Next Nav** — links between projects, disabled on first/last

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

---

## Still To Do

- [x] Replace photo placeholder with ASCII portrait + glitch animation
- [x] Update bio copy in About section
- [x] Confirm social handles (LinkedIn: `/in/karlomiguelperez`, GitHub: `/karlmiguerez`)
- [x] Add inner project pages with breadcrumbs and prev/next nav
- [ ] Fill in real project content (title, brief, overview, role/tools, images) for all 3 pages
- [ ] Add cover images to project cards on `index.html` (`assets/images/project-1-cover.jpg` etc.)
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
- Assets live in `assets/images/` — always reference as `assets/images/filename.ext` in HTML/CSS
- **Avoid overwriting index.html with older versions** — always use the latest output file as source of truth
- Local testing: run `python3 -m http.server 3000` in the portfolio folder or use Live Server in VS Code / Antigravity
- Vercel auto-redeploys on every push to `main`
- To change accent color: edit `--accent` in the `:root` block at the top of `style.css`
- To change headline copies: edit the `headlineCopies` array at the top of `script.js`
- To adjust glitch frequency: edit `MIN_INTERVAL` / `MAX_INTERVAL` in `script.js`
