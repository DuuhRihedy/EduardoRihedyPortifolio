/*===== MENU SHOW/HIDE =====*/
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/* Close menu on link click */
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
});

/*===== HEADER SCROLL EFFECT =====*/
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scroll-active');
  } else {
    header.classList.remove('scroll-active');
  }
});

/*===== THEME TOGGLE (DARK / LIGHT) =====*/
const themeToggle = document.getElementById('theme-toggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

/* Load saved theme */
(function () {
  const saved = localStorage.getItem('portfolio-theme');
  if (saved) {
    setTheme(saved);
  }
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
  });
}


/*===== ACTIVE LINK ON SCROLL =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY + 100;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__link[href*="${sectionId}"]`);

    if (link) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    }
  });
}

window.addEventListener('scroll', scrollActive);

/*===== TYPING EFFECT =====*/
const typedElement = document.getElementById('typed-text');
const phrases = [
  'Full-Stack Developer',
  'React | Node.js | NestJS',
  'TypeScript | Next.js',
  'Prisma | PostgreSQL',
  'Playwright | Vitest',
  'Creator of Velkryon VTT',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 40;
  } else {
    typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 80;
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typingSpeed = 400; // Pause before next phrase
  }

  setTimeout(typeEffect, typingSpeed);
}

if (typedElement) {
  setTimeout(typeEffect, 1000);
}

/*===== COUNTER ANIMATION =====*/
function animateCounters() {
  const counters = document.querySelectorAll('[data-counter]');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-counter'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

/* Intersection Observer for counters */
const aboutSection = document.getElementById('about');
let countersAnimated = false;

if (aboutSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(aboutSection);
}

/*===== BACK TO TOP =====*/
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/*===== SCROLL REVEAL =====*/
const sr = ScrollReveal({
  origin: 'bottom',
  distance: '40px',
  duration: 1200,
  delay: 200,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
});

sr.reveal('.hero__greeting, .hero__name, .hero__typing-wrapper', { origin: 'left', interval: 150 });
sr.reveal('.hero__description, .hero__buttons, .hero__social', { origin: 'left', interval: 150, delay: 400 });
sr.reveal('.hero__img-wrapper', { origin: 'right', delay: 300 });
sr.reveal('.about__img-wrapper', { origin: 'left' });
sr.reveal('.about__data', { origin: 'right', delay: 200 });
sr.reveal('.stat-card', { interval: 150 });
sr.reveal('.experience__item', { interval: 200 });
sr.reveal('.skills__category', { interval: 150 });
sr.reveal('.education__card', { interval: 150 });
sr.reveal('.project-card', { interval: 200 });
sr.reveal('.contact__info', { origin: 'left' });
sr.reveal('.contact__form-wrapper', { origin: 'right', delay: 200 });

/*===== I18N — LANGUAGE TOGGLE =====*/
const translations = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_about: 'About',
    nav_experience: 'Experience',
    nav_skills: 'Skills',
    nav_education: 'Education',
    nav_projects: 'Projects',
    nav_contact: 'Contact',

    // Hero
    hero_greeting: "Hi, I'm",
    hero_role: 'Full-Stack Developer',
    hero_description: 'Full-Stack Developer who delivered an e-commerce project 66% ahead of schedule and doubled a development team\'s productivity with automation and AI. TypeScript, React, Next.js, NestJS, Prisma and PostgreSQL.',
    hero_download: 'Download CV',
    hero_contact: "Let's Talk",

    // About
    about_title: 'About Me',
    about_subtitle: 'Get to know my journey and professional experience',
    about_text1: "I'm a Full-Stack Developer with a degree in Systems Analysis and Development (FATEC), currently pursuing a postgraduate degree in Software Engineering with Applied AI (UNIPDS). I work with TypeScript, React 19, Next.js 16, Node.js, NestJS, Prisma and PostgreSQL, with automated testing in Playwright and Vitest.",
    about_text2: 'At Keys4Play, I built the database and the NestJS REST API for a digital games e-commerce and automated the catalog ingestion from an external database, cutting the project timeline from 12 to 4 months. At Biosanté, I built an internal platform and AI-powered automations (Claude Code) that more than doubled the development team\'s productivity.',
    about_text3: 'Before coding full-time, I spent 8 years in infrastructure, technical support and teaching: I moved 270 employees to remote work without a single day of downtime and rebuilt a school\'s course curriculum, increasing sales by 22% and earning MEC accreditation.',
    stat_years: '+ Years in Tech',
    stat_projects: '+ Projects Delivered',
    stat_hours: '% Ahead of Schedule',
    stat_companies: 'Companies',

    // Experience
    exp_title: 'Professional Experience',
    exp_subtitle: 'My journey in the tech industry',
    exp1_role: 'Full-Stack Web Developer',
    exp1_period: 'Feb 2026 — Oct 2026',
    exp1_desc: 'Built and maintained the e-commerce web applications and landing pages on both front-end and back-end, integrating payment gateways, tracking (Bemob), Shopify (GemPages), WordPress (Elementor) and automated deployment via Cloudflare. Replaced generic management tools with an internal platform integrated into the codebase and brought AI (Claude Code) into the workflow, more than doubling team productivity, eliminating sales-page delays and tracking event failures.',
    exp2_role: 'IT and Hardware Teacher',
    exp2_period: 'Nov 2024 — Feb 2026',
    exp2_desc: 'Taught computing, hardware, networking and programming logic to students of all ages. Fully rewrote the school\'s course materials, replacing outdated content with Python, SQL, Power BI, Arduino and Roblox Studio. The new curriculum increased course sales by 22% and secured MEC certification approval.',
    exp3_role: 'Full-Stack Developer (Back-End Focus)',
    exp3_period: 'Nov 2024 — Jul 2025',
    exp3_desc: 'Designed the relational database with Prisma ORM and built the NestJS REST API for a digital games, gift cards and DLC e-commerce, with a Payload CMS admin panel and Swagger documentation. Built automated catalog ingestion from an external games database, cutting the project timeline from 1 year to 4 months (66% faster), with 100% of endpoints typed and documented.',
    exp4_role: 'Software Technician',
    exp4_period: 'Dec 2022 — Feb 2024',
    exp4_desc: 'Performed advanced software diagnostics on smartphones, tablets and wearables with Samsung Global Diagnostics, plus firmware updates, backups and secure data restoration under strict SLAs. Consistently met Samsung\'s First Time Fix targets.',
    exp5_role: 'Network & Infrastructure Support',
    exp5_period: 'Apr 2018 — Feb 2022',
    exp5_desc: 'Maintained computers, servers, structured cabling and networks for a contact center with 250+ seats. During the pandemic, I led the technical migration of the entire operation to remote work with VPN and security policies, with zero days of downtime, training 270 employees and no data leak incidents.',

    // Skills
    skills_title: 'Technical Skills',
    skills_subtitle: 'Technologies and tools I use daily',
    skills_tools: 'Tools',
    skills_extra: 'Extra Knowledge',
    skills_testing: 'Testing, Cloud & DevOps',

    // Education
    edu_title: 'Education',
    edu_subtitle: 'Academic background and professional certifications',
    edu_academic: 'Academic Education',
    edu_certs: 'Certifications & Courses',
    edu_langs: 'Languages',
    edu0_title: 'Postgraduate Degree in Software Engineering with Applied AI',
    edu0_period: 'Jun 2026 — Jul 2027 (in progress)',
    edu0_desc: 'LLMs, generative AI APIs, MCP, autonomous agents (LangChain.js, LangGraph, CrewAI), AI system architecture, DevOps and AI security.',
    edu1_title: 'Systems Analysis and Development',
    edu1_desc: 'Technology degree focused on programming, web development, information security, cryptography, statistics and data analysis.',
    edu2_title: 'IT Technician',
    edu2_desc: 'Technical training in IT including networking, hardware, design and programming.',
    cert1_period: 'Issued Jan 2026',
    cert2_title: 'Back-End JavaScript and TypeScript — Beginner to Advanced',
    cert3_title: 'Front-End Development Serliv',
    lang_en: 'English',
    lang_en_desc: 'Cambridge B2 — Writing: Advanced | Reading: Advanced | Speaking: Intermediate',

    // Projects
    proj_title: 'My Projects',
    proj_subtitle: 'Some of the projects I have built',
    proj_soon: 'Coming Soon',
    proj_velkryon_desc: 'Real-time multiplayer VTT (Virtual Tabletop) platform for RPG: 2D Canvas maps, 3D visualization, physics-based 3D dice, character sheet editor and map uploads to AWS S3, all synced via WebSockets.',
    proj_block_desc: 'Notion-inspired block-based rich-text editor in a monorepo (editor, API and web app). Slash commands, automatic offline saving and in-browser export to DOCX and PDF.',
    proj1_desc: 'Digital games, gift cards and DLC e-commerce. Database, documented REST API and automated catalog ingestion that cut the project timeline from 12 to 4 months.',
    proj2_desc: 'Occupational Health & Safety (SST) and eSocial system for clinics: reception, triage and clinical exams, with E2E and API tests in Playwright.',
    proj_canela_desc: 'Institutional website and specialty coffee e-commerce, with a filterable digital menu and a B2B area for office supply contracts. Custom pure-CSS design system.',
    proj_lepaiper_desc: 'ERP for stationery stores and local retail: POS with change, discounts and real-time stock, revenue dashboard, average ticket and ABC curve, with secure login via Auth.js.',
    proj_etarp_desc: 'Institutional website and industrial solutions catalog (labels, commercial automation and equipment rental), SEO-optimized for lead generation, with self-hosted fonts and zero CLS.',
    proj_soon_desc: 'Dorns Tracking Hub — Centralized advanced tracking (GTM/Meta Pixel) with real-time smart pixel routing for multiple e-commerce platforms.',

    // Contact
    contact_title: 'Contact',
    contact_subtitle: "Let's work together? Get in touch!",
    contact_text: "I'm available for full-stack, front-end or back-end opportunities, remote, hybrid or on-site. Send a message and I'll get back to you as soon as possible!",
    contact_location: 'Location',
    contact_availability: 'Availability',
    contact_avail_text: 'Remote · Hybrid · On-site',
    form_send: 'Send Message',

    // Footer
    footer_made: 'Eduardo Rihedy Dorneles — Full-Stack Developer',
    footer_rights: 'All rights reserved.',
  }
};

const ptTexts = {};
let currentLang = 'pt';

/* Collect original PT texts on load */
function collectPtTexts() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    ptTexts[key] = el.innerHTML;
  });
}

/* Placeholder translations */
const placeholderTranslations = {
  en: {
    form_name: 'Your name',
    form_email: 'Your email',
    form_message: 'Your message...',
  },
  pt: {
    form_name: 'Seu nome',
    form_email: 'Seu email',
    form_message: 'Sua mensagem...',
  }
};

function switchLanguage(lang) {
  const isEnglish = lang === 'en';
  const texts = isEnglish ? translations.en : ptTexts;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (texts[key]) {
      el.innerHTML = texts[key];
    }
  });

  /* Placeholders */
  const phTexts = isEnglish ? placeholderTranslations.en : placeholderTranslations.pt;
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (phTexts[key]) {
      el.setAttribute('placeholder', phTexts[key]);
    }
  });

  /* Update html lang */
  document.documentElement.lang = isEnglish ? 'en' : 'pt-BR';

  /* Update toggle label */
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = isEnglish ? 'PT' : 'EN';
  }

  currentLang = lang;
  localStorage.setItem('portfolio-lang', lang);
}

/* Language toggle button */
const langToggle = document.getElementById('lang-toggle');

if (langToggle) {
  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    switchLanguage(newLang);
  });
}

/* Init language */
document.addEventListener('DOMContentLoaded', () => {
  collectPtTexts();
  const savedLang = localStorage.getItem('portfolio-lang');
  if (savedLang && savedLang === 'en') {
    switchLanguage('en');
  }
});

/*===== TOAST NOTIFICATIONS =====*/
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const icons = {
    success: 'bx bx-check-circle',
    error: 'bx bx-error-circle',
    warning: 'bx bx-error',
  };

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <i class="toast__icon ${icons[type]}"></i>
    <span class="toast__message">${message}</span>
    <i class="toast__close bx bx-x" onclick="this.parentElement.classList.add('removing'); setTimeout(() => this.parentElement.remove(), 300);"></i>
  `;

  container.appendChild(toast);

  /* Auto remove after 5s */
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

/* Make showToast available globally for sendEmail.js */
window.showToast = showToast;
