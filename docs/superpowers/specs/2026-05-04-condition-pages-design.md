# Condition pages — design spec

**Date:** 2026-05-04

## Goal

6 condition-specific landing pages (DA + EN) targeting local searches for the most common
treatment areas. Each maps to one of the 6 existing treatment cards on the home page.
Treatment cards become clickable links. One generic page component, data-driven.

---

## URL structure

| Treatment card | DA route | EN route |
|---|---|---|
| Spændinger og stive muskler | `/nakkesmerter` | `/en/neck-pain` |
| Låste led | `/laaste-led` | `/en/locked-joints` |
| Smerter i bevægeapparatet | `/smerter-i-bevaegelse` | `/en/musculoskeletal-pain` |
| Spændingshovedpine | `/spaendingshovedpine` | `/en/tension-headache` |
| Genoptræning og kropsbevidsthed | `/genoptraening` | `/en/rehabilitation` |
| Idrætsskader | `/idraetsskader` | `/en/sports-injuries` |

---

## Content schema

New `ConditionBlock` interface added to `src/content/types.ts`:

```ts
export interface ConditionBlock {
  slug: string;        // full route path, e.g. '/nakkesmerter' or '/en/neck-pain'
  altSlug: string;     // other-language route (for hreflang pair)
  title: string;       // <title> tag
  description: string; // meta description
  h1: string;
  intro: string;       // one sentence shown as lead under h1
  body: string[];      // 3 paragraphs
  backLabel: string;
  homeHref: string;
}
```

Content lives in two new files:
- `src/content/conditions/da.ts` — exports `daConditions: ConditionBlock[]`
- `src/content/conditions/en.ts` — exports `enConditions: ConditionBlock[]`

`TreatmentItem` gains an optional `conditionSlug?: string` field so the treatments
grid can link each card to its condition page without a separate mapping.

---

## Page layout

Reuses the About page pattern. Three sections:

1. **Hero** — eyebrow "Behandling" / "Treatment", H1, intro as lead paragraph
2. **Body (alt)** — 3 paragraphs, `<div className="about-body">`
3. **Contact CTA** — reuse `ContactRow` component unchanged

Back link at bottom (same class `.back-link` as About page).

No new CSS file needed. All layout classes already exist. One addition: `.treatment-link`
makes the treatment card a block-level link without underline, and adds a `→` arrow
via `::after` pseudo-element to signal it is tappable.

---

## App.tsx extension

`Page` type gains `'condition'`. `AppProps` gains `condition?: ConditionBlock`.

`HREFLANGS` becomes a function: for home/about it returns the static pairs; for
condition pages it derives the pair from `condition.slug` and `condition.altSlug`.

`HeadMeta` receives `condition.title`, `condition.description`, and default `ogImage`.
FAB is hidden on condition pages (same rule as about: `!isAbout` becomes `page === 'home'`).

---

## main.tsx extension

12 new routes generated from the conditions arrays. Each route passes the matching
`ConditionBlock` object directly as a prop to `<App>`.

---

## Build script extension

`package.json` build script copies `dist/index.html` to each of the 12 condition paths,
following the same pattern as the existing `/om-mig` and `/en/about-me` copies.

---

## Spec self-review

- No TBDs or incomplete sections.
- Architecture is consistent with the existing About page pattern throughout.
- `conditionSlug` on `TreatmentItem` is optional so existing DA/EN content files
  compile without changes; the field is populated in the same commit as the routes.
- 200-line file cap: `src/content/conditions/da.ts` and `en.ts` will each be ~90 lines.
  `ConditionPage.tsx` will be under 60 lines. `main.tsx` will grow but stays under 60.
