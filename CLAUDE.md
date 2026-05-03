# CLAUDE.md — Klinik for Manuel Terapi

Bilingual mobile-first landing page for Klinik for Manuel Terapi
(Frederiksberg). Vite + React 18 + TypeScript, prerendered to static HTML,
deployed to GitHub Pages at
`https://cocodedk.github.io/klinik-for-manuel-terapi/`.

- **Language / Runtime**: TypeScript on Node 20+
- **Framework**: React 18, react-router-dom v6, vite-react-ssg (prerender)
- **Styling**: plain CSS files under `src/styles/`, no CSS-in-JS, no Tailwind
- **i18n**: two static content objects (`src/content/da.ts`,
  `src/content/en.ts`) consumed by one `Home` component

## Required skills — always invoke

| Situation | Skill |
|---|---|
| Before any new feature or section | `superpowers:brainstorming` |
| Planning multi-step changes | `superpowers:writing-plans` |
| Writing or fixing core logic | `superpowers:test-driven-development` |
| First sign of a bug or failure | `superpowers:systematic-debugging` |
| Before completing a feature branch | `superpowers:requesting-code-review` |
| Before claiming any task done | `superpowers:verification-before-completion` |
| Working on UI / frontend | `frontend-design:frontend-design` |
| Touching Danish customer copy | `humanizer-da` |
| Touching English customer copy | `humanizer` |
| After implementing — quality pass | `simplify` |

## Architecture

```
.
├── docs/                      ← spec, design, content, plans (source of truth)
├── src/
│   ├── main.tsx               ← React mount + router
│   ├── App.tsx                ← shell: header, parallax, FAB, footer
│   ├── pages/Home.tsx         ← single home component, takes a `t` prop
│   ├── components/            ← presentational pieces
│   ├── content/{da,en,types}.ts
│   ├── hooks/                 ← useScrollVisibility for the FAB
│   └── styles/                ← tokens, base, layout, components, fab
├── public/                    ← img/, fonts/, favicon
├── .github/                   ← CI, deploy-pages, templates
├── .githooks/                 ← pre-commit, commit-msg
└── scripts/                   ← install-hooks.sh, setup-repo.sh
```

### Layer rules

- `src/components/` must not import from `src/pages/`.
- `src/content/` is data only; never imports React.
- Anything that knows about scroll position lives in `src/hooks/`.

## Coding conventions

- [ ] **200-line maximum** per file. Extract before crossing.
- [ ] TypeScript strict; no `any` without a comment that names the reason.
- [ ] Plain class names; no CSS modules, no `clsx`, no styled-components.
- [ ] Functional React, no classes.
- [ ] Mobile-first; only `min-width` media queries.
- [ ] **No gradients in CSS.** Solid fills + shadows only.
- [ ] Customer copy lives in `src/content/{da,en}.ts` — never inline JSX text.
- [ ] All `target="_blank"` anchors carry `rel="noopener"`.
- [ ] Tap targets ≥ 44 × 44 px; FAB targets are 56 px.

## Engineering principles

### File size
Hard cap at 200 lines. Soft targets are listed in `docs/plans/00-overview.md`.

### DRY · SOLID · KISS · YAGNI
Extract shared logic; one job per file/component; only build what the spec
asks for; delete dead code on sight.

### TDD where it pays
The components are mostly presentational, so TDD is overkill for those.
Apply TDD to `useScrollVisibility` and any future logic with conditionals
or edge cases.

### Commit hygiene
Conventional Commits, enforced by `.githooks/commit-msg`. New commits over
amends. Never `--no-verify`.

## Build commands

```bash
pnpm dev                  # Vite dev server with /klinik-for-manuel-terapi/ base
pnpm tsc --noEmit         # type-check
pnpm build                # vite-ssg build → dist/index.html + dist/en/index.html
pnpm preview              # serve dist/
```

The pre-commit hook runs `pnpm tsc --noEmit && pnpm build`.

## Key files

| File | Purpose |
|------|---------|
| `docs/spec.md` | Requirements, contact data, deploy target |
| `docs/design.md` | Tokens, typography, components, motion |
| `docs/content-{da,en}.md` | Customer copy source (markdown) |
| `src/content/{da,en}.ts` | The same copy, typed |
| `vite.config.ts` | Sets `base: '/klinik-for-manuel-terapi/'` |
| `.github/workflows/deploy-pages.yml` | GH Pages deploy |
| `scripts/setup-repo.sh` | Branch protection + merge config |

## Starting a new session

1. Read this file.
2. Read `docs/spec.md` and the most recent plan(s).
3. Run `pnpm tsc --noEmit && pnpm build` to confirm green.
4. Invoke `superpowers:brainstorming` before changing visible behaviour.
5. Invoke `humanizer-da` / `humanizer` when copy is the change.
