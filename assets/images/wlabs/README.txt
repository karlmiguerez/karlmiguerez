W Labs case study images — export targets (from Figma)
Export at 2x for crisp retina display. Filenames match the <img> tags
already written (commented) beside each slot in project-1.html.

── Website Theme Revamp file (figma.com/design/8KhCz7Hh3VfkQWi5ftCRAS) ──
  home-lofi.jpg      node 1:450      ([Revamp] W Labs - Home, "lo-fi" page)
  home-midfi.jpg     node 96:34296   ([Revamp] W Labs - Home, "mid/hi-fi EN (old content)" page)
  home-hifi.jpg      node 383:288303 (W Labs - Home [desktop] EN — used for hi-fi AND the "after")
  lcoct.jpg          node 1209:95735 (Products: Optical Skin Measurement – All 4 Products)
  wiz-assistant.jpg  node 1712:94529 (Products: WIZ Assistant [desktop])
  optical-micro.jpg  node 383:323322 (Project: Optical Microscope [desktop])
  logo-new.svg       node 96:33652   (logo - W Labs (full))

── wsoft-website file (figma.com/design/TsO6Wr4xSrcb5fs5LIkGcU) — 2025 baseline ──
  home-2025.jpg      node 729:1567   ("Wsoft Homepage", on "High Fidelity Design (Desktop)" page) [CONFIRMED]
  logo-old.svg       on the "Old Website Designs" page (node group 102:2 → Version 1/2/3 sections).
                     Pick the original SPHERICAL mark from the oldest version there.
                     (The wave-"W" lockup exists too at node 2756:7267, but that's the newer mark.)

── How to swap ──
For each image slot in project-1.html: delete the <div class="project-img-placeholder">…</div>
and uncomment the <img> line directly beneath it.

── Website design boards (section "The studies, side by side", after Process) ──
Save your two Figma canvas screenshots here, then uncomment the <img> beside each slot:
  wlabs-site-former.jpg   full board of the FORMER site (wsoft-website Figma file)
  wlabs-site-revamp.jpg   full board of the REVAMPED site (W Labs Website Revamp Figma file)
These get click-to-lightbox + a subtle hover zoom (no auto-pan).

── Product pages (section "Product pages") — RESPONSIVE, now wired ──
Two products, each with desktop/tablet/mobile variants served via <picture> (mobile ≤640, tablet ≤1024, else desktop);
the lightbox opens whichever variant the viewport loaded (currentSrc), in scroll mode.
  wlabs-product-skinarch-{desktop,tablet,mobile}.jpg   SkinArch LC-OCT product page
  wlabs-product-wiz-{desktop,tablet,mobile}.jpg        WIZ Assistant product page
(The old single-file slots lcoct.jpg / wiz-assistant.jpg / optical-micro.jpg are no longer used.)
