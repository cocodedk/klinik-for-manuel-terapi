import { useEffect, useRef } from 'react';
import { da } from './content/da';
import { en } from './content/en';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { Fab } from './components/Fab';
import HeadMeta from './components/HeadMeta';
import Home from './pages/Home';

type Lang = 'da' | 'en';

interface AppProps {
  lang: Lang;
}

const HREFLANGS: [string, string][] = [
  ['da', '/'],
  ['en', '/en/'],
  ['x-default', '/'],
];

export default function App({ lang }: AppProps) {
  const t = lang === 'da' ? da : en;
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
    for (const [hl, path] of HREFLANGS) {
      let l = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hl}"]`);
      if (!l) {
        l = document.createElement('link');
        l.rel = 'alternate';
        l.hreflang = hl;
        document.head.appendChild(l);
      }
      const next = base + path;
      if (l.href !== next) l.href = next;
    }
  }, [lang]);

  return (
    <>
      <HeadMeta t={t} />
      <a id="top" />
      <div className="parallax" aria-hidden />
      <SiteHeader t={t} />
      <main>
        <Home t={t} heroRef={heroRef} />
      </main>
      <SiteFooter t={t} footerRef={footerRef} />
      <Fab cta={t.cta} heroRef={heroRef} footerRef={footerRef} />
    </>
  );
}
