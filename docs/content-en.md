# Content (EN) — source draft

Mirrors `content-da.md` one-to-one. Refined in plan #09 with `/humanizer`.
Numbers and contact data are locked.

## Header

- Clinic name: **Klinik for Manuel Terapi**
- Language switch: `DA · EN` (DA links to `/`)

## Hero

- Eyebrow (sentence case; CSS uppercases via `text-transform`):
  `Frederiksberg · Manual therapy`
- Decorative display word: *Movement*
- H1: **Klinik for Manuel Terapi**
- Subheading (parallel to the Danish live-site line): Effective treatment
  for tension, locked joints, and pain in the body.
- Rating chip: `★ 4.9 · Rated on Google Maps`
  (links to `https://maps.app.goo.gl/FAbmVBvtPQbczbQB8`, new tab)
- Primary CTA: **Book a time** → `https://klinik-for-manuel-terapi.planway.com/`
  (new tab, `rel="noopener"`)
- Contact row:
  - **Call** → `tel:+4551529620` — displayed as `+45 51 52 96 20`
  - **Email** → `mailto:omidirnadk@gmail.com` — displayed as `omidirnadk@gmail.com`
- Practical line (small, muted):
  `Martensens Allé 12, basement · 1828 Frederiksberg C · Today: 10:30–19:00`
  (per-day "today" line is static per weekday in HTML, no JS).

## About

- Eyebrow: `About the clinic`
- H2: Care you can feel
- Body:
  Omid Hodabakhshi has worked with manual therapy since 2007 and is reading
  for a Master's in pain science at Aalborg University. Each session is
  one-to-one. You leave knowing what's happening in your body and what you
  can do at home before your next visit. No package deals, no follow-ups
  you didn't ask for.

## Treatments, what we work with

- Eyebrow: `Treatments`
- H2: What we work with
- List (3–6 items, each as `{ title, body }` in `treatments.items[]`):
  1. **Tension and stiff muscles.** Neck, shoulders, back.
  2. **Locked joints.** Manual mobilisation of the back and pelvis.
  3. **Musculoskeletal pain.** Knee, hip, elbow.
  4. **Tension-type headache.** Jaw, neck, upper back.
  5. **Rehab and body awareness.** Exercises to take home.
  6. **Sports injuries.** Assessment and a plan.

## Practical

- Eyebrow: `Practical`
- H2: How to find us
- Address: Martensens Allé 12, basement, 1828 Frederiksberg C
- Transport: 5 min walk from Frederiksberg Metro (lines M1/M2);
  buses 9A and 31 stop nearby.
- Opening hours:

| Day | Open |
|---|---|
| Monday | 10:30 – 20:00 |
| Tuesday | 10:30 – 19:00 |
| Wednesday | 10:30 – 19:00 |
| Thursday | 10:30 – 20:00 |
| Friday | 10:00 – 19:00 |
| Saturday | Closed |
| Sunday | Closed |

- Note: re-verify against the live site before publishing (plan #06).

## Contact block (repeat)

- H2: Book a time or ask
- Three actions as large buttons in one row:
  1. **Book a time** (primary) → Planway
  2. **Call** → `tel:+4551529620`
  3. **Email** → `mailto:omidirnadk@gmail.com`

## Footer

- Line 1: `Klinik for Manuel Terapi · Martensens Allé 12, basement · 1828 Frederiksberg C`
- Line 2: `Phone +45 51 52 96 20 · omidirnadk@gmail.com`
- Line 3: `CVR 36 22 09 45`
- Line 4 (small, muted): `Photo: <Photographer> on Unsplash · © <year>`

## Technical strings

- `<title>`: `Klinik for Manuel Terapi · Frederiksberg`
- `<meta description>`: Manual therapy, body therapy, and pain science in
  Frederiksberg, Copenhagen. Book online. ★ 4.9 on Google.
- OG image: `/img/og.jpg` (1200 × 630)
- `hreflang` points to `/` with `lang="da"` (default).

## Sources

- Live site: `docs/_live-site.html`
- Original mockup: `booking-ease-connect/site/`
- User brief: opening prompt in this conversation.
