# Plan 01 — Vite + React scaffold + assets

## Goal

Lay down a Vite + React + TypeScript project with React Router, prerender,
fonts, hero imagery, favicon, and a minimal `README` / `.gitignore`. No
styles or page bodies yet — those land in plans 02–08.

## Inputs

- `docs/spec.md` §7
- User confirmation of: deploy target, hero photo choice (see §4 below).

## Outputs

```
/
├── index.html               (Vite shell, ≤ 60 lines)
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── main.tsx             (≤ 30 lines)
│   ├── App.tsx              (route shell stub, ≤ 40 lines)
│   ├── pages/Home.tsx       (placeholder export)
│   ├── components/.gitkeep
│   ├── content/.gitkeep
│   ├── hooks/.gitkeep
│   └── styles/.gitkeep
├── public/
│   ├── img/{hero-1600.jpg,hero-800.jpg,og.jpg,favicon.svg}
│   └── fonts/{newsreader-variable.woff2,newsreader-italic-variable.woff2,manrope-variable.woff2}
├── .gitignore
└── README.md
```

## Steps

### 1 · Bootstrap

```bash
pnpm create vite@latest . -- --template react-ts   # or npm create
pnpm i react-router-dom
pnpm i -D vite-react-ssg
```

`vite-react-ssg` is the build-time prerender; if it conflicts with anything
later, swap to `vite-plugin-prerender` — the route definitions stay
identical.

### 2 · `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/klinik-for-manuel-terapi/',  // GH Pages project subpath
  plugins: [react()],
  build: { outDir: 'dist', sourcemap: false },
});
```

Add `vite-react-ssg` per its README in plan 10 once routes exist; keep this
file ≤ 30 lines.

After the build, copy `dist/index.html` to `dist/404.html` so GitHub Pages
serves the SPA shell on deep-link refreshes (`/en/...` reloads otherwise
404). One-line addition to the build script:
`"build": "vite-ssg build && cp dist/index.html dist/404.html"`.

### 3 · `index.html` shell

≤ 60 lines. Includes `<link rel="preload" as="font">` for the three WOFF2
faces with `crossorigin`, `<meta charset>`, `<meta name="viewport">`, the
default `<title>` (overridden per-route at prerender time), and the Vite
mount point:

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

### 4 · Hero image

Pick one Unsplash photo (criteria in `docs/design.md` §6). Two suggested
search URLs:

- https://unsplash.com/s/photos/manual-therapy
- https://unsplash.com/s/photos/scandinavian-treatment-room

Confirm with the user before downloading. Then:

```bash
curl -sSL "<full-resolution-unsplash-url>" -o public/img/_src.jpg
magick public/img/_src.jpg -resize 1600x900^ -gravity center -extent 1600x900 -quality 78 public/img/hero-1600.jpg
magick public/img/_src.jpg -resize 800x450^  -gravity center -extent 800x450  -quality 78 public/img/hero-800.jpg
magick public/img/hero-1600.jpg -resize 1200x630^ -gravity center -extent 1200x630 -quality 80 public/img/og.jpg
rm public/img/_src.jpg
```

Record the photographer + URL in `README.md §Credits` — used by the footer
in plans 07 and 08.

### 5 · Fonts

Use `https://gwfh.mranftl.com/fonts` to download self-hostable variable
WOFF2:

- `Newsreader` (roman + italic, weights 400–700, latin + latin-ext).
- `Manrope` (roman, weights 400–700, latin + latin-ext).

Save as the three filenames shown in the tree, into `public/fonts/`. Do
**not** commit static-weight fallbacks.

### 6 · Favicon

Flat SVG glyph in `--brand` (`hsl(155 28% 32%)`) on transparent — the letter
`m` in Newsreader italic, 32 × 32 viewBox, single `<path>`. Save as
`public/img/favicon.svg` and reference it in `index.html`.

### 7 · `src/main.tsx` (stub)

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/tokens.css'; // populated by plan 02
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/fab.css';

const router = createBrowserRouter([
  { path: '/',    element: <App lang="da" /> },
  { path: '/en/', element: <App lang="en" /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode><RouterProvider router={router} /></StrictMode>
);
```

### 8 · `src/App.tsx` stub

≤ 40 lines, just a `lang` prop and a placeholder `<Home>` import. Real
content lands in plan 07.

### 9 · Pre-existing root files (do **not** overwrite)

The following are already in place from the GitHub infra pass and are part
of the spec — Vite scaffolding will offer to overwrite some; decline:

```
README.md          CLAUDE.md            CONTRIBUTING.md
SECURITY.md        LICENSE              .gitignore
.gitattributes     .github/             .githooks/
scripts/           docs/
```

When `pnpm create vite` asks about overwriting `README.md`, say **no**. The
generated Vite README is generic; ours is the source of truth. Same for
`.gitignore` (the existing one already covers `node_modules`, `dist`,
`booking-ease-connect`, etc.).

After the Vite scaffold completes, update `package.json`:

- `"name": "klinik-for-manuel-terapi"`
- add `"build": "vite-ssg build && cp dist/index.html dist/404.html"`
- add `"preview": "vite preview"` (Vite default; keep)
- add `"typecheck": "tsc --noEmit"`

## Acceptance

- `pnpm dev` starts Vite on `http://localhost:5173/` without errors.
- Hitting `/` and `/en/` both render an empty page (no 404).
- `wc -l index.html src/main.tsx src/App.tsx README.md` — each ≤ ceiling.
- `ls public/fonts/*.woff2` shows three files, each < 200 KB.
- `file public/img/hero-1600.jpg` reports a JPEG of the expected size.

## Out of scope

- Visual styling (plans 02–05).
- Page content (plans 07, 08).
- Deploy config — pick a target with the user before plan 10 wires CI.
