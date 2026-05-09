# We Care English School — Website

A modern, responsive 7-page static website for We Care English School, designed with the rich, image-driven aesthetic of established Indian school websites (inspired by sites like Carmel School and Holy Infant School).

## Pages

- `index.html` — Homepage with rotating hero, welcome strip, about preview, stats, programmes, news, and testimonial
- `about.html` — Vision, mission, principal's message, and school history
- `admissions.html` — Process steps, eligibility, documents, and important dates
- `academics.html` — Tabbed view of all curriculum stages, plus co-curricular cards
- `facilities.html` — 9 facility cards plus safety section
- `gallery.html` — Filterable photo grid with built-in lightbox
- `contact.html` — Info card, contact form, and embedded map

## Design

- **Fonts:** Playfair Display (display serif) + Poppins (body sans)
- **Palette:** Deep navy (#0a2a5e) and warm gold (#c8a04a) on a cream background
- **Layout:** Image-heavy, with photo collages, parallax stat bands, and full-bleed image hero
- **Animations:** Auto-rotating hero, animated counters, scroll-reveal, and gentle hover transitions

## How to Run

The site is purely static — HTML, CSS, and JavaScript. You can open it in three ways:

### Option 1: Python (recommended)

```bash
cd we-care-school
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

### Option 2: VS Code Live Server

Open the folder in VS Code, install the "Live Server" extension, then right-click `index.html` → "Open with Live Server".

### Option 3: Open directly

You can simply double-click `index.html` to open it in your browser. Some features may behave slightly differently when opened from the file system (file:// URLs) vs. served over HTTP.

## File Structure

```
we-care-school/
├── index.html
├── about.html
├── admissions.html
├── academics.html
├── facilities.html
├── gallery.html
├── contact.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    └── README.txt
```

## Customisation Notes

- **Photos** are loaded from Unsplash via direct URLs. To use your own photos, place them in the `images/` folder and update the `src` and `data-full` attributes.
- **Colors** can be tuned via CSS variables at the top of `css/styles.css` (`:root` block).
- **Contact form** is currently client-side only (validation + success message). To wire it to a backend, hook into the form's submit handler in `js/main.js`.
- **Map** uses a generic Google Maps embed for Anna Nagar, Chennai. Replace the `<iframe>` `src` in `contact.html` with one for your actual location.
