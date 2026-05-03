# Indhold (DA) — kildeudkast

Dette er udkastet før humanizer-da. Sproget er bevidst neutralt og bliver
finpudset i plan #09. Tal og kontaktdata er låst.

## Header

- Klinikkens navn: **Klinik for Manuel Terapi**
- Sprogskifter: `DA · EN` (EN linker til `/en/`)

## Hero

- Eyebrow (sætningskasus, CSS uppercaser via `text-transform`):
  `Frederiksberg · Manuel terapi`
- Display-ord (dekorativt): *Bevægelse*
- H1: **Klinik for Manuel Terapi**
- Underrubrik (livesitets nuværende ordlyd, bevares):
  Effektiv behandling der hjælper dig af med spændinger, låste led og smerter
  i kroppen.
- Vurderingschip: `★ 4.9 · Vurdering på Google Maps`
  (linker til `https://maps.app.goo.gl/FAbmVBvtPQbczbQB8`, åbner ny fane)
- Primær CTA: **Bestil tid** → `https://klinik-for-manuel-terapi.planway.com/`
  (åbner ny fane, `rel="noopener"`)
- Kontaktrække:
  - **Ring** → `tel:+4551529620` — vises som `+45 51 52 96 20`
  - **Skriv** → `mailto:omidirnadk@gmail.com` — vises som `omidirnadk@gmail.com`
- Praktisk-linje (lille, dæmpet):
  `Martensens Allé 12, kld. · 1828 Frederiksberg C · I dag: 10:30–19:00`
  (dagens åbningstid sættes statisk pr. ugedag i HTML; ingen JS).

## Om

- Eyebrow: `Om klinikken`
- H2: Behandling der mærkes
- Brødtekst:
  Omid Hodabakhshi har arbejdet med manuel terapi siden 2007 og læser
  kandidat i smertevidenskab på Aalborg Universitet. Hver session er
  én-til-én. Du får en konkret vurdering af hvad der sker i kroppen, og
  hvad du selv kan gøre derhjemme før næste gang. Ingen pakkeforløb, ingen
  genbesøg du ikke har bedt om.

## Behandling, hvad vi arbejder med

- Eyebrow: `Behandling`
- H2: Hvad vi arbejder med
- Liste (3–6 punkter, hver med titel + kort beskrivelse i `treatments.items[]`):
  1. **Spændinger og stive muskler.** Nakke, skuldre, ryg.
  2. **Låste led.** Manuel mobilisering af ryg og bækken.
  3. **Smerter i bevægeapparatet.** Knæ, hofte, albue.
  4. **Hovedpine af spændingstype.** Kæbe, nakke, øvre ryg.
  5. **Genoptræning og kropsbevidsthed.** Øvelser at tage med hjem.
  6. **Idrætsskader.** Vurdering og en plan.

## Praktisk

- Eyebrow: `Praktisk`
- H2: Sådan finder du os
- Adresse: Martensens Allé 12, kld., 1828 Frederiksberg C
- Transport: 5 min gang fra Frederiksberg Metro (linje M1/M2);
  busser 9A og 31 stopper i nærheden.
- Åbningstider:

| Dag | Åbent |
|---|---|
| Mandag | 10:30 – 20:00 |
| Tirsdag | 10:30 – 19:00 |
| Onsdag | 10:30 – 19:00 |
| Torsdag | 10:30 – 20:00 |
| Fredag | 10:00 – 19:00 |
| Lørdag | Lukket |
| Søndag | Lukket |

- Tabellen er låst i `docs/spec.md §9`.

## Kontakt-blok (gentagelse)

- H2: Bestil tid eller spørg
- Tre handlinger som store knapper i én række:
  1. **Bestil tid** (primær) → Planway
  2. **Ring** → `tel:+4551529620`
  3. **Skriv** → `mailto:omidirnadk@gmail.com`

## Footer

- Linje 1: `Klinik for Manuel Terapi · Martensens Allé 12, kld. · 1828 Frederiksberg C`
- Linje 2: `Telefon +45 51 52 96 20 · omidirnadk@gmail.com`
- Linje 3: `CVR 36 22 09 45`
- Linje 4 (lille, dæmpet): `Foto: Toa Heftiba på Unsplash · © 2026`
  (fotograf-link: `https://unsplash.com/@heftiba`)

## Tekniske strenge

- `<title>`: `Klinik for Manuel Terapi · Frederiksberg`
- `<meta description>`: Manuel terapi, kropsterapi og smertevidenskab i
  Frederiksberg. Bestil tid online. ★ 4.9 på Google.
- OG image: `/img/og.jpg` (1200 × 630)
- `hreflang` peger på `/en/` med `lang="en"`.

## Kilder

- Live site: `docs/_live-site.html`
- Original mockup: `booking-ease-connect/site/`
- Bruger-instruks: indledende prompt i samtalen.
