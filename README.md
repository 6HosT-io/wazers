# Waze Latvija Community Website (Static)

Fast, clean static website for the **Waze Latvia** community.

| | |
|---|---|
| **Live site** | https://wazers.lv / https://www.wazers.lv |
| **Domain** | nic.lv → hosted on **Garmtech** (Plesk) |
| **Contact** | wazers@wazers.lv |
| **Facebook** | https://www.facebook.com/WazeLV |
| **Analytics** | Google Analytics 4 · `G-N73JCDN9NF` (after cookie consent) |
| **Stack** | HTML · CSS · vanilla JS · Tailwind CDN · no build step |

---

## Features (overview)

- Fully **responsive** (desktop + mobile hamburger menu with solid panel)
- **Bilingual** LV (default) + EN with persistent language switcher
- **Dark mode** – system preference + manual toggle (saved in `localStorage`)
- **Live Waze map** embed on homepage (“Waze Tiešsaistes karte”)
- **Facebook** timeline on Jaunumi (loads only after cookie consent)
- **Download Waze** modal → App Store (iOS) / Google Play (Android)
- **Cookie consent** banner + Privacy / Cookie policy pages
- **Google Analytics 4** – private dashboard only; loads after consent
- **Maintenance mode** (one flag in `js/config.js`)
- Custom **404** page (“Kaut kas nogāja greizi”)
- Contact form (mailto by default; Formspree optional)
- **Clean URLs** (no `.html` in the address bar) via `.htaccess`
- Optional **first-visit mobile splash** (slow load only)
- Semantic CSS class names for easy editing

---

## Pages

| URL path | File | Purpose |
|----------|------|---------|
| `/` | `index.html` | Homepage – banner, stats, live map, cards, partners |
| `/jaunumi` | `jaunumi.html` | News – Facebook embed + highlight articles |
| `/notikumi` | `notikumi.html` | Events / closures |
| `/svariga` | `svariga.html` | Important information |
| `/palidziba` | `palidziba.html` | Help / FAQ |
| `/kontakts` | `kontakts.html` | Contact form + partner / editor info |
| `/privacy` | `privacy.html` | Privacy Policy (LV + EN) |
| `/cookies` | `cookies.html` | Cookie Policy (LV + EN) |
| `/maintenance` | `maintenance.html` | Work in Progress (when mode is on) |
| *(any missing)* | `404.html` | Error page |

**Navigation labels (LV):** Galvenā · Jaunumi · Notikumi · Svarīga Informācija · Palīdzība · Kontakti  
Header and footer **Saites** use the same set of links.

---

## File structure

```
wazers-lv/
├── index.html
├── jaunumi.html
├── notikumi.html
├── svariga.html
├── palidziba.html
├── kontakts.html
├── privacy.html
├── cookies.html
├── maintenance.html
├── 404.html
├── .htaccess                 ← clean URLs + 404 (Apache)
├── css/
│   └── style.css             ← all custom styles
├── js/
│   ├── config.js             ← EDIT: maintenance, Formspree, GA, email
│   └── main.js               ← language, dark mode, menu, cookies, GA, modal
├── assets/
│   ├── logo.jpg              ← header + footer logo (required)
│   └── hero.jpg              ← homepage banner background (optional)
└── README.md
```

---

## Configuration (`js/config.js`)

```js
const SITE_CONFIG = {
  MAINTENANCE_MODE: false,              // true → redirect to /maintenance
  FACEBOOK_PAGE: 'https://www.facebook.com/WazeLV',
  CONTACT_EMAIL: 'wazers@wazers.lv',
  FORMSPREE_ENDPOINT: '',               // e.g. 'https://formspree.io/f/xxxxxxxx'
  GA_MEASUREMENT_ID: 'G-N73JCDN9NF',    // Google Analytics 4
};
```

Upload only this file after changing it.

---

## Google Analytics 4

| Item | Detail |
|------|--------|
| Measurement ID | `G-N73JCDN9NF` |
| Load method | Injected by `main.js` **only after cookie consent** (not hardcoded in every `<head>`) |
| Public site | No live stats on the website |
| Dashboard | https://analytics.google.com → Reports → Realtime / standard reports |
| First data | Can take up to ~30 minutes after first consented visit |

**Verify:** Accept cookies on the site → GA4 → **Reports → Realtime**.

**Note:** WordPress plugins (e.g. MonsterInsights) do **not** apply to this static site. Old WordPress files on Plesk do not track these HTML pages.

Privacy / Cookie policy pages mention GA as a non-essential third party.

---

## Cookie consent & legal

- Banner: Accept all / I agree to non-essential cookies / More info  
- Stored in `localStorage` (`wazers-cookie-consent`)  
- Gates **Facebook** embed and **Google Analytics**  
- Footer **Legal** → `/privacy` and `/cookies`  

**localStorage keys:**

| Key | Purpose |
|-----|---------|
| `wazers-lang` | LV / EN |
| `wazers-theme` | light / dark |
| `wazers-cookie-consent` | `all` or `nonessential` |
| `wazers-loader-seen` | mobile splash already handled |

---

## Mobile menu

- Hamburger opens a **full-width solid panel** under the sticky header  
- Links + dark mode + LV/EN inside the panel  
- Body scroll locked while open  
- Hidden on desktop (≥ 768px)  
- Files: `css/style.css` + `js/main.js`

---

## Clean URLs

`.htaccess` provides `/page` instead of `/page.html`.

Upload `.htaccess` to the site root. Index file = `index.html`.  
If Nginx-only, use equivalent `try_files` rules (see hosting notes below).

---

## Maintenance mode

1. `js/config.js` → `MAINTENANCE_MODE: true`  
2. Upload → visitors go to `/maintenance`  
3. Set back to `false` to reopen  

---

## Download Waze modal

Header / homepage **Lejupielādēt** opens App Store + Google Play links.  
Close with ×, backdrop, or Escape.

---

## Contact form (Formspree)

Default: `mailto:wazers@wazers.lv`.  
Optional: set `FORMSPREE_ENDPOINT` in `config.js` after creating a form at formspree.io.

---

## Logo & banner

| File | Use |
|------|-----|
| `assets/logo.jpg` | Header + footer (round) |
| `assets/hero.jpg` | Homepage hero background |

---

## Mobile splash loader (optional UX)

Shown only when: first visit in this browser **and** mobile **and** load slower than ~300 ms.  
Logo + “Waze Latvija” + “Ielādē… / Loading…”.  
Host WAF pages (“Please wait while your request is being verified…”) are **not** this loader — contact Garmtech/Imunify360 if those appear often.

---

## Security

| Topic | Status |
|-------|--------|
| Architecture | Pure static – no PHP, no database |
| HTTPS | Required (SSL on Garmtech) |
| Secrets in repo | None |
| Analytics / Facebook | Only after consent |
| Forms | Client-side or Formspree |
| Maintenance flag | Client-side redirect only |

Keep SSL for both `wazers.lv` and `www.wazers.lv`. Prefer one canonical host.

---

## Performance (already applied)

- Static files, no build pipeline  
- Tailwind CDN + small custom CSS  
- Fonts preconnect  
- Facebook SDK async + consent-gated  
- GA consent-gated  
- Map iframe lazy where applicable  

---

## CSS class structure (main)

| Class | Purpose |
|-------|---------|
| `page` + `page-home` / `page-news` … | Body |
| `wrap` | Max-width container |
| `site-header` / `site-footer` | Chrome |
| `logo` / `nav` / `header-actions` / `menu-btn` / `mobile-menu` | Header & mobile nav |
| `btn` / `btn-blue` / `btn-red` / `btn-store` / `btn-ios` / `btn-android` | Buttons |
| `main-banner` / `section-*` / `card` / `news-split` | Content blocks |
| `modal` / `cookie-banner` / `site-loader` | Overlays |
| `text-blue` / `text-red` | Brand colours |

**Colours:** Waze Blue `#0099FF` · Latvian Red `#9E3039`

---

## Hosting checklist (Garmtech)

- [ ] Files in site root  
- [ ] `.htaccess` present  
- [ ] `assets/logo.jpg` (+ optional `hero.jpg`)  
- [ ] SSL for apex and `www`  
- [ ] Index = `index.html`  
- [ ] Preferred domain / redirect  
- [ ] 404 → `/404.html`  
- [ ] Mailbox **wazers@wazers.lv** active or forwarded  
- [ ] `config.js` uploaded with GA ID  

---


## Mobile menu accessibility

The hamburger menu is implemented as an **accessible disclosure** (not a full-screen modal dialog).

### Behaviour

| Action | Result |
|--------|--------|
| Open (click / Enter / Space) | Panel opens; `aria-expanded="true"`; body scroll locked; focus moves to first link |
| Close (link click) | Panel closes; focus returns to menu button |
| Close (Escape) | Panel closes; focus returns to menu button |
| Tab while open | Focus cycles inside the panel (simple trap) |
| Desktop ≥ 768px | Button and panel stay hidden |

### ARIA & markup

| Element | Attributes |
|---------|------------|
| Menu button `#mobile-menu-btn` | `type="button"`, `aria-label="Izvēlne"`, `aria-expanded="false\|true"`, `aria-controls="mobile-menu"` |
| Icon SVG | `aria-hidden="true"`, `focusable="false"` |
| Panel `#mobile-menu` | Hidden with class `hidden` (`display: none`) when closed |
| `<nav>` (desktop + mobile) | `aria-label="Galvenā navigācija"` |
| Active page link | `class="active"` + `aria-current="page"` |
| Language buttons | `aria-pressed="true\|false"` on LV/EN |
| Dark mode toggle | LV/EN `aria-label` (“Pārslēgt uz tumšo/gaišo režīmu”) |

### CSS / UX

- Menu button minimum hit area **44×44px**
- `:focus-visible` outline on menu button, links, and controls
- Solid panel background (light + dark mode) under the sticky header

### Files involved

- All page HTML headers (button + panel markup)
- `js/main.js` — open/close, Escape, focus management, `aria-pressed`
- `css/style.css` — panel layout, touch target, focus styles

### Quick keyboard test

1. Narrow viewport (or phone).
2. Tab to ☰ → Enter to open.
3. Tab through links and LV/EN / theme controls.
4. Escape → menu closes, focus back on ☰.

---
## Recent updates (summary)

- Contact email → **wazers@wazers.lv** everywhere  
- GA4 **G-N73JCDN9NF** via consent-gated `gtag`  
- Mobile menu solid panel + scroll lock + **a11y** (ARIA, Escape, focus trap)  
- Nav labels: **Galvenā**, **Kontakti**; footer matches full menu  
- Contact page: “Sazinies ar mums” + updated intro  
- Map section title: “Waze Tiešsaistes karte”  
- Apple App Store icon (Font Awesome path)  
- Privacy / Cookie policies mention GA  

---

Made for the Waze Latvija community · 2026
