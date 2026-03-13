# Institute of Digital Risk (IDR) --- Assignment Submission

------------------------------------------------------------------------

## Logo Design Notes

### Concept Behind the Logo

For the IDR logo, I chose an **isometric cube** as the main symbol. The
cube represents structure, layers, and depth. Since digital risk is
rarely one-dimensional, the cube visually reflects how risks often exist
across multiple layers --- such as **technical systems, organisational
processes, and regulatory considerations**. The 3D form helps
communicate that idea of complexity in a simple visual way.

### Colour Approach

The cube uses **three shades of orange** to create depth and visual
contrast:

-   **#B84000** --- darker tone used on the shadow side\
-   **#E8590C** --- the main brand orange on the top face\
-   **#FF7A35** --- a lighter tone used for the lit face

Using these variations helps the icon feel more dimensional instead of
flat. Orange was selected intentionally because it conveys **alertness,
urgency, and energy**, which fits well with a digital risk and
cybersecurity context. It also helps the brand stand apart from the
typical blue colour schemes used by many security companies.

### Typography

The abbreviation **"IDR"** uses the **Syne** typeface in a heavier
weight (800). The geometric structure of the font helps give the brand a
modern yet institutional feel.

The full name **"Institute of Digital Risk"** is placed below in a
lighter weight with increased letter spacing. This keeps the focus on
the IDR abbreviation while still clearly communicating the full
organisation name.

### Small-Size Legibility

One design goal was to make sure the icon works well even at very small
sizes, such as a **favicon (16×16px)**. The cube shape remains
recognisable because its three faces still read clearly. A subtle
vertical divider between the icon and wordmark also helps keep the
layout clean when used in headers or email signatures.

------------------------------------------------------------------------

## Dark Mode & Light Mode

The interface supports both **dark mode and light mode** to provide a
comfortable viewing experience in different environments.

-   **Dark Mode (default)** is designed for modern UI aesthetics and
    reduces eye strain in low‑light conditions.
-   **Light Mode** provides a cleaner appearance for bright environments
    or daytime usage.
-   A **theme toggle button** allows users to switch between the two
    modes instantly.
-   The theme preference is preserved so that the selected mode remains
    active when the user revisits the page.
-   CSS variables are used to manage colours, making the theme switching
    efficient and maintainable.

------------------------------------------------------------------------

## Project Structure

    idr-assignment/
    ├── index.html        — Semantic HTML5 homepage
    ├── styles.css        — Complete CSS (no frameworks)
    ├── script.js         — Vanilla JavaScript
    ├── logo-icon.svg     — Logo icon-only variant
    ├── logo-full.svg     — Logo with text variant
    └── README.md         — Project documentation

------------------------------------------------------------------------

## Technical Implementation

  -----------------------------------------------------------------------
  Requirement                         Implementation
  ----------------------------------- -----------------------------------
  Semantic HTML                       Uses HTML5 elements like
                                      `<header>`, `<nav>`, `<main>`,
                                      `<section>`, `<article>`, and
                                      `<footer>`

  CSS Approach                        Pure CSS without frameworks, using
                                      custom properties, Grid, and
                                      Flexbox

  Sticky Navigation                   Implemented with `position: fixed`
                                      and a scroll state class
                                      `.is-scrolled`

  Smooth Scrolling                    JavaScript based scrolling with nav
                                      height offset and CSS
                                      `scroll-padding-top` fallback

  Responsive Layout                   Mobile-first design with
                                      breakpoints at **1024px, 768px, and
                                      480px**

  Accessibility                       Text colours tested to maintain
                                      **WCAG AA contrast** on dark
                                      backgrounds

  Interactive States                  Hover states added for buttons,
                                      links, cards, and service elements

  Form Validation                     Inline validation with error
                                      messages using `blur` and `input`
                                      events along with ARIA attributes

  Scroll Animations                   Implemented with
                                      `IntersectionObserver` and
                                      staggered reveal effects

  JavaScript                          Written in **Vanilla JS**, wrapped
                                      in an IIFE and using `'use strict'`
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## Notes

This project was built as part of the **IDR assignment** using only
**HTML, CSS, and Vanilla JavaScript** without any frameworks or external
UI libraries.\
The goal was to keep the implementation clean, accessible, and easy to
maintain while meeting the design and interaction requirements.
