/* ============================================
   PORTFOLIO — script.js
   ============================================ */

// ---------- Headline cycling animation ----------
const headlineCopies = [
  'people remember.',
  'that just work.',
  'with intention.',
];

const animEl = document.querySelector('.headline-animate');

// Wrap in overflow-hidden container for clean clip
const wrapper = document.createElement('span');
wrapper.className = 'headline-animate-wrapper';
animEl.parentNode.insertBefore(wrapper, animEl);
wrapper.appendChild(animEl);

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

setInterval(cycleHeadline, 3000);

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
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Sticky nav on scroll ----------
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

// ---------- Mobile menu toggle ----------
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

navToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';

  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
    spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.transform = '';
  }
});

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

// ---------- Smooth active nav link highlight ----------
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => sectionObserver.observe(section));
