# Waze Latvija Community Website (Static)

Fast, clean static website for the **Waze Latvia** community.

| | |
|---|---|
| **Live site** | https://wazers.lv / https://www.wazers.lv |
| **Domain** | nic.lv → hosted on **Garmtech** (Plesk) |
| **Contact** | wazelatvia@gmail.com |
| **Facebook** | https://www.facebook.com/WazeLV |
| **Stack** | HTML · CSS · vanilla JS · Tailwind CDN · no build step |

---

## Features (overview)

- Fully **responsive** (desktop + mobile)
- **Bilingual** LV (default) + EN with persistent language switcher
- **Dark mode** – system preference + manual toggle (saved in `localStorage`)
- **Live Waze map** embed on homepage
- **Facebook** timeline on Jaunumi (loads only after cookie consent)
- **Download Waze** modal → App Store (iOS) / Google Play (Android)
- **Cookie consent** banner + Privacy / Cookie policy pages
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
│   ├── config.js             ← EDIT: maintenance, Formspree, contacts
│   └── main.js               ← language, dark mode, menu, cookies, modal
├── assets/
│   ├── logo.jpg              ← header + footer logo (required)
│   └── hero.jpg              ← homepage banner background (optional)
└── README.md
```

---

## Configuration (`js/config.js`)

```js
const SITE_CONFIG = {
  MAINTENANCE_MODE: false,          // true = redirect everyone to /maintenance
  FACEBOOK_PAGE: 'https://www.facebook.com/WazeLV',
  CONTACT_EMAIL: 'wazelatvia@gmail.com',
  FORMSPREE_ENDPOINT: '',           // e.g. 'https://formspree.io/f/xxxxxxxx'
};
```

Upload only this file after changing it.

---

## Clean URLs

`.htaccess` provides:

| Request | Result |
|---------|--------|
| `/index.html` | → `/` |
| `/jaunumi.html` | → `/jaunumi` |
| `/jaunumi` | serves `jaunumi.html` |

**Setup (Garmtech / Plesk + Apache):**

1. Upload `.htaccess` to the **site root** (same folder as `index.html`).
2. Show hidden files in the file manager if needed.
3. **Index files** → custom value: `index.html`
4. Prefer HTTPS and one canonical host (`wazers.lv` **or** `www.wazers.lv`).

If the panel only offers limited Apache options, `.htaccess` is still the main tool.  
If hosting is **Nginx-only**, add something like:

```nginx
location / {
  try_files $uri $uri.html $uri/ /index.html;
}
error_page 404 /404.html;
```

---

## Maintenance mode

1. Open `js/config.js`
2. Set `MAINTENANCE_MODE: true`
3. Upload the file

Visitors are redirected to `/maintenance` (Facebook link + email).  
Set back to `false` to reopen the site.

---

## Download Waze modal

Header and homepage **Lejupielādēt / Download** open a small dialog:

- **App Store (iOS)** → Apple link  
- **Google Play (Android)** → Play Store link  

Close with ×, backdrop click, or Escape. Present on all main pages.

---

## Cookie consent & legal pages

- Banner on first visit (bottom): **Accept all** / **I agree to non-essential cookies** / **More info**
- Choice stored in `localStorage` (`wazers-cookie-consent`)
- Facebook embed on **Jaunumi** loads only after consent
- Footer **Legal** section → `/privacy` and `/cookies`
- Policy texts are **community templates**, not legal advice

**localStorage keys used by the site:**

| Key | Purpose |
|-----|---------|
| `wazers-lang` | LV / EN |
| `wazers-theme` | light / dark |
| `wazers-cookie-consent` | `all` or `nonessential` |
| `wazers-loader-seen` | mobile splash already handled |

---

## Mobile splash loader (optional UX)

Shown only when **all** of these are true:

1. First visit in this browser (`wazers-loader-seen` not set)  
2. Mobile viewport (≤ 768px)  
3. Page still loading after ~300 ms  

Then: logo + “Waze Latvija” + “Ielādē… / Loading…” for at least ~0.9 s, then fade out.  
Desktop or fast loads skip the splash but still mark the visit.

To test again: clear site data / delete `wazers-loader-seen`, use mobile width + throttled network.

---

## Logo & banner images

### Logo (`assets/logo.jpg`)

- Used in **header** and **footer** (round crop via CSS)
- Filename must be exactly: `logo.jpg`
- Recommended: roughly square; displayed ~40px (header) / ~32px (footer)

### Banner (`assets/hero.jpg`)

- Homepage hero background
- Title/subtitle use a white outline so text stays readable
- Optional: change path in `index.html` (`background-image: url('assets/hero.jpg')`)

---

## Contact form (Formspree)

Default: opens the visitor’s email client (`mailto`).

Better delivery:

1. Create a form at https://formspree.io  
2. Copy endpoint `https://formspree.io/f/xxxxxxxx`  
3. Put it in `js/config.js` → `FORMSPREE_ENDPOINT`  
4. Upload `config.js`

---

## 404 page

- File: `404.html`  
- Message: **Kaut kas nogāja greizi** / Something went wrong  
- Keeps header/footer for navigation  
- Also declared in `.htaccess`: `ErrorDocument 404 /404.html`  
- In Plesk you can additionally set Error Pages → 404 → `/404.html`

---

## Domain notes (wazers.lv vs www)

- Prefer **one** canonical address (with or without `www`) and redirect the other.
- SSL must cover **both** `wazers.lv` and `www.wazers.lv`.
- DNS: apex (`@`) A record and `www` to the same host.
- If apex “breaks” while www works, fix DNS/SSL/hosting for the non-www name first.

---

## Security

| Topic | Status |
|-------|--------|
| Architecture | Pure static – no PHP, no database, no server-side sessions |
| HTTPS | Required (SSL on Garmtech) |
| Secrets in repo | None – no API keys or passwords in code |
| Forms | Client-side until Formspree; then data goes to Formspree, not your server |
| Third parties | Tailwind CDN, Google Fonts, Facebook SDK (after consent), App/Play store links |
| XSS surface | Low – no server-rendered user content; still avoid pasting untrusted HTML into pages |
| Cookie banner | Reduces non-essential third-party load until consent |
| Maintenance flag | Client-side redirect only – not a hard lock (source is still downloadable) |
| `.htaccess` | URL shaping + 404 only; not a full WAF |

**Recommendations:**

- Keep SSL valid for both hostnames  
- Do not commit real Formspree secrets beyond the public form endpoint  
- Review Privacy/Cookie texts with a professional if needed for official use  
- After major uploads, hard-refresh or test in a private window  

---

## Performance (already applied)

- Static files, no build pipeline  
- Tailwind via CDN; custom CSS kept small  
- Fonts preconnect  
- Facebook SDK async + consent-gated  
- Map iframe `loading="lazy"` where applicable  
- Image paths under `assets/` only  

---

## CSS class structure (main)

| Class | Purpose |
|-------|---------|
| `page` + `page-home` / `page-news` … | Body |
| `wrap` | Max-width container |
| `row` / `row-between` / `col` | Flex layouts |
| `grid-2` / `grid-3` / `grid-4` | Grids |
| `site-header` / `site-footer` | Chrome |
| `logo` / `nav` / `header-actions` | Header |
| `lang-switch` / `lang-btn` | Language |
| `menu-btn` / `mobile-menu` | Mobile nav |
| `btn` / `btn-blue` / `btn-red` / `btn-sm` / `btn-icon` | Buttons |
| `btn-store` / `btn-ios` / `btn-android` | Store buttons in modal |
| `main-banner` / `main-banner-title` / `main-banner-subtitle` | Hero |
| `section-stats` / `section-map` / `section-cards` / `section-partners` | Homepage blocks |
| `card` / `event` / `badge-*` | Cards & events |
| `news-split` / `news-fb` / `news-side` | Jaunumi layout |
| `page-content` / `page-title` / `page-intro` | Inner pages |
| `waze-map` | Live map |
| `form-*` / `info-box` | Forms |
| `modal` / `modal-box` | Download dialog |
| `cookie-banner` | Consent bar |
| `site-loader` | Mobile splash |
| `text-blue` / `text-red` | Brand colours |

---

## Colours

| Name | Hex | Use |
|------|-----|-----|
| Waze Blue | `#0099FF` | Primary actions, links |
| Latvian Red | `#9E3039` | Accent, secondary buttons |

---

## Editing tips

1. **Text / news / events** – edit the relevant `.html` file.  
2. **Behaviour flags** – only `js/config.js`.  
3. **Look & layout** – `css/style.css` (prefer existing class names).  
4. **Language strings** – pairs of `<span data-lang="lv">` / `data-lang="en"`.  
5. After upload, test LV/EN, dark mode, mobile menu, download modal, and cookie banner in a private window.

---

## Hosting checklist (Garmtech)

- [ ] Files in site root (`httpdocs` / document root)  
- [ ] `.htaccess` present (hidden files visible)  
- [ ] `assets/logo.jpg` (and optional `hero.jpg`) uploaded  
- [ ] SSL for `wazers.lv` and `www.wazers.lv`  
- [ ] Index file = `index.html`  
- [ ] Preferred domain set (one host, redirect the other)  
- [ ] 404 → `/404.html` if the panel has Error Pages  

---

Made for the Waze Latvija community · 2026
