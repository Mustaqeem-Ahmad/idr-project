# Institute of Digital Risk (IDR) — Assignment Submission

---

## Logo Design Note

**Design Symbolism**
The IDR logo uses an isometric cube as its primary mark — a geometric form that evokes structure, layered complexity, and three-dimensional thinking. In the context of digital risk, the cube represents the multi-dimensional nature of cyber and AI risk: technical, organisational, and regulatory layers that must all be understood together.

**Colour Choices**
The three visible faces of the cube are rendered in distinct orange tones — from a deep burnt orange on the shadow face (#B84000) through the primary brand orange (#E8590C) on the top face to a lighter warm orange (#FF7A35) on the lit face. This deliberate light-to-shadow progression reinforces depth and avoids the flatness of a single-colour icon. Orange was chosen for its association with alertness, energy, and urgency — appropriate for a risk-focused institution — while remaining distinct from the blue palettes that dominate the cybersecurity space.

**Typography**
The abbreviation "IDR" is set in Syne (weight 800) — a geometric display typeface with strong, considered letterforms that feel institutional without being corporate. The full name "Institute of Digital Risk" is set in a lighter weight with generous letter-spacing, functioning as a descriptive subtitle rather than competing with the abbreviation.

**Legibility at Small Sizes**
The cube icon is designed to remain recognisable at favicon scale (16×16px and above) because its three-faced structure reads as a coherent shape even at very small sizes. The vertical separator between icon and wordmark ensures the two elements don't blur together in the header or email signatures.

---

## Files

```
idr-assignment/
├── index.html        — Semantic HTML5 homepage
├── styles.css        — Complete CSS (no frameworks)
├── script.js         — Vanilla JavaScript
├── logo-icon.svg     — Logo icon-only variant
├── logo-full.svg     — Logo with text variant
└── README.md         — This file
```

---

## Technical Decisions

| Requirement | Implementation |
|---|---|
| Semantic HTML5 | `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<address>` |
| No CSS framework | Pure CSS with custom properties, Grid & Flexbox |
| Sticky navigation | `position: fixed` + JS scroll class `.is-scrolled` |
| Smooth scrolling | JS-driven with nav-height offset, `scroll-padding-top` fallback |
| Mobile responsive | Mobile-first breakpoints at 1024px, 768px, 480px |
| Accessible contrast | All text passes WCAG AA against dark backgrounds |
| Hover states | Buttons, nav links, cards, service tags, pipeline steps |
| Form validation | Inline error messages, live `blur`/`input` validation, aria attributes |
| Scroll reveal | `IntersectionObserver` with staggered delays, graceful fallback |
| No JS frameworks | Vanilla JS, wrapped in IIFE, `'use strict'` |

---

## Usage

Open `index.html` in any modern browser.
All three files (`index.html`, `styles.css`, `script.js`) must remain in the same directory.
No build step, server, or dependencies required.
