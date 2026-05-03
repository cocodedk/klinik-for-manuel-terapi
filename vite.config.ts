import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project subpath. The site deploys to
// https://cocodedk.github.io/klinik-for-manuel-terapi/ so all asset URLs
// must resolve under this base. Plan 10 will add prerender (vite-react-ssg);
// for now the SPA bundle is enough to validate the scaffold.
export default defineConfig({
  base: '/klinik-for-manuel-terapi/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
