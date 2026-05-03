# Plan overview

Each numbered file under `docs/plans/` is a self-contained task an agent can
pick up without reading any other plan. Read `docs/spec.md` and
`docs/design.md` first; reference `docs/content-da.md` and
`docs/content-en.md` when assembling pages.

## Plan 00 — already done (GitHub infra)

Before any of the numbered plans run, the repo root already contains:

- `README.md` (with mermaid sitemap + external-resource flowchart)
- `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `LICENSE` (Apache-2.0)
- `.gitignore`, `.gitattributes`
- `.github/` — `CODEOWNERS`, `dependabot.yml`, `pull_request_template.md`,
  `ISSUE_TEMPLATE/`, `workflows/ci.yml`, `workflows/deploy-pages.yml`
- `.githooks/pre-commit`, `.githooks/commit-msg`
- `scripts/install-hooks.sh`, `scripts/setup-repo.sh`

These were produced by the `/github-setup` pass. Agents executing later
plans should not regenerate them — they should be treated as part of the
project's existing state.

## Dependency graph

```
01 scaffold ────────────────────────────────────────► 04 components
                ├─► 02 tokens-base ─► 03 layout-parallax ─► 04 components
                │                                          ├─► 05 fab-interactions
                │                                          └─► 07 html-da ─┐
                ├─► 06 content-da-source ──────────────────► 07 html-da ───┤
                │                                                          ├─► 09 humanize ─► 10 qa
                └─► 08 translate-en ───────────────────────────────────────┤
                                                                            
```

Tasks in the same column may run in parallel:

- After **01**, run **02**, **06**, and (early) the asset side of **04** in
  parallel.
- After **02**, run **03** and the JS side of **05** in parallel.
- **07** waits on **02 + 03 + 04 + 05 + 06**.
- **08** can start once **07** is in review (translation needs the assembled
  Danish HTML as the structural reference).
- **09** runs `/humanizer-da` on `index.html` and `/humanizer` on
  `en/index.html`.
- **10** is the final 200-line + accessibility + Lighthouse audit.

## Index

| # | File | Title | Owner type |
|---|---|---|---|
| 01 | `01-scaffold.md` | Vite + React scaffold + assets | infra |
| 02 | `02-tokens-base.md` | `src/styles/tokens.css`, `base.css` | css |
| 03 | `03-layout-parallax.md` | `src/styles/layout.css` | css |
| 04 | `04-components.md` | `src/styles/components.css` + small React components | css + react |
| 05 | `05-fab-interactions.md` | `Fab.tsx` + `useScrollVisibility.ts` + `fab.css` | react |
| 06 | `06-content-da-source.md` | Verify Danish source copy + types | content |
| 07 | `07-home-da.md` | `Home.tsx` route + `content/da.ts` | react |
| 08 | `08-translate-en.md` | `content/en.ts` + `/en` route + i18n switcher | react |
| 09 | `09-humanize.md` | Humanize DA + EN copy via `/humanizer-da` and `/humanizer` | content |
| 10 | `10-qa.md` | Build + prerender + 200-line + a11y + Lighthouse | qa |

## File-size budget

Hard ceiling 200 lines per file. Soft target per file:

| File | Soft target |
|---|---|
| `index.html` (Vite shell) | ≤ 60 |
| `src/main.tsx` | ≤ 30 |
| `src/App.tsx` | ≤ 80 |
| `src/pages/Home.tsx` | ≤ 180 |
| `src/components/*.tsx` | ≤ 120 each |
| `src/content/{da,en}.ts` | ≤ 180 each |
| `src/styles/tokens.css` | ≤ 80 |
| `src/styles/base.css` | ≤ 120 |
| `src/styles/layout.css` | ≤ 120 |
| `src/styles/components.css` | ≤ 180 |
| `src/styles/fab.css` | ≤ 80 |
| `src/hooks/useScrollVisibility.ts` | ≤ 60 |

If any file approaches the ceiling, split before merging.

## Acceptance for the whole effort

- `pnpm build` (or `npm run build`) succeeds and produces prerendered
  `dist/index.html` and `dist/en/index.html`, both with route-correct
  `<title>` and `<meta description>` baked in.
- `pnpm preview` serves the built site and both routes hydrate without
  console errors.
- DA + EN pages both render mobile-first with hero rating, primary CTA, and
  contact row above the fold on a 375 × 667 viewport.
- FAB cluster appears once hero is out of view and never overlaps the footer.
- Lighthouse mobile ≥ 95 across all four categories.
- Every source file under `src/` and the project root passes the 200-line
  check (enforced by `docs/plans/10-qa.md`).
- No `linear-gradient`, `radial-gradient`, or `conic-gradient` in any
  shipped CSS file (`grep -RInE 'linear-gradient|radial-gradient|conic-gradient' src/styles/`
  returns nothing).
