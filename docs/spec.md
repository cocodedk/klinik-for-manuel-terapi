# Klinik for Manuel Terapi — Site Specification

Replacement for klinikformanuelterapi.dk. Lifts the visual system from the
Lovable preview at `preview--booking-ease-connect.lovable.app` (mirrored under
`booking-ease-connect/site/`) and routes traffic to the existing Planway
booking widget. Mobile-first, bilingual (Danish primary, English secondary),
no gradients, plain HTML/CSS/JS.

## 1 · Purpose

A landing page that, on first paint, makes three things obvious to a visitor
who is in pain and considering booking:

1. This clinic is well-rated (Google 4.9).
2. There is a one-tap path to book a time.
3. There is a one-tap path to call or email.

Everything else (about, services, hours, address) is supporting context.

## 2 · Audience

Adults in Frederiksberg / greater Copenhagen searching in Danish for manual
therapy / pain treatment. A subset of English-speaking residents and tourists
needs the same flow in English.

## 3 · Above the fold (mobile)

In document order, top to bottom:

1. **Header** — clinic name links to `#top`; language switch DA · EN top-right.
2. **Rating chip** — `★ 4.9 · Google Maps` → maps URL (opens new tab).
3. **Hero heading** — clinic name + one-line value promise.
4. **Primary CTA** — "Bestil tid" → Planway widget (new tab).
5. **Contact row** — phone (tap-to-call) + email (tap-to-mail).
6. **Small things** (single line, muted) — address + today's hours.

## 4 · Below the fold

- About the practitioner — 2–3 sentences.
- What we treat — 3–6 bullet items.
- Practical info — full hours table, address, public transport.
- Footer — Unsplash credit, copyright, optional CVR.

## 5 · Sticky behavior

A right-bottom vertically stacked FAB cluster appears once the hero is out of
the viewport:

1. "Bestil tid" (primary, pill).
2. Phone (circular icon).
3. Email (circular icon).

Hides itself ~120 px before the footer reaches the viewport bottom — never
overlaps footer content. The FAB is a safety net; the in-flow CTAs are the
primary path.

A back-to-top affordance is the header logo (links to `#top`).

## 6 · Bilingual model

Two static documents — no runtime toggle:

- `/index.html` — Danish (`<html lang="da">`).
- `/en/index.html` — English (`<html lang="en">`).

Each document declares the other via `<link rel="alternate" hreflang="…">`.
Header has a `DA · EN` switcher that links to the sibling document.

## 7 · Tech (frozen)

- **React SPA** — Vite 5 + React 18 + TypeScript.
- **Routing** — `react-router-dom` v6. Two routes: `/` (Danish) and `/en/`
  (English). Both render the same `Home` component with a different
  translation object passed in.
- **Prerender** — `vite-react-ssg` builds static HTML for `/` and `/en/` at
  build time so first paint has correct `<title>`, `<meta>`, and content
  before hydration. SPA navigation takes over after.
- **Styling** — plain CSS files in `src/styles/` (tokens, base, layout,
  components, fab) imported once in `src/main.tsx`. No CSS-in-JS, no
  Tailwind, no preprocessor.
- **i18n** — two TypeScript objects in `src/content/da.ts` and
  `src/content/en.ts`, typed against a shared `Content` interface. The route
  decides which one to pass.
- **Self-hosted WOFF2 webfonts** in `public/fonts/` (GDPR — no Google Fonts CDN).
- **Planway widget** opens in a new tab.

## 8 · Constraints

- Every file ≤ 200 lines (HTML, CSS, TS/TSX, MD).
- No CSS gradients (linear, radial, conic) anywhere visible.
- Mobile-first; only `min-width` media queries.
- WCAG AA contrast on all body text.
- No third-party analytics, cookies, or trackers.
- `prefers-reduced-motion` honored.

## 9 · Data sources (locked)

| Field | Value | Source |
|---|---|---|
| Practitioner | Omid Hodabakhshi | klinikformanuelterapi.dk/om-mig |
| Background | Manual therapy since 2007; ManuVision body therapist; Master's in pain science at Aalborg University (in progress) | /om-mig |
| Phone | `+45 51 52 96 20` | live site |
| Email | `omidirnadk@gmail.com` | live site |
| Working address | Martensens Allé 12, kld., 1828 Frederiksberg C | live site |
| Registered CVR | `36 22 09 45` (Manuel terapi) | proff.dk |
| Maps URL | `https://maps.app.goo.gl/FAbmVBvtPQbczbQB8` | user |
| Booking | `https://klinik-for-manuel-terapi.planway.com/` | source mirror |
| Rating | `4.9` (hardcoded; not fetched live) | user |
| Hours | Mon 10:30–20:00 · Tue 10:30–19:00 · Wed 10:30–19:00 · Thu 10:30–20:00 · Fri 10:00–19:00 · Sat lukket · Sun lukket | live site, user-confirmed |

## 10 · Deploy target (locked)

- **Repo**: `cocodedk/klinik-for-manuel-terapi` on GitHub.
- **Hosting**: GitHub Pages (project page).
- **Public URL**: `https://cocodedk.github.io/klinik-for-manuel-terapi/`.
- **Vite `base`**: `/klinik-for-manuel-terapi/` so all asset URLs resolve under
  the project subpath.
- **Routing**: GitHub Pages serves a single `index.html` per directory; the
  prerender step in `vite-react-ssg` produces both
  `dist/index.html` and `dist/en/index.html`. A `404.html` copy of `dist/index.html`
  handles deep-link refreshes that miss a static file (standard GH Pages SPA
  trick).
- **Hero photo**: the agent executing plan 01 picks any Unsplash photo
  matching the criteria in `design.md §6` and records the photographer +
  URL in `README.md`. No specific photo is locked here.

## 11 · Success criteria

- Lighthouse mobile ≥ 95 in Performance, Accessibility, Best Practices, SEO.
- First Contentful Paint < 1.5 s on 4G.
- Tap-targets ≥ 44 × 44 px.
- Keyboard reachable: every CTA + the FAB cluster.
- Identical layout & copy parity between DA and EN.
- Every file in the repo passes the 200-line check (`docs/plans/10-qa.md`).
