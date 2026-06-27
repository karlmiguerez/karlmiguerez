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