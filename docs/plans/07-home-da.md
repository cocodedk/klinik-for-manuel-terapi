# Plan 07 — `Home.tsx` route + `content/da.ts` + sub-components

## Goal

Build the Danish route end-to-end: a single `Home` component that consumes a
`Content` object, plus the small presentational components, plus the Danish
strings file.

## Inputs

- `docs/spec.md`, `docs/design.md`
- `docs/content-da.md` (final from plan 06)
- `src/content/types.ts` (plan 06)
- All five CSS files from plans 02–05

## Outputs

```
src/
├── pages/Home.tsx              (≤ 180 lines)
├── content/da.ts               (≤ 180 lines, Danish strings)
├── components/
│   ├── SiteHeader.tsx          (≤ 60 lines)
│   ├── SiteFooter.tsx          (≤ 60 lines)
│   ├── RatingChip.tsx          (≤ 40 lines)
│   ├── HeroCard.tsx            (≤ 90 lines)
│   ├── Treatments.tsx          (≤ 60 lines)
│   ├── HoursTable.tsx          (≤ 50 lines)
│   ├── ContactRow.tsx          (≤ 50 lines)
│   └── Button.tsx              (≤ 50 lines)
└── App.tsx                     (final, ≤ 80 lines)
```

## `App.tsx` shape

```tsx
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async'; // optional; or set document.title in effect
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { Fab } from './components/Fab';
import { Home } from './pages/Home';
import { da } from './content/da';
import { en } from './content/en';

export default function App({ lang }: { lang: 'da' | 'en' }) {
  const t = lang === 'da' ? da : en;
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  return (
    <>
      <a id="top" />
      <div className="parallax" aria-hidden />
      <SiteHeader t={t} />
      <main>
        <Home t={t} heroRef={heroRef} />
      </main>
      <SiteFooter t={t} footerRef={footerRef} />
      <Fab
        bookingUrl={t.cta.bookHref}
        bookingLabel={t.cta.bookLabel}
        phoneE164={t.cta.phoneE164}
        phoneLabel={t.cta.phoneLabel}
        email={t.cta.email}
        emailLabel={t.cta.emailLabel}
        heroRef={heroRef}
        footerRef={footerRef}
      />
    </>
  );
}
```

If `react-helmet-async` is too much, set `document.title` and the
`<meta name="description">` content in a tiny `useEffect` that runs once per
mount. The prerender plugin still picks up the result.

## `Home.tsx` shape

A flat composition — no nested abstractions:

```tsx
export function Home({ t, heroRef }: { t: Content; heroRef: React.RefObject<HTMLElement> }) {
  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="container">
          <HeroCard t={t} />
        </div>
      </section>
      <section className="alt" id="om">
        <div className="container">
          <AboutBlock t={t} />
        </div>
      </section>
      <section id="behandling">
        <div className="container">
          <Treatments t={t} />
        </div>
      </section>
      <section className="alt" id="praktisk">
        <div className="container cols-2">
          <PracticalAddress t={t} />
          <HoursTable t={t} />
        </div>
      </section>
      <section id="kontakt">
        <div className="container">
          <ContactRow t={t} />
        </div>
      </section>
    </>
  );
}
```

Sub-components stay below 100 lines each. `AboutBlock` and `PracticalAddress`
are local in `Home.tsx` if each is short; if they grow past ~30 lines,
promote them to `components/`.

## `content/da.ts`

Source the literal strings from the locked `docs/content-da.md`. Phone +
email + booking URL + maps URL must match `spec.md §9` exactly.

```ts
import type { Content } from './types';
const cta = {
  bookHref: 'https://klinik-for-manuel-terapi.planway.com/',
  bookLabel: 'Bestil tid',
  phoneE164: '+4551529620',
  phoneDisplay: '+45 51 52 96 20',
  phoneLabel: 'Ring',
  email: 'omidirnadk@gmail.com',
  emailLabel: 'Skriv',
};

export const da: Content = {
  langCode: 'da',
  altHref: '/en/',
  altLangCode: 'en',
  altLabel: 'EN',
  title: 'Klinik for Manuel Terapi · Frederiksberg',
  description: 'Manuel terapi, kropsterapi og smertevidenskab i Frederiksberg. Bestil tid online — ★ 4.9 på Google.',
  ogImage: '/img/og.jpg',
  rating: { value: '4.9', label: 'Vurdering på Google Maps',
            href: 'https://maps.app.goo.gl/FAbmVBvtPQbczbQB8' },
  hero: { /* ... from content-da.md */ },
  /* ...the rest, exactly mirroring content-da.md ... */
  cta,
};
```

## SEO meta

Set `<title>` and `<meta description>` per route. With `vite-react-ssg` the
prerender step bakes both into the static HTML before hydration. Use either
`react-helmet-async` (the plugin's recommended path) or its built-in
`<head>` capture API.

## Acceptance

- `pnpm dev` then visit `/` — every section renders, fonts apply, photo
  shows, CTAs link correctly.
- View-source after `pnpm build && pnpm preview` — `/index.html` contains
  the Danish title and description in plain HTML before the React mount.
- `wc -l` each file ≤ its budget in `00-overview.md`.
- Lighthouse a11y for `/` ≥ 95.

## Out of scope

- English route (plan 08).
- Humanizing the copy (plan 09).
- Build/CI (plan 10).
