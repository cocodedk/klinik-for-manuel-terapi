# Contributing to Klinik for Manuel Terapi

## Local setup

Prerequisites: Node 20+, pnpm 9+, Git, ImageMagick (for the hero image
pipeline).

```bash
git clone https://github.com/cocodedk/klinik-for-manuel-terapi.git
cd klinik-for-manuel-terapi
pnpm i
./scripts/install-hooks.sh   # one-time, sets core.hooksPath
```

## Local git config (recommended)

Run once after cloning:

```bash
git config pull.rebase true
git config core.autocrlf input            # macOS / Linux
git config push.autoSetupRemote true
git config init.defaultBranch main
```

Windows contributors: `git config core.autocrlf true`.

## Build, test, smoke

```bash
pnpm dev                  # http://localhost:5173/klinik-for-manuel-terapi/
pnpm tsc --noEmit         # type-check (smoke)
pnpm build                # vite-ssg build → dist/
pnpm preview              # serve dist/ locally
```

The pre-commit hook runs `pnpm tsc --noEmit && pnpm build`. Fast enough for
this project; if it ever exceeds 30 s, switch to a lighter `pnpm lint`.

## Coding style

- TypeScript strict mode is on. No `any` without a comment justifying it.
- Functional React components only. No class components.
- Plain CSS in `src/styles/`, no CSS-in-JS, no preprocessor.
- One concept per file. Maximum **200 lines** — extract before growing past.
- No `linear-gradient`, `radial-gradient`, or `conic-gradient` anywhere in
  shipped CSS. Solid fills + shadows only (per the design system).
- Mobile-first. Only `min-width` media queries. Test at 375 × 667 first.

## Branch naming

Branch prefix matches the Conventional Commit type:

| Prefix | Commit type | Example |
|---|---|---|
| `feature/` | `feat:` | `feature/lang-switcher` |
| `fix/` | `fix:` | `fix/fab-overlap-on-footer` |
| `chore/` | `chore:` | `chore/bump-vite` |
| `docs/` | `docs:` | `docs/update-spec` |
| `refactor/` | `refactor:` | `refactor/extract-hero-card` |
| `ci/` | `ci:` | `ci/dependabot` |

Kebab-case, never directly to `main`.

## Conventional Commits

The `commit-msg` hook enforces this format:

```
<type>(<optional scope>): <description>
```

Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`,
`build`, `perf`, `revert`.

## Pull request checklist

- [ ] Smoke check passes locally (`pnpm tsc --noEmit && pnpm build`).
- [ ] Every touched file is ≤ 200 lines.
- [ ] No new gradient declarations in CSS.
- [ ] If copy changed, ran `/humanizer-da` (Danish) or `/humanizer`
      (English) over the edited strings.
- [ ] Manual mobile test at 375 × 667; FAB cluster behaviour verified.
- [ ] Lighthouse mobile ≥ 95 across all four categories.
- [ ] Updated `docs/spec.md` or `docs/design.md` if behaviour or design changed.

## Where things live

- **Specification & plans**: `docs/`. Read `docs/spec.md` first.
- **Design tokens & system**: `docs/design.md`.
- **Customer-facing copy**: `src/content/da.ts`, `src/content/en.ts`
  (drafted in `docs/content-{da,en}.md`).
- **Build / deploy**: `.github/workflows/`.

## Reporting issues

See [SECURITY.md](SECURITY.md) for security reports. For everything else,
open a GitHub issue with the bug-report or feature-request template.
