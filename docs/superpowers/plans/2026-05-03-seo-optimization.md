# SEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the five highest-impact on-site SEO items: keyword-first titles, H1 with location, hero differentiators, OpenGraph + LocalBusiness JSON-LD via a new HeadMeta component, and an FAQ section.

**Architecture:** Content changes go into `src/content/{da,en,types}.ts`. A new `HeadMeta` component handles all `<head>` meta/JSON-LD injection via `useEffect`. A new `Faq` component renders a semantic `<dl>`. App.tsx gets a minimal wiring change only.

**Tech Stack:** React 18, TypeScript strict, plain CSS, Vite SPA (no SSG yet), no test framework installed — verify with `pnpm tsc --noEmit && pnpm build`.

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/content/types.ts` | Modify | Add `FaqItem`, `FaqBlock`; add `faq` to `Content` |
| `src/content/da.ts` | Modify | Update `title`, `hero.h1`, `hero.metaLine`; add `faq` |
| `src/content/en.ts` | Modify | Same as da.ts, English copy |
| `src/components/HeadMeta.tsx` | Create | OG tags + JSON-LD via useEffect, returns null |
| `src/components/Faq.tsx` | Create | Renders `<dl>` FAQ list from `t.faq` |
| `src/pages/Home.tsx` | Modify | Add `<section id="faq">` between treatments + practical |
| `src/App.tsx` | Modify | Add `<HeadMeta>`, remove title/desc from existing useEffect |
| `src/styles/components.css` | Modify | Add `.faq-list` and `.faq-item` styles |

---

### Task 1: Extend content types

**Files:**
- Modify: `src/content/types.ts`

- [ ] **Add FaqItem and FaqBlock interfaces, add faq to Content**

Open `src/content/types.ts`. After the `FooterBlock` interface (line ~70) and before the `Content` interface, insert:

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

Then in the `Content` interface, add `faq: FaqBlock;` after `footer: FooterBlock;`:

```ts
export interface Content {
  langCode: LangCode;
  title: string;
  description: string;
  ogImage: string;
  rating: RatingChip;
  hero: HeroBlock;
  about: AboutBlock;
  treatments: TreatmentsBlock;
  practical: PracticalBlock;
  contactBlock: ContactBlock;
  footer: FooterBlock;
  faq: FaqBlock;
  cta: CtaTriple;
}
```

- [ ] **Verify types compile**

```bash
cd /home/cocodedk/0-projects/omid && pnpm tsc --noEmit
```

Expected: errors about missing `faq` in `da.ts` and `en.ts` (that's expected — we fix in Tasks 2 and 3).

- [ ] **Commit**

```bash
git add src/content/types.ts
git commit -m "feat(types): add FaqItem, FaqBlock to Content interface"
```

---

### Task 2: Update Danish content

**Files:**
- Modify: `src/content/da.ts`

- [ ] **Update title**

Change `title` from:
```ts
title: 'Klinik for Manuel Terapi · Frederiksberg',
```
to:
```ts
title: 'Manuel Terapi Frederiksberg | Klinik for Manuel Terapi',
```

- [ ] **Update hero.h1**

Change `h1` inside `hero:` from:
```ts
h1: 'Klinik for Manuel Terapi',
```
to:
```ts
h1: 'Klinik for Manuel Terapi – Frederiksberg C',
```

- [ ] **Update hero.metaLine**

Change `metaLine` inside `hero:` from:
```ts
metaLine: 'Martensens Allé 12, kld. · 1828 Frederiksberg C',
```
to:
```ts
metaLine: 'Åbent til kl. 20 · Gavekort · Martensens Allé 12, kld. · 1828 Frederiksberg C',
```

- [ ] **Add faq block**

Add after `footer: { ... },` and before `cta,`:

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

- [ ] **Verify**

```bash
cd /home/cocodedk/0-projects/omid && pnpm tsc --noEmit
```

Expected: one remaining error about missing `faq` in `en.ts`.

- [ ] **Commit**

```bash
git add src/content/da.ts
git commit -m "feat(content): update DA title, H1, metaLine, add FAQ copy"
```

---

### Task 3: Update English content

**Files:**
- Modify: `src/content/en.ts`

- [ ] **Update title**

Change `title` from:
```ts
title: 'Klinik for Manuel Terapi · Frederiksberg',
```
to:
```ts
title: 'Manual Therapy Frederiksberg | Klinik for Manuel Terapi',
```

- [ ] **Update hero.h1**

Change `h1` inside `hero:` from:
```ts
h1: 'Klinik for Manuel Terapi',
```
to:
```ts
h1: 'Klinik for Manuel Terapi – Frederiksberg C',
```

- [ ] **Update hero.metaLine**

Change `metaLine` inside `hero:` from:
```ts
metaLine: 'Martensens Allé 12, basement · 1828 Frederiksberg C',
```
to:
```ts
metaLine: 'Open until 8 pm · Gift cards · Martensens Allé 12, basement · 1828 Frederiksberg C',
```

- [ ] **Add faq block**

Add after `footer: { ... },` and before `cta,`:

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

- [ ] **Verify types are clean**

```bash
cd /home/cocodedk/0-projects/omid && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/content/en.ts
git commit -m "feat(content): update EN title, H1, metaLine, add FAQ copy"
```

---

### Task 4: Create HeadMeta component

**Files:**
- Create: `src/components/HeadMeta.tsx`

- [ ] **Create the file**

Create `src/components/HeadMeta.tsx` with this exact content:

```tsx
import { useEffect } from 'react';
import type { Content } from '../content/types';

interface HeadMetaProps {
  t: Content;
  lang: string;
}

const SITE_URL = 'https://cocodedk.github.io/klinik-for-manuel-terapi';

const LD_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Klinik for Manuel Terapi',
  url: SITE_URL + '/',
  telephone: '+4551529620',
  email: 'omidirnadk@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Martensens Allé 12, kld.',
    postalCode: '1828',
    addressLocality: 'Frederiksberg',
    addressCountry: 'DK',
  },
  openingHours: [
    'Mo 10:30-20:00',
    'Tu 10:30-19:00',
    'We 10:30-19:00',
    'Th 10:30-20:00',
    'Fr 10:00-19:00',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    ratingCount: '50',
  },
});

function setMeta(attr: string, value: string, attrName = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attr}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attr);
    document.head.appendChild(el);
  }
  el.content = value;
}

export default function HeadMeta({ t, lang }: HeadMetaProps) {
  useEffect(() => {
    document.title = t.title;
    setMeta('description', t.description);
    setMeta('og:title', t.title, 'property');
    setMeta('og:description', t.description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', window.location.href, 'property');
    const base = window.location.origin + '/klinik-for-manuel-terapi';
    setMeta('og:image', base + t.ogImage, 'property');

    let ld = document.getElementById('ld-json') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'ld-json';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    ld.textContent = LD_JSON;
  }, [t, lang]);

  return null;
}
```

- [ ] **Verify**

```bash
cd /home/cocodedk/0-projects/omid && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/components/HeadMeta.tsx
git commit -m "feat(seo): add HeadMeta component — OG tags + LocalBusiness JSON-LD"
```

---

### Task 5: Wire HeadMeta into App.tsx

**Files:**
- Modify: `src/App.tsx`

- [ ] **Add import and render HeadMeta; trim useEffect**

The existing `useEffect` in App.tsx handles: `document.documentElement.lang`, `document.title`, `meta[name="description"]`, and hreflang links.

HeadMeta now owns `document.title` and `meta[name="description"]`. Remove those two from the existing effect and add `<HeadMeta>` to the JSX.

Replace the `useEffect` block:

```ts
useEffect(() => {
  document.documentElement.lang = lang;
  document.title = t.title;
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = t.description;
  const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
  for (const [hl, path] of HREFLANGS) {
    let l = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hl}"]`);
    if (!l) {
      l = document.createElement('link');
      l.rel = 'alternate';
      l.hreflang = hl;
      document.head.appendChild(l);
    }
    l.href = base + path;
  }
}, [lang, t]);
```

with:

```ts
useEffect(() => {
  document.documentElement.lang = lang;
  const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
  for (const [hl, path] of HREFLANGS) {
    let l = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hl}"]`);
    if (!l) {
      l = document.createElement('link');
      l.rel = 'alternate';
      l.hreflang = hl;
      document.head.appendChild(l);
    }
    l.href = base + path;
  }
}, [lang, t]);
```

- [ ] **Add import at the top of App.tsx**

After the existing imports, add:
```ts
import HeadMeta from './components/HeadMeta';
```

- [ ] **Add HeadMeta to JSX**

Inside the returned fragment, add `<HeadMeta t={t} lang={lang} />` as the first child:

```tsx
return (
  <>
    <HeadMeta t={t} lang={lang} />
    <a id="top" />
    <div className="parallax" aria-hidden />
    <SiteHeader t={t} />
    <main>
      <Home t={t} heroRef={heroRef} />
    </main>
    <SiteFooter t={t} footerRef={footerRef} />
    <Fab cta={t.cta} heroRef={heroRef} footerRef={footerRef} />
  </>
);
```

- [ ] **Verify**

```bash
cd /home/cocodedk/0-projects/omid && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/App.tsx
git commit -m "feat(seo): wire HeadMeta into App, trim title/desc from useEffect"
```

---

### Task 6: Create Faq component and styles

**Files:**
- Create: `src/components/Faq.tsx`
- Modify: `src/styles/components.css`

- [ ] **Create Faq.tsx**

Create `src/components/Faq.tsx`:

```tsx
import type { Content } from '../content/types';

export default function Faq({ t }: { t: Content }) {
  const { h2, items } = t.faq;
  return (
    <>
      <p className="eyebrow">FAQ</p>
      <h2>{h2}</h2>
      <dl className="faq-list">
        {items.map(({ question, answer }) => (
          <div className="faq-item" key={question}>
            <dt>{question}</dt>
            <dd>{answer}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
```

- [ ] **Add FAQ styles to components.css**

Append to the end of `src/styles/components.css`:

```css
/* FAQ */
.faq-list {
  display: grid;
  gap: var(--space-5);
  margin: 0;
  padding: 0;
}
.faq-list dt {
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  font-weight: 600;
  margin-block-end: var(--space-1);
}
.faq-list dd {
  margin: 0;
  color: var(--muted);
}
```

- [ ] **Verify**

```bash
cd /home/cocodedk/0-projects/omid && pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Commit**

```bash
git add src/components/Faq.tsx src/styles/components.css
git commit -m "feat(faq): add Faq component and styles"
```

---

### Task 7: Add FAQ section to Home.tsx

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Import Faq and insert section**

Add import at the top:
```ts
import Faq from '../components/Faq';
```

Insert a new section between `#treatments` and `#practical`:

```tsx
<section id="faq">
  <div className="container">
    <Faq t={t} />
  </div>
</section>
```

The full `Home` component body becomes:

```tsx
export default function Home({ t, heroRef }: HomeProps) {
  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="container">
          <HeroCard t={t} />
        </div>
      </section>
      <section className="alt" id="about">
        <div className="container">
          <AboutBlock t={t} />
        </div>
      </section>
      <section id="treatments">
        <div className="container">
          <Treatments t={t} />
        </div>
      </section>
      <section id="faq">
        <div className="container">
          <Faq t={t} />
        </div>
      </section>
      <section className="alt" id="practical">
        <div className="container cols-2">
          <PracticalAddress t={t} />
          <HoursTable t={t} />
        </div>
      </section>
      <section id="contact">
        <div className="container">
          <ContactRow t={t} />
        </div>
      </section>
    </>
  );
}
```

- [ ] **Full build verification**

```bash
cd /home/cocodedk/0-projects/omid && pnpm tsc --noEmit && pnpm build
```

Expected: no TypeScript errors, build succeeds, `dist/index.html` and `dist/en/index.html` generated.

- [ ] **Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat(faq): add FAQ section to Home page"
```

---

### Task 8: Final verification

- [ ] **Run dev server and manually verify**

```bash
cd /home/cocodedk/0-projects/omid && pnpm dev
```

Open `http://localhost:5173/klinik-for-manuel-terapi/` and check:
1. Browser tab title reads `Manuel Terapi Frederiksberg | Klinik for Manuel Terapi`
2. H1 reads `Klinik for Manuel Terapi – Frederiksberg C`
3. Hero meta line includes `Åbent til kl. 20 · Gavekort`
4. FAQ section visible between treatments and practical info
5. Open DevTools → Elements → `<head>`: confirm `og:title`, `og:description`, `og:image`, `og:url`, `og:type` meta tags present
6. Confirm `<script id="ld-json" type="application/ld+json">` present with MedicalBusiness JSON

Then open `http://localhost:5173/klinik-for-manuel-terapi/en/` and confirm:
1. Tab title reads `Manual Therapy Frederiksberg | Klinik for Manuel Terapi`
2. Hero meta line includes `Open until 8 pm · Gift cards`
3. FAQ shows English copy

- [ ] **Validate JSON-LD with Google Rich Results Test**

Copy the JSON-LD from DevTools and paste into Google's Rich Results Test (search.google.com/test/rich-results). Should pass as `MedicalBusiness`.

- [ ] **Notify agent-omid via /tmp/omid-chat.md**

Append to `/tmp/omid-chat.md`:
```
[<timestamp>] [agent-omid-optimizer]: SEO work complete on branch claude/task-seo-optimizations. 
Changes: title tags, H1, hero metaLine, HeadMeta component (OG+JSON-LD), FAQ section (4 Q&A DA+EN). 
All commits green (tsc + build). Ready for your review and merge to main.
```
(Use `python3 -c "import datetime; ..."` pattern as established — trim to last 20 lines)
