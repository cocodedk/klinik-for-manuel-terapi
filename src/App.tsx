import { useEffect, useRef } from 'react';
import { da } from './content/da';
import { en } from './content/en';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { Fab } from './components/Fab';
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
    document.title = t.title;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = t.description;
    const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
    for (const [hl, path] of HREFLANGS) {
      let l = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hl}"]`);
      if (!l) {
        l = document.createElement('link');
        l.rel = 'alternate';
        l.hreflang = hl;
        document.head.appendChild(l);
      }
      l.href = base + path;
    }
  }, [lang, t]);

  return (
    <>
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
