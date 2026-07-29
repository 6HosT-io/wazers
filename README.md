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

## Colors

- **Waze Blue:** `#0099FF`
- **Latvian Red:** `#9E3039`

---

Made for the Waze Latvija community · 2026
