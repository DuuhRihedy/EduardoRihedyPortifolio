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
  'Creator of Velkryon VTT',
  'Tracking & SEO',
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
    hero_role: 'Web Developer',
    hero_description: 'Full-Stack Developer with experience in building APIs, web applications and landing pages. Specialized in React, Node.js, TypeScript and NestJS.',
    hero_download: 'Download CV',
    hero_contact: "Let's Talk",

    // About
    about_title: 'About Me',
    about_subtitle: 'Get to know my journey and professional experience',
    about_text1: "I'm a Web Developer and IT teacher with a degree in Systems Analysis and Development, with hands-on experience building APIs, web applications and landing pages used in real business environments.",
    about_text2: 'Currently, I work as a Web Developer at Biosanté, where I handle front-end and back-end development, creating landing pages, CMS integrations, tracking, SEO and platforms like Shopify (GemPages) and WordPress. I use technologies such as React, Next.js, Node.js, NestJS, TypeScript and PostgreSQL.',
    about_text3: 'Previously, at Keys4Play, I directly contributed to reducing a one-year timeline to four months through efficient backend solutions. I also work as a teacher, covering topics from computer fundamentals to programming and data analysis.',
    stat_years: '+ Year of Experience',
    stat_projects: '+ Projects Delivered',
    stat_hours: '+ Course Hours',
    stat_companies: 'Companies',

    // Experience
    exp_title: 'Professional Experience',
    exp_subtitle: 'My journey in the tech industry',
    exp1_role: 'Web Developer',
    exp1_period: 'Feb 2026 — Present',
    exp1_desc: 'I develop and maintain web systems, landing pages and integrations for e-commerce. Working with front-end and back-end, including custom-coded pages and platforms like Shopify (GemPages) and WordPress (Elementor). Responsible for tracking, SEO, Liquid HTML editing and automated deployment via Cloudflare. Using AI tools for development optimization.',
    exp2_role: 'IT Teacher',
    exp2_period: 'Nov 2024 — Feb 2026',
    exp2_desc: 'Taught IT and hardware courses, responsible for preparing educational content. Revamped course materials with updated topics like Roblox Studio, Python, SQL and Power BI. The new curriculum resulted in a 22% increase in course sales and MEC certification approval.',
    exp3_role: 'FullStack Developer',
    exp3_period: 'Nov 2024 — Jul 2025',
    exp3_desc: 'Developed and maintained a digital games e-commerce platform. Responsible for database creation, documentation and internal maintenance. Used an external database to optimize data entry, reducing delivery time from one year to just four months.',

    // Skills
    skills_title: 'Technical Skills',
    skills_subtitle: 'Technologies and tools I use daily',
    skills_tools: 'Tools',
    skills_extra: 'Extra Knowledge',

    // Education
    edu_title: 'Education',
    edu_subtitle: 'Academic background and professional certifications',
    edu_academic: 'Academic Education',
    edu_certs: 'Certifications & Courses',
    edu_langs: 'Languages',
    edu1_title: 'Systems Analysis and Development',
    edu1_desc: 'Technology degree focused on programming, web development, information security, cryptography, statistics and data analysis.',
    edu2_title: 'IT Technician',
    edu2_desc: 'Technical training in IT including networking, hardware, design and programming.',
    cert1_period: 'Issued Jan 2026',
    cert2_title: 'Back-End JavaScript and TypeScript — Beginner to Advanced',
    cert3_title: 'Front-End Development Serliv',
    lang_en: 'English',
    lang_en_desc: 'Writing: Advanced | Reading: Advanced | Speaking: Intermediate',

    // Projects
    proj_title: 'My Projects',
    proj_subtitle: 'Some of the projects I have built',
    proj_soon: 'Coming Soon',
    proj_velkryon_desc: 'Professional VTT (Virtual Tabletop) platform for RPG. Includes character sheet systems, advanced automations for TaleSpire, and a dedicated subscription portal.',
    proj_block_desc: 'Modular and high-performance rich-text editor. Focused on productivity with automatic offline saving and export to multiple formats (PDF/DOCX).',
    proj1_desc: 'E-commerce platform for digital game sales. Full-stack development focused on backend, database and documentation.',
    proj2_desc: 'Institutional website for an occupational health company. Responsive landing page focused on conversion and SEO.',
    proj3_desc: 'Complete task management application with CRUD operations. Intuitive interface to create, edit, check and delete tasks.',
    proj_lepaiper_desc: 'Internal system I developed for Papelaria Lê Paiper. Focused on optimizing and automating business processes.',
    proj4_desc: 'My personalized version of Spotify. An advanced music player consuming Spotify and YouTube Music APIs for a unified experience.',

    // Contact
    contact_title: 'Contact',
    contact_subtitle: "Let's work together? Get in touch!",
    contact_text: "I'm available for full-stack or back-end opportunities, both remote and hybrid. Send a message and I'll get back to you as soon as possible!",
    contact_location: 'Location',
    contact_availability: 'Availability',
    contact_avail_text: 'Remote · Hybrid · On-site',
    form_send: 'Send Message',

    // Footer
    footer_made: 'Made with <span>❤️</span> by Eduardo Rihedy',
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
