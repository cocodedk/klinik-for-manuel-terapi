# Design System

Calm Clinical Nordic — warm sand and forest green, generous breathing room,
editorial italic display headings on a humanist sans body, anchored by a
single restful body-photo as the parallax background. Solid fills only; no
gradients. Light theme only (no dark mode in v1).

## 1 · Color tokens (light)

Lifted from `booking-ease-connect/site/assets/index-DhINzNks.css` light theme;
gradient tokens removed.

```css
--bg:        hsl(36 30% 96%);   /* warm cream page background */
--surface:   hsl(0  0% 100%);   /* card / panel */
--ink:       hsl(150 20% 15%);  /* primary text */
--muted:     hsl(150 10% 40%);  /* secondary text */
--soft:      hsl(36 25% 90%);   /* alt section bg */
--line:      hsl(36 20% 85%);   /* hairline borders */
--brand:     hsl(155 28% 32%);  /* forest green */
--brand-2:   hsl(155 35% 45%);  /* hover state for brand */
--accent:    hsl(35 55% 78%);   /* warm sand — used sparingly */
--star:      hsl(43 90% 56%);   /* rating star fill */
--shadow-1:  0 1px 2px hsl(155 30% 20% / .06),
             0 8px 24px -10px hsl(155 30% 20% / .14);
--shadow-2:  0 18px 40px -12px hsl(155 35% 30% / .35);
```

Forbidden: `linear-gradient`, `radial-gradient`, `conic-gradient`,
`background-image: linear-gradient(...)` — anywhere.

## 2 · Typography

Self-hosted variable WOFF2 in `/fonts/`:

- **Display**: Newsreader (variable wght 400–700, italic + roman). Editorial,
  calm; the italic carries the personality without raising the noise floor.
- **Body**: Manrope (variable wght 400–700). Friendly geometric humanist,
  Danish-friendly diacritic coverage.

```css
--font-display: 'Newsreader', Georgia, serif;
--font-body:    'Manrope', system-ui, sans-serif;
```

Scale (mobile-first; `clamp` lets it grow on desktop):

| Token | Value | Use |
|---|---|---|
| `--fs-hero` | `clamp(2.25rem, 8vw, 3.5rem)` | h1 |
| `--fs-h2`   | `clamp(1.5rem, 5vw, 2rem)`     | section h2 |
| `--fs-h3`   | `1.25rem`                       | card heading |
| `--fs-body` | `1rem`                           | body |
| `--fs-sm`   | `0.875rem`                       | meta, footer |
| `--fs-xs`   | `0.75rem`                        | eyebrow, label |
| `--lh-tight`| `1.15`                           | display |
| `--lh-body` | `1.6`                            | paragraphs |

Eyebrow / labels: `--fs-xs`, uppercase, letter-spacing `0.08em`, weight 600.

## 3 · Spacing & layout

```css
--space-1: .25rem; --space-2: .5rem; --space-3: .75rem; --space-4: 1rem;
--space-5: 1.5rem; --space-6: 2rem; --space-7: 3rem; --space-8: 4rem;
--space-9: 6rem;  --space-10: 8rem;
--container: 64rem;        /* 1024 px */
--gutter: var(--space-5);
--radius-sm: .5rem; --radius-md: .75rem; --radius-lg: 1rem;
--radius-pill: 9999px;
```

Container: max-width `var(--container)`, padding inline `var(--gutter)`,
margin auto. Single column on mobile; two-column grids only at ≥ 768 px.

Section vertical rhythm: `padding-block: var(--space-9)` (mobile),
`var(--space-10)` (desktop). Alternating sections may use `--soft` background
to add depth without gradient.

## 4 · Components

- **Button (primary, "Bestil tid")** — `--brand` fill, white text, radius
  `--radius-md`, padding `0.875rem 1.25rem`, weight 600. Hover/focus: bg
  `--brand-2`, shadow-2. Visible focus ring `2px solid var(--brand-2)` with
  `2px` offset.
- **Button (ghost)** — transparent, `1px` `--line` border, ink text. Hover:
  `--soft` fill.
- **Rating chip** — pill, `--surface` bg, `1px --line` border, padding
  `.5rem .875rem`, ★ in `--star`, "4.9" Manrope 700, " · Google" muted.
- **Card** — `--surface`, `--radius-lg`, `--shadow-1`, padding `--space-5`.
- **Hero overlay** — pinned background photo + a translucent layer of
  `--bg / .72` so the hero text passes WCAG AA.
- **FAB cluster** — bottom-right, `position: fixed`, `inset-block-end:
  var(--space-5)`, `inset-inline-end: var(--space-5)`, `gap: var(--space-3)`,
  `flex-direction: column`. Primary "Bestil tid" is a wider pill; phone +
  email are 56-px circles. Tap-target ≥ 44 px.
- **Header** — sticky, `--bg` at 85 % opacity with `backdrop-filter: blur(10px)`
  (allowed; not a gradient). `1px --line` bottom border.
- **Footer** — `--ink` background, `--bg` text, small typography.

## 5 · Motion

- Hero fade-up on load: 600 ms ease-out, stagger 80 ms across heading →
  rating → CTAs.
- FAB enter: 250 ms cubic-bezier translate-up + fade once observer fires.
- Button bg transition: 180 ms.
- All motion wrapped in `@media (prefers-reduced-motion: no-preference)`.

## 6 · Hero photography

Mobile-first parallax: a `<div class="parallax">` is `position: fixed; inset:
0; z-index: -1;` with `background-image` cover-positioned. Foreground content
scrolls over it — works on iOS Safari (`background-attachment: fixed` does
not). Optional: at `min-width: 1024px`, add a tiny `transform: translate3d(0,
calc(var(--scroll) * -.2px), 0)` via the existing `interactions.js` to give a
real parallax differential.

Image criteria — pick one in plan #01:

- Calm, soft natural light; muted greens / warm neutrals.
- No people's faces (avoids dating + any model-release ambiguity).
- Hands-on-body or empty Scandinavian treatment room work well.
- 16:9 horizontal preferred; centerable focal point.

Two candidate Unsplash search URLs:

- https://unsplash.com/s/photos/manual-therapy
- https://unsplash.com/s/photos/scandinavian-treatment-room

Once chosen: download the largest version, downscale locally to 1600 × 900
and 800 × 450, save as `img/hero-1600.jpg` and `img/hero-800.jpg` (q ≈ 75
JPEG). Credit goes in the footer.

## 7 · Differentiation hook

One memorable detail: an oversized italic Newsreader word — `Bevægelse` (DA)
or `Movement` (EN) — sits above the hero h1, rotated `-3deg`, color
`--brand`, opacity `.18`, position `absolute` top-left of the hero card,
`pointer-events: none`. Single decorative flourish; the rest of the page
stays calm.

## 8 · Accessibility checks (locked)

- Body text contrast ≥ 4.5 against the photo overlay color.
- Tap-targets ≥ 44 × 44 px (FABs are 56).
- Visible focus rings on all interactive elements.
- `<html lang>` set per document; alternates declared.
- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>` for the lang
  switch.
- Reduced-motion path tested.
