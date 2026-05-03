# Plan 04 — `src/styles/components.css`

## Goal

Style every reusable component: buttons, rating chip, card, the decorative
display word, hero typography block, contact row, hours table.

## Inputs

- `docs/design.md` §4, §7
- Tokens from `src/styles/tokens.css`

## Stack note + class-name contract

CSS only. React components in plan 07 consume these classes via plain
`className` strings (no CSS modules, no `clsx`).

| Class | Component | Notes |
|---|---|---|
| `.btn .btn--primary` | `<Button variant="primary">` | min 44 px tap target |
| `.btn .btn--ghost`   | `<Button variant="ghost">`   | bordered |
| `.btn--block`        | `<Button block>`             | full-width modifier |
| `.rating`            | `<RatingChip />`             | wraps `<a>` |
| `.card`              | `<Card />`                   | section card |
| `.hero-card`, `.deco`, `.cta-row` | `<HeroCard />`     | hero text block |
| `.treatments`        | `<Treatments />`             | grid of `<li>` |
| `.hours`             | `<HoursTable />`             | `<table>` |
| `.contact-row`       | `<ContactRow />`             | btn flex-row |

## Output

- `src/styles/components.css` (≤ 180 lines)

## Component recipes

### Buttons

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: .875rem 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  font: 600 var(--fs-body)/1 var(--font-body);
  text-decoration: none;
  transition: background-color .18s ease, color .18s ease, box-shadow .18s ease;
  min-height: 44px;
}
.btn--primary {
  background: var(--brand);
  color: var(--bg);
}
.btn--primary:hover,
.btn--primary:focus-visible {
  background: var(--brand-2);
  box-shadow: var(--shadow-2);
}
.btn--ghost {
  background: transparent;
  color: var(--ink);
  border-color: var(--line);
}
.btn--ghost:hover { background: var(--soft); }
.btn--block { width: 100%; justify-content: center; }
```

### Rating chip

```css
.rating {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: .5rem .875rem;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-pill);
  font-size: var(--fs-sm);
  text-decoration: none;
  color: var(--ink);
  box-shadow: var(--shadow-1);
}
.rating .star { color: var(--star); font-size: 1rem; }
.rating .score { font-weight: 700; }
.rating .label { color: var(--muted); }
```

### Card

```css
.card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
  padding: var(--space-5);
}
.card h3 { margin-block-end: var(--space-2); }
.card p { color: var(--muted); }
```

### Hero block

```css
.hero-card {
  position: relative;
  max-width: 38rem;
  display: grid;
  gap: var(--space-4);
}
.hero-card .deco {
  position: absolute;
  top: -1.4rem;
  inset-inline-start: -.25rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(3rem, 14vw, 5.5rem);
  color: var(--brand);
  opacity: .18;
  transform: rotate(-3deg);
  pointer-events: none;
  user-select: none;
}
.hero-card h1 { letter-spacing: -.01em; }
.hero-card p.lead { font-size: 1.125rem; color: var(--ink); max-width: 32rem; }
.hero-card .cta-row {
  display: flex; flex-wrap: wrap; gap: var(--space-3);
  margin-block-start: var(--space-2);
}
.hero-card .meta {
  font-size: var(--fs-sm);
  color: var(--muted);
}
```

### Treatment list

```css
.treatments {
  display: grid;
  gap: var(--space-4);
  list-style: none;
  padding: 0;
}
@media (min-width: 768px) {
  .treatments { grid-template-columns: 1fr 1fr; gap: var(--space-5); }
}
.treatments li {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}
.treatments strong {
  display: block;
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  margin-block-end: var(--space-1);
}
```

### Hours table

```css
.hours {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}
.hours th, .hours td {
  text-align: start;
  padding: var(--space-3) var(--space-4);
  border-block-end: 1px solid var(--line);
}
.hours tr:last-child th, .hours tr:last-child td { border-block-end: 0; }
.hours .closed { color: var(--muted); }
```

### Contact row (in-flow, repeated near footer)

```css
.contact-row {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
.contact-row .btn { flex: 1 1 12rem; }
```

## Acceptance

- `wc -l src/styles/components.css` ≤ 180.
- Every component above renders in a smoke-test HTML that imports tokens +
  base + layout + components. Tap-targets ≥ 44 × 44 px.
- `grep -E 'linear-gradient|radial-gradient|conic-gradient' src/styles/components.css`
  returns nothing.

## Out of scope: FAB (plan 05); HTML assembly (plans 07, 08).
