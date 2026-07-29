// Waze Latvija – Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // ---------- Maintenance Mode ----------
  // More reliable check that works with different hosting paths
  if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.MAINTENANCE_MODE === true) {
    const isMaintenancePage = window.location.href.indexOf('maintenance.html') !== -1;
    if (!isMaintenancePage) {
      window.location.replace('maintenance.html');
      return;
    }
  }

  // ---------- Language Switcher ----------
  const langButtons = document.querySelectorAll('[data-set-lang]');
  const html = document.documentElement;

  const savedLang = localStorage.getItem('wazers-lang') || 'lv';
  setLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const lang = this.getAttribute('data-set-lang');
      setLanguage(lang);
      localStorage.setItem('wazers-lang', lang);
    });
  });

  function setLanguage(lang) {
    html.setAttribute('lang', lang);
    langButtons.forEach(b => {
      const isActive = b.getAttribute('data-set-lang') === lang;
      b.classList.toggle('active', isActive);
      b.classList.toggle('bg-waze', isActive);
      b.classList.toggle('text-white', isActive);
      b.classList.toggle('bg-gray-100', !isActive);
      b.classList.toggle('text-gray-700', !isActive);
    });
  }

  // ---------- Dark Mode ----------
  const darkToggles = document.querySelectorAll('#dark-mode-toggle, .dark-mode-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      html.classList.remove('dark');
      document.body.classList.remove('dark');
    }
    localStorage.setItem('wazers-theme', theme);
    updateToggleIcons(theme);
  }

  function updateToggleIcons(theme) {
    darkToggles.forEach(btn => {
      btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  // Initial theme: saved preference or system
  const savedTheme = localStorage.getItem('wazers-theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    applyTheme(savedTheme);
  } else {
    applyTheme(prefersDark.matches ? 'dark' : 'light');
  }

  // Manual toggle (works with multiple buttons)
  darkToggles.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const isDark = html.classList.contains('dark');
      applyTheme(isDark ? 'light' : 'dark');
    });
  });

  // Follow system changes only if user has never set a preference
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('wazers-theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ---------- Mobile Menu ----------
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

  // ---------- Formspree support ----------
  const contactForm = document.getElementById('contact-form');
  if (contactForm && typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.FORMSPREE_ENDPOINT) {
    contactForm.setAttribute('action', SITE_CONFIG.FORMSPREE_ENDPOINT);
    contactForm.setAttribute('method', 'POST');
  }
});
