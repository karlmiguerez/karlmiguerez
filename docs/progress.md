# Minimalist Web Portfolio

> **Status:** 🟢 Live  
> **URL:** https://karlmiguerez.vercel.app  
> **Last Updated:** July 2026 — Session 7 (iOS-Safari MP4 fallback for animated vectors)

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
├── w-labs-brand-website-revamp.html        — W Labs Brand & Website Revamp
├── snaplive-2.html                         — SnapLive 2.0 (Live-Simulcasting Platform)
├── tmc.html                                — TMC Print & Publishing E-commerce
├── wiz-assistant.html                      — WIZ Assistant (Product & Motion)
├── smart-surveillance-system.html          — Smart Surveillance System (AI Security)
├── lc-oct-skin-measurement-analysis.html   — LC-OCT SkinArch (Product & Motion)
│   (renamed from project-1..6.html to title-based slugs — Session 6)
├── style.css               — all styles (shared across all pages)
├── script.js               — scroll reveal, nav, mobile menu, animations
├── README.md               — setup & customization guide
└── assets/
    ├── images/
    │   ├── logo.png / favicon.svg / ascii-art.png
    │   ├── qa-1..10-poster.jpg           — Q&A poster frames
    │   ├── <slug>-cover.jpg              — home card covers (6, optimized)
    │   ├── <slug>-inner-page-cover.jpg   — project hero covers (6, optimized)
    │   └── wlabs/ snaplive/ tmc/ wiz/ sss/ lc-oct/  — per-project case-study images
    │        (each has a README.txt with the Figma node → filename export map)
    └── videos/
        ├── qa-1..10.mp4               — Q&A clips (compressed, faststart)
        ├── wiz-assistant-promo.mp4    — WIZ promo (Figma Weavy + CapCut)
        ├── lc-oct-commercial.mp4      — SkinArch commercial (Remotion, v2)
        └── lc-oct-dej-viewer.mp4      — DEJ Viewer demo (screen recording)
```

---

## Design Decisions

- **Palette** — Cool gray `#EFEFED` bg, `#141414` text, `#6155F5` indigo accent (Session 6; was `#1B4FFF`. `--info` now `#8980F8`)
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
- Implemented desktop-specific hover transitions (`min-width: 769px`) for project cards: thumbnails display in grayscale (`filter: grayscale(100%)`) and fade into full color upon card hover.

### Session 5 — June 2026

#### Q&A Section — Video Lazy Loading
- Replaced all `<source src="...">` attributes with `data-src` on Q&A video elements to prevent browsers from eagerly fetching all 10 video files on page load.
- Added `preload="none"` on all `.qa-video` elements (was `preload="metadata"`) to eliminate network requests until a Q&A item is actually opened.
- Assigned unique `data-poster` attributes per video (e.g., `assets/images/qa-1-poster.jpg` through `qa-10-poster.jpg`) for per-question poster frames instead of reusing a single shared image.
- Implemented `lazyLoadQaVideo(item)` in `script.js` — called only when a Q&A accordion opens; it hydrates `source.src` and `video.poster` from their `data-*` counterparts, then calls `video.load()` to initiate the fetch.
- Added `video.dataset.loaded` guard so the hydration only runs once per video, preventing repeated reloads on accordion toggle.

#### Q&A Section — Auto-play & Video Pause on Close
- Extended the accordion close loop to detect any currently-playing video (`!v.paused`) and call `v.pause(); v.currentTime = 0` — resetting playback so reopening any item replays from the start.
- Added auto-play on accordion open: after `lazyLoadQaVideo` hydrates the source, `video.play()` is called with a `.catch()` no-op to silently handle autoplay-blocked environments.

#### Q&A Section — HTML Structure Refactor
- Flattened the Q&A HTML: each `.qa-item` is now a direct sibling `<div>` instead of being nested inside a shared parent wrapper. This fixes a structural issue where accordion body collapse was constrained by the shared container.
- Added a blank line between `</video>` and the `<button class="qa-video-play">` overlay for readability.
- Q&A items 2–10 now each have their own dedicated `qa-N.mp4` video source and `qa-N-poster.jpg` poster, replacing the placeholder `qa-1.mp4` copies used in earlier iterations.

#### style.css — Q&A Layout Fix
- Changed `.qa-body` padding from `padding-left: calc(50% + 2rem)` to `padding: 0 2rem` — corrects an alignment bug where answer content was being pushed entirely off-screen to the right on smaller viewports.

#### index.html — Image Performance
- Added `loading="lazy"` and `decoding="async"` to the main ASCII portrait `<img>` tag in the About section to defer its load and decode off the main thread, improving LCP.

### Session 6 — July 2026

#### Case studies — all 6 inner pages rebuilt
- Researched each project from **Figma (Dev Mode MCP), Jira, and Slack**, then rebuilt all six inner pages as full case studies on a consistent structure: hero + meta, Overview, Research/Foundations, **Process (center-axis vertical timeline)**, progression, key screens, Before/After, Outcome.
- Projects (replacing the old AltInvest/Cirrus placeholders): W Labs Brand & Website Revamp, SnapLive 2.0, TMC, WIZ Assistant, Smart Surveillance System, LC-OCT SkinArch.

#### Slugs & asset naming
- Renamed all project pages `project-N.html` → title-based slugs via `git mv` (history preserved); updated home-page cards and the prev/next loop.
- Renamed the 12 cover images to match slugs; created per-project image folders (`wlabs/ snaplive/ tmc/ wiz/ sss/ lc-oct/`), each with a `README.txt` export map (Figma node → filename) for pending exports.

#### Indigo rebrand
- `--accent` `#1B4FFF` → `#6155F5` (brand indigo) and `--info` → `#8980F8`; all accents cascade via the CSS variable.

#### Center-axis timeline (new `.ptl` component)
- Added the vertical timeline to `style.css` — central spine, phase/year pills, events alternating left/right with diamond markers + dashed connectors; collapses to a single left rail ≤768px.
- Added a scroll-reveal `IntersectionObserver` in `script.js` (`.ptl-evt` → `.ptl-in`) so events fade/slide out from the spine.

#### Media
- WIZ Assistant: embedded promo video (Figma Weavy + CapCut).
- LC-OCT SkinArch: embedded Remotion commercial (v2, 40s) + 6 scene stills + 2 Remotion Studio screenshots + 4 analysis-gallery images + a DEJ Viewer screen-recording demo (viewer.wsoft.space).
- TMC: added a "front-end prototype" section (React 19 + Vite + Tailwind + Express, built with Claude Code) — prototype recording slot pending.

#### Asset optimization
- Compressed WIZ promo 49M→6M; re-encoded LC-OCT commercial to the v2 cut (~6M).
- Compressed the 10 Q&A clips 298M→17M (720p, faststart).
- Optimized the 12 cover images ~18M→3M (≤1600px).
- Generated the 10 missing `qa-N-poster.jpg` frames (fixed broken homepage poster refs).
- Scoped `.project-img-grid img` rules to fix a base `img{height:100%}` row-overlap bug.

#### Media download deterrence
- `style.css` + `script.js`: block right-click/drag on media, `controlsList="nodownload"` + disable PiP on video, `user-select`/`-webkit-touch-callout` off. (Friction, not true prevention — the Network tab still exposes files.)

#### Role & copy refinements
- **TMC** → "UI/UX Designer & Front-End Prototyper" (tools: Figma, Claude Code, React/Vite/Tailwind); reworked "Core flows" into "Five product lines" + a tabbed "Order management" module (Request Quote → Cart → Orders → History) and added the working front-end prototype section.
- **WIZ Assistant** & **LC-OCT SkinArch** → "Product & Motion Designer".
- **SnapLive 2.0** reframed as a "Live-Simulcasting Platform" (simulcast-to-many differentiator).

#### W Labs case-study visuals & reusable UI (cont.)
- Wired the real W Labs logos into the Identity before/after (`wlabs/logo-old.svg` / `logo-new.svg`, equal-height 180px cards).
- Added a **Logo studies** section — Neural "W", AI Core, Wave Intelligence 3.1 and the adopted 3.2 — from the concept PDFs rendered to JPGs, shown as cropped auto-panning previews.
- Added **"The studies, side by side"** (former vs revamped site boards) and renamed "Homepage progression" → **"Figma Screens Map Progression"** (low-fi → mid-fi → corrections). All board images optimized to ≤256 KB (≤2000px).

**Reusable components (style.css + script.js):**
- **Lightbox** — `.lgbox` on a `<figure>`/element makes its `<img>` click-to-expand into `#lightbox`; close via Esc, backdrop, or ✕. Two modes: *default* contains the image within **90vw × 90vh** (centered, for wide boards); **`.lb-scroll`** (auto-applied when the image is inside `.logo-studies`/`.product-shots`) fills `min(92vw, 1000px)` wide with **no height cap + vertical scroll** for very tall boards.
  - **Gallery pager (Session 7):** the lightbox now groups images by their **`figure.lgbox` parent grid** — so opening any image in a multi-image section (logo studies ×4, web-studies ×2/×3, product shots ×2, before/after ×2) yields a bottom pager echoing the footer project pager: `← Prev [name]` · centered **`name` + `n / N`** · `[name] Next →`. Navigate via the buttons or **← / → arrow keys**; Esc/backdrop still close. Endpoints hide the unavailable side (no wrap); single-image sections (e.g. the vectors collection) show just the name, no arrows. Names come from each figure's `<figcaption>` (the `<strong>` lead if present, e.g. logo-study concept names). On ≤640 the adjacent names collapse to bare arrows. All in the shared `script.js` lightbox IIFE + `#lightbox .lb-bar` CSS, so every project page inherits it.
  - **Three lightbox modes** (set per image in `render()`): **contain** (default — fit within 90vw×90vh, wide boards like the vectors collection), **`lb-scroll`** (tall logo-study boards — fill `min(92vw,1000px)`, vertical scroll), and **`lb-zoom`** (project snapshots — free zoom + pan). The DOM is now `#lightbox > .lb-close + .lb-tools + .lb-stage(>img) + .lb-bar`; `.lb-stage` is the `overflow:auto` scroll container.
  - **Project snapshots — classified + zoomable (Session 7):** the **wide boards** get a **`snapshot`** class → zoom+pan (web-studies ×2: side-by-side + progression maps, plus all six project-page **covers** `.project-cover.lgbox.snapshot`). The **tall product/before-after shots** (`.product-shots`) deliberately do **not** get `snapshot` — they stay in **`lb-scroll`** (vertical scroll only), because on a tall image scroll and wheel-zoom share the same gesture and conflict; scrolling is the intended action there. Logo studies are also not snapshots (scroll mode). Opening a snapshot enters **`lb-zoom`**: a top toolbar (`− / Fit / +`), **scroll-wheel zoom toward the cursor**, **double-click** to toggle fit↔~2×, **drag-to-pan (mouse)** with touch keeping native momentum scroll, and `+`/`-` keys. Default view is **fit-to-width**; zoom-out floor is **contain** (`zmin = min(1, containW/fitW)` from the image's real aspect — the point where the whole image just fits the viewport, so there's no pointless empty-margin zoom-out), and zoom-in goes up to `max(native, 3×fit)`. Layout uses flex **`safe center`** + `flex:none` so a zoomed image never clips its top/left out of scroll reach. Zoom source falls back through **`data-hires` → `currentSrc` → `src`**, so 2× images can be dropped in later per-image via a `data-hires` attribute with no code change. Current sources are already high-res (site boards 2000px wide; product/home captures 1600px wide × up to ~10,190px tall), so zoom-to-native is crisp — 2× is optional (only for pin-sharp beyond-native magnification).
- **Logo-study auto-pan** — Web Animations API; previews pan top→bottom on a 24s linear loop, staggered; **hover → `playbackRate 0.5`** (seamless half-speed, no jump). Respects `prefers-reduced-motion`.
- **Board previews** (`.web-studies`) — rounded, borderless, hover `scale(1.04)` zoom (clipped by `overflow:hidden`), click → lightbox; no auto-animation.
- Fixed a base `img { height:100% }` bug by scoping `.project-img-grid > div img` to natural aspect ratio.
- **Responsive screenshots** (`.product-shots` + Before/After) — each preview is a `<picture>` serving **mobile ≤640 / tablet ≤1024 / desktop** variants; the lightbox opens `img.currentSrc` (the variant the viewport actually loaded) in `.lb-scroll` mode. Naming: `wlabs-product-<name>-{desktop,tablet,mobile}.jpg`, `wlabs-home-{former,desktop,tablet,mobile}.jpg`.
- **Animated vectors** (`.vectors-layout`) — the revamp's home/about vector animations, exported as **WebM (VP9)** instead of GIF (smaller + higher fidelity), embedded as `autoplay muted loop playsinline` tiles stacked in a left column with the **Figma collection sticky on the right** (click → lightbox). Files: `assets/videos/wlabs-vec-*.{webm,mp4}`.
  - **iOS-Safari fix (Session 7):** the source WebMs carry `alpha_mode=1` (transparency). iOS Safari doesn't play VP9-alpha WebM in `<video>`, so it showed a dark placeholder that clashed with the gradients. Each `<video>` now uses two `<source>`s — WebM first (Chrome/Firefox/Edge keep the small transparent file on the white element bg), then an **MP4 (H.264) fallback with a white background baked in** for iOS Safari. The MP4s were made by compositing the alpha over white (`overlay` on a `color=white` layer via `scale2ref`, then `format=yuv420p`) — a plain transcode would have flattened onto *black*. Regen recipe: `ffmpeg -c:v libvpx-vp9 -i IN.webm -filter_complex "[0:v]format=yuva420p[fg];color=c=white[bgc];[bgc][fg]scale2ref=w=iw:h=ih[bg][fg2];[bg][fg2]overlay=shortest=1,format=yuv420p[o]" -map "[o]" -an -c:v libx264 -crf 24 -preset veryfast -movflags +faststart OUT.mp4`.

---

## Still To Do

- [x] Replace photo placeholder with ASCII portrait + glitch animation
- [x] Update bio copy in About section
- [x] Confirm social handles (LinkedIn: `/in/karlomiguelperez`, GitHub: `/karlmiguerez`)
- [x] Add all 6 inner project pages with breadcrumbs and prev/next loop nav
- [x] Fill in real project metadata, titles, and descriptions on home page and inner page heroes
- [x] Fill in real body content (overview, process, outcome) for all 6 inner pages — done Session 6 (case-study copy from Figma/Jira/Slack)
- [/] Images/mockups for inner pages — real media embedded (videos, galleries, Studio/DEJ captures); remaining Figma exports pending (see per-project `README.txt` export maps)
- [x] Add cover images to project cards + inner pages — all 6, added & optimized (Session 6)
- [x] Upload and finalize Q&A video clips + poster frames — compressed; the 10 posters generated (Session 6)
- [ ] Export remaining Figma images into `assets/images/<project>/` folders and uncomment the corresponding `<img>` slots
- [ ] Record the TMC front-end prototype walkthrough → `assets/videos/tmc-prototype.mp4` (slot ready in `tmc.html`)
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
