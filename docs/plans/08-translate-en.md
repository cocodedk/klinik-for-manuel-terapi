# Plan 08 — `content/en.ts` + `/en/` route + lang switcher

## Goal

Add the English translation as a sibling content file and wire the `/en/`
route. The `Home` component does not change — only `App.tsx` route mapping
and the `<SiteHeader>` lang switcher do.

## Inputs

- `src/content/types.ts` (plan 06)
- `src/content/da.ts` (plan 07) — structural reference
- `docs/content-en.md` (draft) — copy source
- `Home.tsx`, `SiteHeader.tsx`, `SiteFooter.tsx` (plan 07)

## Outputs

- `src/content/en.ts` (≤ 180 lines, mirrors `da.ts` field-for-field).
- Update `SiteHeader.tsx` so the lang switcher uses
  `t.altHref` + `t.altLabel` and marks the current locale with
  `aria-current="page"`.
- Update `index.html` (and the prerendered `/en/index.html` via
  `vite-react-ssg`) so each contains the matching `<link rel="alternate"
  hreflang="...">` pointing at the sibling.

## Steps

### 1 · `content/en.ts`

Copy `content/da.ts`, swap every string for the English equivalent in
`docs/content-en.md`, and flip `langCode`, `altHref`, `altLangCode`,
`altLabel`. Keep the `cta` triple identical except for the localized
labels.

```ts
const cta = {
  bookHref: 'https://klinik-for-manuel-terapi.planway.com/',
  bookLabel: 'Book a time',
  phoneE164: '+4551529620',
  phoneDisplay: '+45 51 52 96 20',
  phoneLabel: 'Call',
  email: 'omidirnadk@gmail.com',
  emailLabel: 'Email',
};

export const en: Content = {
  langCode: 'en',
  altHref: '/',
  altLangCode: 'da',
  altLabel: 'DA',
  title: 'Klinik for Manuel Terapi · Frederiksberg',
  description: 'Manual therapy, body therapy, and pain science in Frederiksberg, Copenhagen. Book online — ★ 4.9 on Google.',
  ogImage: '/img/og.jpg',
  /* …mirror da.ts… */
  cta,
};
```

### 2 · Lang switcher in `SiteHeader.tsx`

```tsx
<nav className="lang" aria-label={/* localized 'Language' */}>
  <a href={t.langCode === 'da' ? '/' : '/'}    aria-current={t.langCode === 'da' ? 'page' : undefined}>DA</a>
  <span aria-hidden>·</span>
  <a href={t.langCode === 'en' ? '/en/' : '/en/'} aria-current={t.langCode === 'en' ? 'page' : undefined}>EN</a>
</nav>
```

Simpler reading: hardcode both anchors; whichever matches the current locale
wears `aria-current="page"`.

### 3 · `<html lang>` and `<link rel="alternate">`

Per-route `<html lang>` and `hreflang` alternates are emitted by the
prerender step. With `vite-react-ssg`:

```tsx
// in App.tsx or a tiny Head component
<>
  <html lang={t.langCode} />
  <link rel="alternate" hrefLang={t.langCode}    href={t.langCode === 'da' ? '/' : '/en/'} />
  <link rel="alternate" hrefLang={t.altLangCode} href={t.altHref} />
  <link rel="alternate" hrefLang="x-default"     href="/" />
</>
```

### 4 · Sanity-check parity

A quick TS expression to fail the build if either content object is missing
a field:

```ts
const _checkDa: Content = da;
const _checkEn: Content = en;
```

(TypeScript compiles them anyway — leave this as a comment-only reminder if
it feels redundant.)

### 5 · `vite.config.ts` SSG routes

```ts
import { defineConfig } from 'vite';
export default defineConfig({
  // ...react()
  build: { outDir: 'dist' },
  // vite-react-ssg picks routes from `createBrowserRouter` automatically;
  // explicitly list them if the plugin asks:
  ssgOptions: { includedRoutes: () => ['/', '/en/'] },
});
```

## Acceptance

- `/en/` route renders all the same sections as `/`, with English copy.
- Switching from header `EN` to `DA` lands on `/` with no flicker.
- View-source on built `/en/index.html` shows the English title and
  description in plain HTML.
- `<html lang>` is `da` on `/` and `en` on `/en/`.
- Lighthouse a11y on `/en/` ≥ 95.

## Out of scope

- Humanizer pass (plan 09).
- CI/CD (plan 10).
