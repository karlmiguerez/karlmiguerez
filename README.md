# Personal Portfolio

A clean, minimal designer portfolio built with plain HTML, CSS, and JavaScript.

## Stack

- HTML5
- CSS3 (Custom Properties, Grid, Flexbox)
- Vanilla JS (no frameworks)
- Hosted on [Vercel](https://vercel.com)

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Open locally — no build step needed
open index.html
# or use Live Server in VS Code
```

## Customizing

All edits live in just 3 files:

| File | What to edit |
|------|-------------|
| `index.html` | Your name, bio, project titles, links, email |
| `style.css` | Colors (CSS variables at top), fonts, spacing |
| `script.js` | Behavior — usually no changes needed |

### 1. Update your info

Open `index.html` and find the `<!-- Replace -->` comments — they mark every spot you need to update:

- **Hero**: headline and subtitle
- **About**: bio paragraphs, skill chips
- **Photo**: replace `<div class="photo-placeholder">` with `<img src="your-photo.jpg" />`
- **Projects**: titles, types, years, descriptions, links
- **Contact**: email address, social links
- **Footer**: your name

### 2. Add project images

Drop your images into the root folder and replace:
```html
<div class="img-placeholder"></div>
```
with:
```html
<img src="project1.jpg" alt="Project Name" />
```

### 3. Change accent color

In `style.css`, line 10:
```css
--accent: #B5936A; /* ← change this */
```

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Leave all settings as default — click **Deploy**

No build config needed. Vercel detects static HTML automatically.

## Project Structure

```
portfolio/
├── index.html      # All markup
├── style.css       # All styles
├── script.js       # Scroll reveal, nav, mobile menu
└── README.md       # This file
```

---

Built with care · No frameworks · No dependencies
# karlmiguerez
