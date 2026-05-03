# Plan 02 — `src/styles/tokens.css` + `src/styles/base.css`

## Goal

Land the design tokens (colors, type, spacing, radii, shadows) and the base
layer (reset, typography, body) so every later CSS file consumes the same
variables.

## Inputs

- `docs/design.md` §1–§3
- Fonts already in `public/fonts/` from plan 01.

## Stack note

The two CSS files live under `src/styles/` and are imported from
`src/main.tsx`. `@font-face src` paths use `/fonts/<file>.woff2` (Vite
serves `public/` at the URL root).

## Outputs

- `src/styles/tokens.css` (≤ 80 lines)
- `src/styles/base.css` (≤ 120 lines)

## `src/styles/tokens.css` skeleton

```css
:root {
  /* color */
  --bg: hsl(36 30% 96%);
  --surface: hsl(0 0% 100%);
  --ink: hsl(150 20% 15%);
  --muted: hsl(150 10% 40%);
  --soft: hsl(36 25% 90%);
  --line: hsl(36 20% 85%);
  --brand: hsl(155 28% 32%);
  --brand-2: hsl(155 35% 45%);
  --accent: hsl(35 55% 78%);
  --star: hsl(43 90% 56%);

  /* shadow */
  --shadow-1: 0 1px 2px hsl(155 30% 20% / .06),
              0 8px 24px -10px hsl(155 30% 20% / .14);
  --shadow-2: 0 18px 40px -12px hsl(155 35% 30% / .35);

  /* radii */
  --radius-sm: .5rem;
  --radius-md: .75rem;
  --radius-lg: 1rem;
  --radius-pill: 9999px;

  /* type */
  --font-display: 'Newsreader', Georgia, serif;
  --font-body:    'Manrope', system-ui, sans-serif;
  --fs-hero: clamp(2.25rem, 8vw, 3.5rem);
  --fs-h2:   clamp(1.5rem, 5vw, 2rem);
  --fs-h3:   1.25rem;
  --fs-body: 1rem;
  --fs-sm:   .875rem;
  --fs-xs:   .75rem;
  --lh-tight: 1.15;
  --lh-body:  1.6;

  /* space */
  --space-1: .25rem;  --space-2: .5rem;  --space-3: .75rem;
  --space-4: 1rem;    --space-5: 1.5rem; --space-6: 2rem;
  --space-7: 3rem;    --space-8: 4rem;   --space-9: 6rem;
  --space-10: 8rem;
  --container: 64rem;
  --gutter: var(--space-5);
}
```

## `src/styles/base.css` outline

In this order:

1. **`@font-face`** declarations — three faces:
   - `Newsreader` (roman, `font-style: normal`, `font-weight: 400 700`,
     `src: url('public/fonts (served at /fonts/) — newsreader-variable.woff2') format('woff2-variations')`,
     `font-display: swap`).
   - `Newsreader` (italic, same range, `font-style: italic`).
   - `Manrope` (roman, `font-weight: 400 700`).
2. **Reset** (modern minimal):
   ```css
   *, *::before, *::after { box-sizing: border-box; }
   * { margin: 0; }
   html { -webkit-text-size-adjust: 100%; }
   img, picture, svg { display: block; max-width: 100%; }
   ```
3. **Body**:
   ```css
   body {
     min-height: 100svh;
     font-family: var(--font-body);
     font-size: var(--fs-body);
     line-height: var(--lh-body);
     color: var(--ink);
     background: var(--bg);
     -webkit-font-smoothing: antialiased;
   }
   ```
4. **Headings** — `font-family: var(--font-display); line-height:
   var(--lh-tight); font-weight: 600;`. Set `h1` to `var(--fs-hero)`, `h2`
   to `var(--fs-h2)`, `h3` to `var(--fs-h3)`.
5. **Links** — `color: var(--brand);` `text-decoration-thickness: 1px;`
   `text-underline-offset: 0.2em;` Visited stays the same.
6. **`:focus-visible`** — `outline: 2px solid var(--brand-2); outline-offset:
   2px;`
7. **Eyebrow utility**:
   ```css
   .eyebrow { font-size: var(--fs-xs); letter-spacing: .08em;
              text-transform: uppercase; font-weight: 600; color: var(--muted); }
   ```
8. **Reduced motion guard**:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: .001ms !important;
       transition-duration: .001ms !important;
     }
   }
   ```

## Acceptance

- `wc -l src/styles/tokens.css` ≤ 80; `wc -l src/styles/base.css` ≤ 120.
- `grep -E 'linear-gradient|radial-gradient|conic-gradient' src/styles/*.css` returns nothing.
- Loading both files in a test page shows correct fonts and the cream
  background.

## Out of scope

- Layout (plan 03).
- Components and buttons (plan 04).
- FAB (plan 05).
