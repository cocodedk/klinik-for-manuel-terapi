# Plan 06 — Verify Danish source copy + types

## Goal

Lock the Danish source content (`docs/content-da.md`) and emit a typed
`Content` interface that both `da.ts` and `en.ts` consume. The humanizer
pass in plan 09 rewrites strings inside this contract — the contract itself
shouldn't move after this plan.

## Inputs

- `docs/content-da.md` (draft from spec phase)
- `docs/_live-site.html` (scraped reference)
- The user, who confirms practitioner name + bio + hours.

## Outputs

- `docs/content-da.md` — final, every TODO resolved.
- `src/content/types.ts` — TypeScript contract (≤ 80 lines).

## Steps

### 1 · Confirm with the user

Walk through `content-da.md` once with the user and resolve:

1. Practitioner name (e.g. "Omid Irna") and 1-line bio.
2. CVR / business legal name to include in the footer (or "skip").
3. Final hours table — re-verify against the live booking page.
4. Map URL preference — keep the short `maps.app.goo.gl/...` link or
   replace with the long-form Google Maps URL.

Tick each off in `content-da.md`. Do **not** touch `content-en.md` here —
it follows in plan 08.

### 2 · `src/content/types.ts`

```ts
export interface CtaTriple {
  bookHref: string;     // Planway URL
  bookLabel: string;    // 'Bestil tid' / 'Book a time'
  phoneE164: string;    // '+4551529620'
  phoneDisplay: string; // '+45 51 52 96 20'
  phoneLabel: string;   // 'Ring' / 'Call'
  email: string;        // 'omidirnadk@gmail.com'
  emailLabel: string;   // 'Skriv' / 'Email'
}

export interface HoursRow { day: string; open: string; closed?: boolean; }

export interface Content {
  langCode: 'da' | 'en';
  altHref: string;          // sibling route '/en/' or '/'
  altLangCode: 'da' | 'en';
  altLabel: string;         // 'EN' / 'DA'
  title: string;            // <title>
  description: string;      // <meta description>
  ogImage: string;          // '/img/og.jpg'
  rating: { value: '4.9'; label: string; href: string };
  hero: {
    eyebrow: string;
    deco: string;           // 'Bevægelse' / 'Movement'
    h1: string;
    lead: string;
    metaLine: string;       // address · today's hours
  };
  about: { eyebrow: string; h2: string; body: string[] };
  treatments: { eyebrow: string; h2: string; items: { title: string; body: string }[] };
  practical: {
    eyebrow: string;
    h2: string;
    address: string[];      // 2-line address
    transport: string;
    hours: HoursRow[];
  };
  contactBlock: { h2: string; cta: CtaTriple };
  footer: { lines: string[]; photoCredit: string };
  cta: CtaTriple;           // shared with the FAB
}
```

This file is the only contract `Home.tsx`, `Fab.tsx`, and the route loaders
agree on. If any later plan needs a new field, add it here first and update
both `da.ts` and `en.ts` in the same change.

## Acceptance

- `content-da.md` has zero TODO markers.
- `src/content/types.ts` compiles standalone (`pnpm tsc --noEmit`).
- The interface covers every visible string + every link in the spec —
  spot-check by listing them against `docs/content-da.md`.

## Out of scope

- Writing `da.ts` itself (plan 07).
- Writing `en.ts` (plan 08).
- Humanizer pass (plan 09).
