LC-OCT SkinArch case study images.

ALREADY IN PLACE (real assets, no export needed):
  assets/videos/lc-oct-commercial.mp4        (Remotion-rendered "SkinArch LC-OCT Commercial", 1080p, 1:20, faststart)
  assets/images/lc-oct/lc-oct-commercial-poster.jpg
  assets/images/lc-oct/lc-oct-thumb-1.jpg    (SkinArch YouTube thumbnail 1)
  assets/images/lc-oct/lc-oct-thumb-2.jpg    (SkinArch YouTube thumbnail 2)
  assets/images/lc-oct/lc-oct-pore.jpg       (analysis gallery: pore density)
  assets/images/lc-oct/lc-oct-flake.jpg      (analysis gallery: skin flake)
  assets/images/lc-oct/lc-oct-texture.jpg    (analysis gallery: skin texture)
  assets/images/lc-oct/lc-oct-tone.jpg       (analysis gallery: skin tone & darkness)

TO EXPORT (placeholders in the page):
  lc-oct-single-pager.jpg   Figma "Website Product Promo - LC-OCT" (GVzfIkwhBl0PwJnqTVdBTl), node 43:5550
                            (Optical Skin Measurement — All 4 Products, desktop single-pager)
  lc-oct-viewer.jpg         Screenshot of the LC-OCT DEJ Viewer (viewer.wsoft.space) — or export from the
                            DEJ Viewer redesign project. Show the OCT scan with the red DEJ-line overlay toggle.

How to swap a placeholder: delete the .project-img-placeholder div and uncomment the <img> beneath it.

── Remotion Studio screenshots (2 placeholders in the "Built with Remotion + Claude" section) ──
Capture these on your Mac (the project runs there already), then drop them in and uncomment the <img> tags:
  lc-oct-studio-1.jpg   Remotion Studio with the SkinArchCommercial composition — preview + timeline visible.
  lc-oct-studio-2.jpg   Claude Code (or the scene .jsx) beside the Studio preview — "code as the edit".

How to run Studio locally:
  cd "Documents/W Labs/LC-OCT/product:service introduction video/v2/remotion-project"
  npm start                     # opens Remotion Studio at http://localhost:3000
  # (or: npx remotion studio src/index.jsx)
Then screenshot at ~1280–1600px wide and save as the filenames above.
