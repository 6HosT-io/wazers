// Waze Latvija – Main JS

document.addEventListener('DOMContentLoaded', function () {
  // Maintenance mode
  if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.MAINTENANCE_MODE === true) {
    if (window.location.href.indexOf('maintenance.html') === -1) {
      window.location.replace('maintenance.html');
      return;
    }
  }

  const html = document.documentElement;

  // Language
  const langButtons = document.querySelectorAll('[data-set-lang]');
  const savedLang = localStorage.getItem('wazers-lang') || 'lv';
  setLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      setLanguage(this.getAttribute('data-set-lang'));
      localStorage.setItem('wazers-lang', this.getAttribute('data-set-lang'));
    });
  });

  function setLanguage(lang) {
    html.setAttribute('lang', lang);
    langButtons.forEach(b => {
      const on = b.getAttribute('data-set-lang') === lang;
      b.classList.toggle('active', on);
    });
  }

  // Dark mode
  const darkToggles = document.querySelectorAll('#dark-mode-toggle, .dark-mode-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    html.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('wazers-theme', theme);
    darkToggles.forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  const savedTheme = localStorage.getItem('wazers-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark.matches ? 'dark' : 'light');
  }

  darkToggles.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      applyTheme(html.classList.contains('dark') ? 'light' : 'dark');
    });
  });

  prefersDark.addEventListener('change', e => {
    if (!localStorage.getItem('wazers-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // Formspree
  const form = document.getElementById('contact-form');
  if (form && typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.FORMSPREE_ENDPOINT) {
    form.setAttribute('action', SITE_CONFIG.FORMSPREE_ENDPOINT);
    form.setAttribute('method', 'POST');
  }
});
