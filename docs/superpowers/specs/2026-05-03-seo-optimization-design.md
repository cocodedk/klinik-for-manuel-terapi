# SEO Optimization — Design Spec
_Branch: `claude/task-seo-optimizations` · Date: 2026-05-03_

## Goal
Implement the highest-impact on-site SEO items from `docs/optimize-presence-on-web/comparison.md`
(priorities 3, 4, 7, 9, 10) without touching off-site assets or the simplify changes in `main`.

---

## 1. Title tags

| Lang | New value |
|------|-----------|
| DA | `'Manuel Terapi Frederiksberg \| Klinik for Manuel Terapi'` |
| EN | `'Manual Therapy Frederiksberg \| Klinik for Manuel Terapi'` |

Keyword-first, ≤ 60 chars. Updated in `src/content/da.ts` and `src/content/en.ts`.

---

## 2. H1 copy

| Lang | New value |
|------|-----------|
| DA | `'Klinik for Manuel Terapi – Frederiksberg C'` |
| EN | `'Klinik for Manuel Terapi – Frederiksberg C'` |

Changed in `src/content/{da,en}.ts` → `hero.h1`.

---

## 3. Hero differentiators

Extend `hero.metaLine` — no new fields, no new CSS:

| Lang | New value |
|------|-----------|
| DA | `'Åbent til kl. 20 · Gavekort · Martensens Allé 12, kld. · 1828 Frederiksberg C'` |
| EN | `'Open until 8 pm · Gift cards · Martensens Allé 12, basement · 1828 Frederiksberg C'` |

---

## 4. HeadMeta component

**File:** `src/components/HeadMeta.tsx`

Props: `{ t: Content; lang: string }`.

Manages via `useEffect` (deps `[t, lang]`):
- `document.title` ← `t.title`
- `meta[name="description"]` ← `t.description`
- `meta[property="og:title"]` ← `t.title`
- `meta[property="og:description"]` ← `t.description`
- `meta[property="og:image"]` ← absolute URL: `origin + base + t.ogImage`
- `meta[property="og:url"]` ← `window.location.href`
- `meta[property="og:type"]` ← `"website"`
- `script[id="ld-json"][type="application/ld+json"]` ← LocalBusiness JSON-LD (see §5)

Returns `null` (no DOM output). Helper: `setMeta(property, content, attr='name')`.

**App.tsx changes (minimal):**
- Import and render `<HeadMeta t={t} lang={lang} />` inside the fragment.
- Remove `document.title` and `meta[name="description"]` lines from existing `useEffect`.
- Hreflang loop and `document.documentElement.lang` remain untouched in App.tsx.

---

## 5. LocalBusiness JSON-LD schema

Type: `MedicalBusiness` (subtype of `LocalBusiness`).

```json
{
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Klinik for Manuel Terapi",
  "url": "https://cocodedk.github.io/klinik-for-manuel-terapi/",
  "telephone": "+4551529620",
  "email": "omidirnadk@gmail.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Martensens Allé 12, kld.",
    "postalCode": "1828",
    "addressLocality": "Frederiksberg",
    "addressCountry": "DK"
  },
  "openingHours": [
    "Mo 10:30-20:00",
    "Tu 10:30-19:00",
    "We 10:30-19:00",
    "Th 10:30-20:00",
    "Fr 10:00-19:00"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "ratingCount": "50"
  }
}
```

Hardcoded in `HeadMeta.tsx` — not derived from content files (clinic data is stable and
not translated). `<script>` tag uses `id="ld-json"` so it can be found and updated
on re-render without duplication.

---

## 6. FAQ section

### Type additions (`src/content/types.ts`)

```ts
export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlock {
  h2: string;
  items: FaqItem[];
}
```

`faq: FaqBlock` added to `Content` interface.

### Content (`da.ts`)

```ts
faq: {
  h2: 'Ofte stillede spørgsmål',
  items: [
    {
      question: 'Skal jeg have en henvisning?',
      answer: 'Nej – du kan bestille tid direkte uden lægehenvisning eller forsikringshenvisning.',
    },
    {
      question: 'Hvad arbejder manuel terapi med?',
      answer: 'Manuel terapi behandler spændinger, låste led og smerter i bevægeapparatet ved hjælp af præcise håndgreb, mobilisering og øvelser – uden medicin.',
    },
    {
      question: 'Tilbyder I gavekort?',
      answer: 'Ja – gavekort er tilgængeligt. Kontakt klinikken for at høre mere.',
    },
    {
      question: 'Hvad sker der til første besøg?',
      answer: 'Vi starter med en grundig samtale om dine symptomer og bevægemønstre. Derefter behandler vi, og du får konkrete øvelser med hjem.',
    },
  ],
},
```

### Content (`en.ts`)

```ts
faq: {
  h2: 'Frequently asked questions',
  items: [
    {
      question: 'Do I need a referral?',
      answer: 'No – you can book directly without a GP or insurance referral.',
    },
    {
      question: 'What does manual therapy treat?',
      answer: 'Manual therapy addresses tension, restricted joints, and musculoskeletal pain using precise hands-on techniques, mobilisation, and exercises – no medication.',
    },
    {
      question: 'Do you offer gift cards?',
      answer: 'Yes – gift cards are available. Contact the clinic to find out more.',
    },
    {
      question: 'What happens at the first visit?',
      answer: 'We start with a thorough conversation about your symptoms and movement patterns. We then treat, and you leave with specific exercises to do at home.',
    },
  ],
},
```

### Faq component (`src/components/Faq.tsx`)

Props: `{ t: Content }`. Renders:

```html
<p class="eyebrow">FAQ</p>
<h2>{t.faq.h2}</h2>
<dl class="faq-list">
  <div class="faq-item">
    <dt>{question}</dt>
    <dd>{answer}</dd>
  </div>
  ...
</dl>
```

Plain `<dl>` — no JS, Google-indexable, eligible for FAQ rich results.
CSS: one new rule for `.faq-list` (no borders, no gradients) in `src/styles/components.css`.

### Home.tsx

New `<section id="faq">` inserted between `#treatments` and `#practical`:

```tsx
<section id="faq">
  <div className="container">
    <Faq t={t} />
  </div>
</section>
```

---

## Files changed

| File | Change |
|------|--------|
| `src/content/types.ts` | Add `FaqItem`, `FaqBlock`; add `faq` to `Content` |
| `src/content/da.ts` | Update `title`, `hero.h1`, `hero.metaLine`, add `faq` |
| `src/content/en.ts` | Update `title`, `hero.h1`, `hero.metaLine`, add `faq` |
| `src/components/HeadMeta.tsx` | New — OG tags + JSON-LD |
| `src/components/Faq.tsx` | New — FAQ section component |
| `src/pages/Home.tsx` | Add FAQ section |
| `src/App.tsx` | Add `<HeadMeta>`, trim title/description from useEffect |
| `src/styles/components.css` | Add `.faq-list` / `.faq-item` rules |

## Files not touched
`src/components/CtaButtons.tsx`, `src/components/Fab.tsx`, hreflang loop in `App.tsx`.
