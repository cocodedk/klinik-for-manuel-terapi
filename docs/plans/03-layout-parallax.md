# Plan 03 — `src/styles/layout.css`

## Goal

Page skeleton: container, sections, sticky header, footer, and the mobile-
safe parallax background layer. Mobile-first, only `min-width` queries.

## Inputs

- `docs/design.md` §3, §6
- Tokens from `src/styles/tokens.css` (plan 02)

## Stack note

Imported from `src/main.tsx` after `tokens.css` and `base.css`. The
`.parallax` div is rendered once by `App.tsx`, outside the route outlet.
Image URLs (`/img/hero-*.jpg`) resolve from `public/img/`.

## Output

- `src/styles/layout.css` (≤ 120 lines)

## Skeleton

```css
/* ---------- container ---------- */
.container {
  width: 100%;
  max-width: var(--container);
  padding-inline: var(--gutter);
  margin-inline: auto;
}

/* ---------- parallax background layer ---------- */
.parallax {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--bg) url('/img/hero-800.jpg') center/cover no-repeat;
}
@media (min-width: 768px) {
  .parallax {
    background-image: url('/img/hero-1600.jpg');
  }
}

/* hero overlay so text passes WCAG AA on the photo */
.hero {
  position: relative;
  isolation: isolate;
  padding-block: var(--space-9) var(--space-9);
}
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: hsl(36 30% 96% / .72);  /* var(--bg) at 72% */
  z-index: -1;
}

/* ---------- sticky header ---------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: hsl(36 30% 96% / .85);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-block-end: 1px solid var(--line);
}
.site-header > .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding-block: var(--space-3);
}
.site-header a.logo {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.125rem;
  text-decoration: none;
  color: var(--ink);
}
.site-header nav.lang {
  display: flex;
  gap: var(--space-3);
  font-size: var(--fs-sm);
}
.site-header nav.lang a {
  text-decoration: none;
  color: var(--muted);
}
.site-header nav.lang a[aria-current='page'] {
  color: var(--ink);
  font-weight: 600;
}

/* ---------- main + sections ---------- */
main { display: block; }
section {
  padding-block: var(--space-9);
}
@media (min-width: 768px) {
  section { padding-block: var(--space-10); }
}
section.alt { background: var(--soft); }

/* two-column rhythm only at ≥ 768 */
.cols-2 { display: grid; gap: var(--space-6); }
@media (min-width: 768px) {
  .cols-2 { grid-template-columns: 1fr 1fr; gap: var(--space-7); }
}

/* ---------- footer ---------- */
.site-footer {
  background: var(--ink);
  color: var(--bg);
  padding-block: var(--space-7);
  font-size: var(--fs-sm);
}
.site-footer a { color: var(--bg); }
.site-footer p { margin-block-end: var(--space-2); }
```

## Notes

- `position: fixed` on `.parallax` is the mobile-safe substitute for
  `background-attachment: fixed` (broken on iOS Safari). Foreground content
  scrolls; the photo stays put.
- The hero `::before` overlay uses a semi-transparent solid (no gradient).
- `backdrop-filter` is not a gradient.
- Section padding scales up at ≥ 768 px only; mobile-first stays compact.

## Acceptance

- `wc -l src/styles/layout.css` ≤ 120.
- `grep -E 'linear-gradient|radial-gradient|conic-gradient' src/styles/layout.css`
  returns nothing.
- A test page with `tokens` + `base` + `layout` shows: cream background,
  fixed photo behind content, sticky translucent header, alternating sections.

## Out of scope

- Component visuals (plan 04).
- FAB (plan 05).
- JS-driven parallax differential (plan 05 may add as enhancement).
