// Waze Latvija - Main JS

document.addEventListener('DOMContentLoaded', function() {
  // Language switcher
  const langButtons = document.querySelectorAll('[data-set-lang]');
  const html = document.documentElement;

  // Load saved language or default to LV
  const savedLang = localStorage.getItem('wazers-lang') || 'lv';
  setLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-set-lang');
      setLanguage(lang);
      localStorage.setItem('wazers-lang', lang);
    });
  });

  function setLanguage(lang) {
    html.setAttribute('lang', lang);
    
    // Update button states
    langButtons.forEach(b => {
      if (b.getAttribute('data-set-lang') === lang) {
        b.classList.add('active', 'bg-waze', 'text-white');
        b.classList.remove('bg-gray-100', 'text-gray-700');
      } else {
        b.classList.remove('active', 'bg-waze', 'text-white');
        b.classList.add('bg-gray-100', 'text-gray-700');
      }
    });
  }

  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
});
