// Waze Latvija – Main JS

document.addEventListener('DOMContentLoaded', function () {
  // Maintenance mode
  if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.MAINTENANCE_MODE === true) {
    if (window.location.href.indexOf('maintenance') === -1) {
      window.location.replace('/maintenance');
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
      const open = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Formspree
  const form = document.getElementById('contact-form');
  if (form && typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.FORMSPREE_ENDPOINT) {
    form.setAttribute('action', SITE_CONFIG.FORMSPREE_ENDPOINT);
    form.setAttribute('method', 'POST');
  }
  // Download app modal
  const downloadModal = document.getElementById('download-modal');
  if (downloadModal) {
    const openBtns = document.querySelectorAll('[data-open-download]');
    const closeEls = document.querySelectorAll('[data-close-download]');

    function openDownloadModal() {
      downloadModal.classList.remove('hidden');
      downloadModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function closeDownloadModal() {
      downloadModal.classList.add('hidden');
      downloadModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => btn.addEventListener('click', openDownloadModal));
    closeEls.forEach(el => el.addEventListener('click', closeDownloadModal));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && !downloadModal.classList.contains('hidden')) {
        closeDownloadModal();
      }
    });
  }


  // Cookie consent banner
  const CONSENT_KEY = 'wazers-cookie-consent';
  function getConsent() {
    return localStorage.getItem(CONSENT_KEY);
  }
  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent('wazers-consent', { detail: value }));
  }
  window.wazersHasCookieConsent = function () {
    const v = getConsent();
    return v === 'all' || v === 'nonessential';
  };

  if (!getConsent()) {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <p class="cookie-banner-text">
          <span data-lang="lv">Mēs izmantojam nepieciešamās tehnoloģijas vietnes darbībai un, ar jūsu piekrišanu, neobligāto saturu (piem. Facebook). </span>
          <span data-lang="en">We use necessary technologies for the site to work and, with your consent, non-essential content (e.g. Facebook). </span>
        </p>
        <div class="cookie-banner-actions">
          <button type="button" class="btn btn-blue" data-consent="all">
            <span data-lang="lv">Piekrist visam</span>
            <span data-lang="en">Accept all</span>
          </button>
          <button type="button" class="btn btn-blue" data-consent="nonessential" style="background:#0ea5e9;">
            <span data-lang="lv">Piekrītu neobligātajām sīkdatnēm</span>
            <span data-lang="en">I agree to non-essential cookies</span>
          </button>
          <a href="/cookies" class="btn-outline">
            <span data-lang="lv">Vairāk info</span>
            <span data-lang="en">More info</span>
          </a>
        </div>
      </div>`;
    document.body.appendChild(banner);

    // Re-apply language visibility for injected nodes
    const lang = document.documentElement.getAttribute('lang') || 'lv';
    banner.querySelectorAll('[data-lang]').forEach(el => {
      const show = el.getAttribute('data-lang') === lang;
      if (el.tagName === 'SPAN' || el.tagName === 'A' || el.tagName === 'BUTTON') {
        el.style.display = show ? (el.tagName === 'SPAN' ? 'inline' : '') : 'none';
      }
    });

    banner.querySelectorAll('[data-consent]').forEach(btn => {
      btn.addEventListener('click', () => {
        setConsent(btn.getAttribute('data-consent'));
        banner.remove();
      });
    });
  }


  // Google Analytics 4 – only after cookie consent
  function loadGoogleAnalytics() {
    if (typeof SITE_CONFIG === 'undefined') return;
    const id = SITE_CONFIG.GA_MEASUREMENT_ID;
    if (!id || !String(id).trim()) return;
    if (!(window.wazersHasCookieConsent && window.wazersHasCookieConsent())) return;
    if (document.getElementById('ga-gtag')) return;

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    s.id = 'ga-gtag';
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id, {
      anonymize_ip: true,
      send_page_view: true
    });
  }

  window.addEventListener('wazers-consent', loadGoogleAnalytics);
  loadGoogleAnalytics();

});
