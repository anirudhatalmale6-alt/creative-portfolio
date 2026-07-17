# Creative Portfolio Website

A fast, hand-coded single-page portfolio — minimalist design, bold typography,
smooth scroll animations, a dark/light mode toggle, an interactive project
showcase, an animated skills section, and a quick-contact form.

No frameworks, no build step. Just open `index.html`.

## File structure

```
.
├── index.html        # All page content / sections
├── css/
│   └── styles.css    # All styling. Theme colors live at the top (:root)
├── js/
│   └── main.js       # Theme toggle, scroll animations, skill bars, form
├── assets/           # Put your logo, favicon, og-image here
└── README.md
```

The structure is intentionally simple so you can add an **About Me** page or a
**full Project Showcase** later without reworking anything.

## Quick edits — the 5-minute guide

### 1. Your name & branding
Open `index.html`, search for `Your Name` and replace everywhere. Swap the
`◆` logo mark for your logo image inside the `.logo` link:
```html
<a href="#hero" class="logo"><img src="assets/logo.svg" alt="Your Name" /></a>
```

### 2. Colors (whole-site theme)
Open `css/styles.css`. Everything is driven by variables at the very top:
```css
:root {
  --accent:   #6c5ce7;   /* your main brand color */
  --accent-2: #a29bfe;   /* lighter accent for gradients */
  ...
}
```
Change `--accent` and the buttons, links, highlights and gradients all update.
Light-mode colors are in the `html[data-theme="light"]` block just below.

### 3. Projects
In `index.html`, find the `Selected Work` section. Copy any `<article class="work-card">`
block to add a project. Change the title, description, tags, the link `href`,
and the `--card-accent` color on `.work-thumb`. To use a real image instead of
the gradient, replace the `<div class="work-thumb">` with an `<img>`.

### 4. Skills
In the `Skills` section, each skill is one `.skill` block. Edit the label and
set `data-level` (0–100) — the bar animates to that value on scroll. Keep the
`skill-pct` text in sync.

### 5. Contact details
In the `Contact` section, edit the email, phone, location and social links.

### 6. Making the form deliver to your email
The form supports two options — pick one:

- **Formspree (recommended, no server needed):** create a free form at
  formspree.io, then paste your endpoint into the form's `action` in
  `index.html`:
  ```html
  <form ... action="https://formspree.io/f/XXXXXXX" method="POST">
  ```
- **Mailto fallback (zero setup):** if you leave the placeholder action as-is,
  the form opens the visitor's email app pre-filled to your address. Set your
  address in `js/main.js` (search for `you@example.com`).

## SEO
Basic on-page SEO is already in `<head>` — edit the `<title>`, meta
`description`, `author`, and the Open Graph tags for social sharing. Drop an
`og-image.png` (1200×630) into `assets/` for nice link previews.

## Accessibility & performance
- Respects `prefers-reduced-motion` (animations disable for users who opt out).
- Semantic HTML, keyboard-focusable cards, labelled form fields.
- No external JS libraries — loads fast.
