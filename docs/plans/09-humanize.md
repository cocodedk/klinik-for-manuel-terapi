# Plan 09 — Humanize DA + EN copy

## Goal

Run `/humanizer-da` over every Danish string and `/humanizer` over every
English string so the site does not read as AI-drafted. The TypeScript
contract from plan 06 stays frozen — only the *values* change.

## Inputs

- `src/content/da.ts` (plan 07)
- `src/content/en.ts` (plan 08)
- The skills `/humanizer-da` and `/humanizer` (also `humanizer-job-da` if
  any future job-application copy ever appears — not the case here).

## Outputs

- `src/content/da.ts` rewritten in-place with humanized Danish.
- `src/content/en.ts` rewritten in-place with humanized English.
- A short delta note in `docs/_humanize-notes.md` listing strings that were
  rewritten significantly enough that the user should re-read them (not a
  hard requirement; a courtesy).

## Steps

### 1 · Run `/humanizer-da` on Danish strings

For each text-bearing field in `da.ts` (title, description, hero.eyebrow,
hero.deco, hero.h1, hero.lead, hero.metaLine, about.body[], treatments
items, practical.transport, contactBlock.h2, footer.lines[]):

1. Pull the string out and feed it to `/humanizer-da`.
2. Apply the rewrite back into `da.ts`.
3. Sanity-check: verify the rewrite still fits the design constraints —
   eyebrows stay short, lead stays under ~120 chars, list items remain
   parallel in structure.

Numbers, addresses, phone, email, URLs, hours are **never** humanized.

### 2 · Run `/humanizer` on English strings

Same pass on `en.ts`. The English humanizer does *not* know about Danish
cultural or stylistic norms — keep an eye on tone parity with the Danish
version (formality level should match).

### 3 · Constraint checks after humanization

- Eyebrow strings: ≤ 32 characters, uppercase-friendly.
- Hero h1: ≤ 60 characters.
- Hero lead: ≤ 140 characters (mobile readability).
- Treatment item titles: ≤ 30 characters; bodies ≤ 90.
- `<title>`: 50–60 characters.
- `<meta description>`: 140–160 characters.

If a humanized string blows a budget, ask the model for a tighter rewrite
once and pick the better of the two.

### 4 · Re-export and re-test

```bash
pnpm tsc --noEmit
pnpm dev   # eyeball both routes in a 375 × 667 viewport
```

### 5 · Optional: notes file

Create `docs/_humanize-notes.md` (gitignored if desired) listing any string
where the humanizer changed meaning rather than tone — flag those for the
user before publishing.

## Acceptance

- `da.ts` and `en.ts` both humanized; structure unchanged.
- Constraint checks above all pass.
- Both routes still render correctly in `pnpm dev`.
- The user reviews and signs off on the humanized copy.

## Out of scope

- Touching the Content type (plan 06).
- Touching layout / components / styles.
- Final QA (plan 10).
