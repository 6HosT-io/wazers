# Waze Latvija Community Website (Static)

Fast, clean static website for the Waze Latvia community.  
**Domain:** https://www.wazers.lv/

## Features

- Fully responsive (desktop + mobile)
- Bilingual (Latvian default + English) with persistent language switcher
- Dark mode – follows system/OS preference + manual 🌙/☀️ toggle (preference is saved)
- Live Waze Map embed on homepage
- Facebook Page timeline embed from https://www.facebook.com/WazeLV (Jaunumi page)
- Maintenance / Work in Progress mode (one-line toggle)
- Custom 404 page (“Kaut kas nogāja greizi”)
- Contact form (mailto by default + easy Formspree upgrade)
- Very lightweight – no build step required

---


## Clean URLs (no /index.html in the address bar)

The site includes a `.htaccess` file so addresses look like:

| Old | New |
|-----|-----|
| `https://wazers.lv/index.html` | `https://wazers.lv/` |
| `https://wazers.lv/jaunumi.html` | `https://wazers.lv/jaunumi` |
| `https://wazers.lv/notikumi.html` | `https://wazers.lv/notikumi` |
| `https://wazers.lv/kontakts.html` | `https://wazers.lv/kontakts` |
| … | … |

**What you need to do:**
1. Upload the `.htaccess` file to the **same folder** as `index.html` (website root).
2. Make sure Apache `mod_rewrite` is enabled (on Garmtech/Plesk it usually is by default).
3. Clear browser cache and open `https://wazers.lv/` — it should no longer show `/index.html`.

If your hosting uses **Nginx** instead of Apache, `.htaccess` is ignored. In that case, in Plesk go to:
**Domains → wazers.lv → Apache & nginx Settings → Additional nginx directives**
and paste:

```nginx
location / {
  try_files $uri $uri.html $uri/ /index.html;
}
error_page 404 /404.html;
```

Internal links in the site already point to clean URLs (`/`, `/jaunumi`, `/kontakts`, etc.).


## How to enable / disable Maintenance Mode

1. Open the file `js/config.js`
2. Find this line:
   ```js
   MAINTENANCE_MODE: false,
   ```
3. Change it to:
   ```js
   MAINTENANCE_MODE: true,
   ```
4. Save the file and upload it to the server.

**Result:**  
All visitors are automatically redirected to `maintenance.html`.  
The maintenance page shows:
- “Darbs notiek / Work in Progress”
- Link to Facebook @WazeLV (with Facebook logo)
- Email: wazelatvia@gmail.com

To turn the site back on, set `MAINTENANCE_MODE` back to `false` and upload the file again.

---

## How to set up a better contact form (Formspree)

The contact form currently opens the visitor’s email client (mailto).  
To receive messages directly in your inbox without that step:

1. Go to https://formspree.io and create a free account
2. Create a new form
3. Copy the endpoint URL (it looks like `https://formspree.io/f/xxxxxxxx`)
4. Open `js/config.js` and paste it here:
   ```js
   FORMSPREE_ENDPOINT: 'https://formspree.io/f/xxxxxxxx',
   ```
5. Save and upload the file

The form will now send messages directly to the email you configured in Formspree.

---

## How to set the 404 page (Garmtech / Plesk)

1. Log in to your Plesk panel
2. Go to **Error Pages** (or Apache & nginx settings → Error Documents)
3. Set the 404 error document to: `/404.html`

The 404 page keeps the normal header and footer so visitors can still navigate the site.  
Main message: **“Kaut kas nogāja greizi”** / “Something went wrong”.

---

## Performance notes (already applied)

- Tailwind CSS via CDN
- Preconnect for Google Fonts
- Facebook SDK loaded asynchronously
- Minimal custom CSS
- No heavy frameworks or build tools

---

## Security notes

- Pure static site → no server-side code, no database, no PHP
- No user input is processed on the server
- Only expected third-party scripts: Tailwind CDN, Google Fonts, Facebook SDK
- Keep HTTPS enabled (you already have SSL on Garmtech)
- Form is completely client-side until you add Formspree
- No passwords, API keys or sensitive data are stored in the code

---

## File structure

```
wazers-lv/
├── index.html              ← Homepage (Galvena)
├── jaunumi.html            ← News + Facebook feed
├── notikumi.html           ← Events
├── svariga.html            ← Important information
├── palidziba.html          ← Help / FAQ
├── kontakts.html           ← Contact form
├── maintenance.html        ← Work in Progress page
├── 404.html                ← Error page
├── css/
│   └── style.css
├── js/
│   ├── config.js           ← ← EDIT THIS FILE for maintenance & Formspree
│   └── main.js
└── README.md
```

---


## CSS class structure (short & clear)

| Class | Purpose |
|-------|---------|
| `page` + `page-home` / `page-news` … | Body |
| `wrap` | Max-width container |
| `row` / `row-between` / `row-center` | Flex rows |
| `col` | Flex column |
| `grid-2` / `grid-3` / `grid-4` | Responsive grids |
| `site-header` / `site-footer` | Header & footer |
| `logo` / `nav` / `header-actions` | Header parts |
| `lang-switch` / `lang-btn` | Language toggle |
| `menu-btn` / `mobile-menu` | Mobile menu |
| `btn` / `btn-blue` / `btn-red` / `btn-sm` / `btn-icon` | Buttons |
| `main-banner` / `main-banner-title` / `main-banner-subtitle` | Homepage banner |
| `section-stats` / `section-map` / `section-cards` / `section-partners` | Homepage sections |
| `stat-num` / `stat-label` | Stats |
| `card` / `card-icon` / `card-title` / `card-text` | Cards |
| `event` / `event-date` / `event-body` | Event rows |
| `badge` / `badge-green` / `badge-amber` / `badge-gray` | Status badges |
| `page-content` / `page-title` / `page-intro` | Inner pages |
| `waze-map` | Live map |
| `form-group` / `form-label` / `form-input` / `form-note` | Forms |
| `info-box` | Info panels |
| `footer-grid` / `footer-brand` / `footer-title` / `footer-links` / `footer-copy` | Footer |
| `text-blue` / `text-red` | Brand colors |
| `partner-list` / `partner-item` | Partners |


## Colors

- **Waze Blue:** `#0099FF`
- **Latvian Red:** `#9E3039`


---

## How to add your logo

1. Upload your logo PNG file to the `assets/` folder
2. Name it exactly: **`logo.png`**
3. It will automatically appear next to “Waze Latvija” in the header on all pages
4. Recommended size: height around 32–40px (it will be scaled with CSS `h-8`)

If the logo does not appear, check the filename is exactly `logo.png` (lowercase) and that it is inside the `assets` folder.

---

## How to change the homepage banner background

1. Upload your banner image to the `assets/` folder
2. Name it **`hero.jpg`** (or `hero.png`)
3. The homepage hero section will use it automatically

You can also edit the background directly in `index.html` – look for the line:
```html
style="background-image: url('assets/hero.jpg');"
```

---

Made for the Waze Latvija community · 2026
