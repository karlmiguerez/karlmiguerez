/* ============================================
   PORTFOLIO — script.js
   ============================================ */


// ---------- Load partials ----------
async function loadPartial(id, file) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(`/assets/partials/${file}`);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    el.outerHTML = await res.text();
  } catch (err) {
    console.warn('Partial load error:', err);
  }
}

async function initPartials() {
  await loadPartial('nav-partial', 'nav.html');
  await loadPartial('footer-partial', 'footer.html');

  // Re-init everything that depends on nav/footer DOM being present
  initNav();
  initFooterYear();
}

initPartials();


// ---------- Headline cycling animation ----------
const headlineCopies = [
  'people remember.',
  'that just work.',
  'with intention.',
];

const animEl = document.querySelector('.headline-animate');

if (animEl) {
  const wrapper = document.createElement('span');
  wrapper.className = 'headline-animate-wrapper';
  animEl.parentNode.insertBefore(wrapper, animEl);
  wrapper.appendChild(animEl);
}

let currentIndex = 0;

function cycleHeadline() {
  const nextIndex = (currentIndex + 1) % headlineCopies.length;

  // Slide current out
  animEl.classList.add('slide-out');

  setTimeout(() => {
    animEl.classList.remove('slide-out');
    animEl.textContent = headlineCopies[nextIndex];
    animEl.classList.add('slide-in');

    setTimeout(() => {
      animEl.classList.remove('slide-in');
    }, 450);

    currentIndex = nextIndex;
  }, 450);
}

// setInterval(cycleHeadline, 3000);
if (animEl) setInterval(cycleHeadline, 3000);

// ---------- ASCII portrait glitch trigger ----------
const asciiWrap = document.getElementById('asciiWrap');

if (asciiWrap) {
  const GLITCH_DURATION = 520;       // ms — matches animation length
  const MIN_INTERVAL = 4000;       // ms — min gap between glitches
  const MAX_INTERVAL = 9000;       // ms — max gap between glitches

  function triggerGlitch() {
    asciiWrap.classList.add('is-glitching');
    setTimeout(() => {
      asciiWrap.classList.remove('is-glitching');
    }, GLITCH_DURATION);

    // Schedule next glitch at a random interval
    const next = MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
    setTimeout(triggerGlitch, next + GLITCH_DURATION);
  }

  // First glitch fires after a short delay on load
  setTimeout(triggerGlitch, 2000);
}


// ---------- Year in footer ----------
function initFooterYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const isProjectPage = !document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  let menuOpen = false;

  navToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('open', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    const spans = navToggle.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    });
  });

  // Active nav link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `/#${entry.target.id}`) {
            link.style.color = 'var(--text)';
          }
        });
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(section => sectionObserver.observe(section));
}


// Close mobile menu on link click
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  });
});


// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll(
  '.hero-tag, .hero-headline, .hero-sub, .hero-cta, ' +
  '.about-grid, .workflow-step, .project-card, .contact-inner'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger cards inside grids
      const delay = entry.target.closest('.projects-grid')
        ? Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100
        : 0;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));


// ---------- Timeline reveal (events slide out from the center spine) ----------
const tlEvents = document.querySelectorAll('.ptl-evt');
if (tlEvents.length) {
  const tlObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('ptl-in');
        tlObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -10% 0px' });
  tlEvents.forEach(el => tlObserver.observe(el));
}


// ---------- Q&A Accordion + lazy video load ----------
function lazyLoadQaVideo(item) {
  const video = item.querySelector('.qa-video');
  if (!video || video.dataset.loaded) return;

  const source = video.querySelector('source[data-src]');
  if (source) source.src = source.dataset.src;
  if (video.dataset.poster) video.poster = video.dataset.poster;

  video.load();
  video.dataset.loaded = 'true';
}

document.querySelectorAll('.qa-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item = trigger.closest('.qa-item');
    const isOpen = item.classList.contains('open');

    // Close all — and pause/reset any video currently playing
    document.querySelectorAll('.qa-item').forEach(i => {
      const v = i.querySelector('.qa-video');
      if (v && !v.paused) {
        v.pause();
        v.currentTime = 0; // resets so it replays from the start next time
      }
      i.classList.remove('open');
      i.querySelector('.qa-trigger').setAttribute('aria-expanded', 'false');
      i.querySelector('.qa-body').setAttribute('aria-hidden', 'true');
    });

    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      item.querySelector('.qa-body').setAttribute('aria-hidden', 'false');
      lazyLoadQaVideo(item);

      // Auto-play the newly opened item's video
      const video = item.querySelector('.qa-video');
      if (video) {
        video.play().catch(() => {
          // Autoplay blocked (rare) — play button overlay stays visible as fallback
        });
      }
    }
  });
});


// ---------- Q&A video play/pause ----------
document.querySelectorAll('.qa-video-wrap').forEach(wrap => {
  const video = wrap.querySelector('.qa-video');
  const playBtn = wrap.querySelector('.qa-video-play');

  playBtn.addEventListener('click', () => {
    // Pause any other playing Q&A video first
    document.querySelectorAll('.qa-video').forEach(v => {
      if (v !== video) v.pause();
    });
    video.play();
  });

  video.addEventListener('play', () => wrap.classList.add('is-playing'));
  video.addEventListener('pause', () => wrap.classList.remove('is-playing'));
  video.addEventListener('ended', () => wrap.classList.remove('is-playing'));
});

/* ---------- Media download deterrence (friction, not true prevention) ---------- */
(function () {
  const inMedia = (t) =>
    t && t.closest && t.closest('img, video, .project-cover, .project-img-block, .project-img-grid, .qa-video-wrap, .ascii-wrap');

  // Block right-click context menu over media
  document.addEventListener('contextmenu', (e) => { if (inMedia(e.target)) e.preventDefault(); });
  // Block drag-to-save
  document.addEventListener('dragstart', (e) => { if (e.target.closest && e.target.closest('img, video')) e.preventDefault(); });

  function harden() {
    document.querySelectorAll('video').forEach((v) => {
      v.setAttribute('controlsList', 'nodownload noplaybackrate');
      try { v.disablePictureInPicture = true; } catch (_) {}
    });
    document.querySelectorAll('img').forEach((i) => i.setAttribute('draggable', 'false'));
  }
  harden();
  document.addEventListener('DOMContentLoaded', harden);
})();


/* ---------- Lightbox: gallery pager + free zoom/pan for project snapshots ---------- */
(function () {
  const triggers = document.querySelectorAll('.lgbox img');
  if (!triggers.length) return;

  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML =
    '<button class="lb-close" aria-label="Close">✕</button>' +
    '<div class="lb-tools">' +
      '<button class="lb-zoom-out" type="button" aria-label="Zoom out">−</button>' +
      '<button class="lb-zoom-fit" type="button">Fit</button>' +
      '<button class="lb-zoom-in" type="button" aria-label="Zoom in">+</button>' +
    '</div>' +
    '<div class="lb-stage"><img alt="" /></div>' +
    '<div class="lb-bar">' +
      '<button class="lb-nav lb-prev" type="button" aria-label="Previous"><span class="lb-dir">← Prev</span><span class="lb-adj lb-prev-name"></span></button>' +
      '<div class="lb-meta"><span class="lb-name"></span><span class="lb-count"></span></div>' +
      '<button class="lb-nav lb-next" type="button" aria-label="Next"><span class="lb-dir">Next →</span><span class="lb-adj lb-next-name"></span></button>' +
    '</div>';
  document.body.appendChild(lb);

  const stage = lb.querySelector('.lb-stage');
  const lbImg = stage.querySelector('img');
  const bar = lb.querySelector('.lb-bar');
  const elName = lb.querySelector('.lb-name');
  const elCount = lb.querySelector('.lb-count');
  const elPrev = lb.querySelector('.lb-prev');
  const elNext = lb.querySelector('.lb-next');
  const elPrevName = lb.querySelector('.lb-prev-name');
  const elNextName = lb.querySelector('.lb-next-name');
  const btnIn = lb.querySelector('.lb-zoom-in');
  const btnOut = lb.querySelector('.lb-zoom-out');
  const btnFit = lb.querySelector('.lb-zoom-fit');

  let group = [], idx = 0, isZoom = false;
  let fitW = 0, natW = 0, zoom = 1, zmin = 0.5, zmax = 3;

  const labelOf = (fig) => {
    const cap = fig && fig.querySelector('figcaption');
    if (!cap) return '';
    const strong = cap.querySelector('strong');
    return (strong ? strong.textContent : cap.textContent).replace(/\s+/g, ' ').trim();
  };
  const scrollOf = (img) => !!img.closest('.logo-studies, .product-shots');
  const snapOf = (img) => !!img.closest('.snapshot');
  const clamp = (z) => Math.max(zmin, Math.min(zmax, z));

  // Prefer an explicit hi-res source (data-hires) for the zoom view — desktop only, so
  // phones/tablets keep their lighter responsive variant; else the loaded variant.
  const wantHiRes = () => window.matchMedia('(min-width: 1025px)').matches;
  const itemFor = (im) => ({
    src: (wantHiRes() && im.getAttribute('data-hires')) || im.currentSrc || im.getAttribute('src'),
    name: labelOf(im.closest('figure')) || (im.getAttribute('alt') || '').replace(/\s*cover image$/i, '').trim(),
    scroll: scrollOf(im),
    snapshot: snapOf(im)
  });

  function setWidth() { lbImg.style.width = (fitW * zoom) + 'px'; }
  function updateTools() {
    btnOut.disabled = zoom <= zmin + 1e-3;
    btnIn.disabled = zoom >= zmax - 1e-3;
  }
  function computeFit() {
    const cs = getComputedStyle(stage);
    const availW = stage.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const availH = stage.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    natW = lbImg.naturalWidth || availW;
    const natH = lbImg.naturalHeight || availH;
    fitW = Math.min(availW, natW) || availW;                    // fit-to-width (zoom = 1)
    const containW = Math.min(availW, availH * natW / natH);    // whole image just fits the viewport
    zmin = Math.min(1, containW / fitW);                        // floor = contain (no empty-margin zoom-out)
    zmax = Math.max(natW / fitW, 3);                            // at least to native, at least 3× fit
  }
  function initZoomView() {
    computeFit();
    zoom = 1;                                    // fit-to-width
    setWidth();
    stage.scrollTop = 0;
    stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2; // center horizontally
    updateTools();
  }
  // Zoom keeping a focal point (defaults to viewport centre) anchored under the cursor
  function zoomTo(nz, cx, cy, vx, vy) {
    if (!isZoom) return;
    nz = clamp(nz);
    if (Math.abs(nz - zoom) < 1e-4) return;
    if (cx == null) {
      vx = stage.clientWidth / 2; vy = stage.clientHeight / 2;
      cx = stage.scrollLeft + vx; cy = stage.scrollTop + vy;
    }
    const ratio = nz / zoom;
    zoom = nz;
    setWidth();
    stage.scrollLeft = cx * ratio - vx;
    stage.scrollTop = cy * ratio - vy;
    updateTools();
  }

  function render() {
    const cur = group[idx];
    isZoom = cur.snapshot;
    lb.classList.toggle('lb-zoom', isZoom);
    lb.classList.toggle('lb-scroll', !isZoom && cur.scroll);
    lbImg.style.width = '';
    lbImg.alt = cur.name || '';

    const multi = group.length > 1;
    bar.classList.toggle('is-single', !multi);
    elName.textContent = cur.name;
    elCount.textContent = multi ? (idx + 1) + ' / ' + group.length : '';
    const hasPrev = idx > 0, hasNext = idx < group.length - 1;
    elPrev.classList.toggle('is-off', !hasPrev);
    elNext.classList.toggle('is-off', !hasNext);
    elPrevName.textContent = hasPrev ? group[idx - 1].name : '';
    elNextName.textContent = hasNext ? group[idx + 1].name : '';

    let done = false;
    const onReady = () => { if (done) return; done = true; stage.scrollTop = 0; if (isZoom) initZoomView(); };
    lbImg.onload = onReady;
    lbImg.src = cur.src;
    if (lbImg.complete && lbImg.naturalWidth) onReady();
  }

  function open(img) {
    const fig = img.closest('figure.lgbox');
    if (fig) {
      const figs = Array.from(fig.parentElement.querySelectorAll(':scope > figure.lgbox'));
      group = figs.map((f) => itemFor(f.querySelector('img')));
      idx = Math.max(0, figs.indexOf(fig));
    } else {
      group = [itemFor(img)];
      idx = 0;
    }
    lb.classList.add('open');            // reveal first so the stage has layout width
    document.body.style.overflow = 'hidden';
    render();
  }
  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.removeAttribute('src');
    lbImg.style.width = '';
  }
  function go(delta) {
    const n = idx + delta;
    if (n < 0 || n >= group.length) return;
    idx = n;
    render();
  }

  triggers.forEach((img) => img.addEventListener('click', () => open(img)));
  lb.querySelector('.lb-close').addEventListener('click', close);
  elPrev.addEventListener('click', (e) => { e.stopPropagation(); go(-1); });
  elNext.addEventListener('click', (e) => { e.stopPropagation(); go(1); });
  bar.addEventListener('click', (e) => e.stopPropagation());
  lbImg.addEventListener('click', (e) => e.stopPropagation());

  // Zoom controls
  btnIn.addEventListener('click', (e) => { e.stopPropagation(); zoomTo(zoom * 1.3); });
  btnOut.addEventListener('click', (e) => { e.stopPropagation(); zoomTo(zoom / 1.3); });
  btnFit.addEventListener('click', (e) => { e.stopPropagation(); zoomTo(1); });
  stage.addEventListener('wheel', (e) => {
    if (!isZoom) return;
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    const vx = e.clientX - r.left, vy = e.clientY - r.top;
    zoomTo(zoom * (e.deltaY < 0 ? 1.15 : 1 / 1.15), stage.scrollLeft + vx, stage.scrollTop + vy, vx, vy);
  }, { passive: false });
  stage.addEventListener('dblclick', (e) => {
    if (!isZoom) return;
    const r = stage.getBoundingClientRect();
    const vx = e.clientX - r.left, vy = e.clientY - r.top;
    const target = zoom > 1.01 ? 1 : Math.min(zmax, Math.max(natW / fitW, 2));
    zoomTo(target, stage.scrollLeft + vx, stage.scrollTop + vy, vx, vy);
  });

  // Drag to pan (and swallow the click that would otherwise close)
  let panning = false, sx = 0, sy = 0, sl = 0, st = 0, moved = false;
  stage.addEventListener('pointerdown', (e) => {
    if (!isZoom || e.pointerType !== 'mouse') return;   // touch keeps native scroll/momentum
    if (e.target.closest('.lb-tools, .lb-bar, .lb-close')) return;
    panning = true; moved = false;
    sx = e.clientX; sy = e.clientY; sl = stage.scrollLeft; st = stage.scrollTop;
    stage.classList.add('is-panning');
    try { stage.setPointerCapture(e.pointerId); } catch (_) {}
  });
  stage.addEventListener('pointermove', (e) => {
    if (!panning) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
    stage.scrollLeft = sl - dx; stage.scrollTop = st - dy;
  });
  const endPan = (e) => {
    if (!panning) return;
    panning = false; stage.classList.remove('is-panning');
    try { stage.releasePointerCapture(e.pointerId); } catch (_) {}
  };
  stage.addEventListener('pointerup', endPan);
  stage.addEventListener('pointercancel', endPan);

  // Click on backdrop closes — but not in zoom mode, and not right after a drag
  stage.addEventListener('click', (e) => {
    if (e.target === lbImg) return;
    if (isZoom) { moved = false; return; }
    close();
  });

  window.addEventListener('resize', () => {
    if (!lb.classList.contains('open') || !isZoom) return;
    const z = zoom; computeFit(); zoom = clamp(z); setWidth(); updateTools();
  });

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
    else if (isZoom && (e.key === '+' || e.key === '=')) zoomTo(zoom * 1.3);
    else if (isZoom && e.key === '-') zoomTo(zoom / 1.3);
  });
})();


/* ---------- Logo-study auto-pan (WAAPI — seamless hover slow-down) ---------- */
(function () {
  const imgs = document.querySelectorAll('.logo-studies > figure img, .pan-shots > figure img');
  if (!imgs.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const DURATION = 24000; // ms for a full top→bottom pass (linear)
  imgs.forEach((img, i) => {
    const start = () => {
      const anim = img.animate(
        [{ objectPosition: '50% 0%' }, { objectPosition: '50% 100%' }],
        { duration: DURATION, iterations: Infinity, direction: 'alternate', easing: 'linear' }
      );
      anim.currentTime = i * (DURATION / 2); // stagger the four so they're out of sync
      const fig = img.closest('figure');
      fig.addEventListener('mouseenter', () => { anim.playbackRate = 0.5; }); // seamless half-speed
      fig.addEventListener('mouseleave', () => { anim.playbackRate = 1; });
    };
    if (img.complete) start(); else img.addEventListener('load', start);
  });
})();
