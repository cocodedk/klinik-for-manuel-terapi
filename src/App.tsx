import { useEffect, useRef } from 'react';
import { da } from './content/da';
import { en } from './content/en';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { Fab } from './components/Fab';
import HeadMeta from './components/HeadMeta';
import Home from './pages/Home';
import About from './pages/About';

type Lang = 'da' | 'en';
type Page = 'home' | 'about';

interface AppProps {
  lang: Lang;
  page: Page;
}

const HREFLANGS: Record<Page, [string, string][]> = {
  home: [
    ['da', '/'],
    ['en', '/en/'],
    ['x-default', '/'],
  ],
  about: [
    ['da', '/om-mig'],
    ['en', '/en/about-me'],
    ['x-default', '/om-mig'],
  ],
};

export default function App({ lang, page }: AppProps) {
  const t = lang === 'da' ? da : en;
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isAbout = page === 'about';
  const headTitle = isAbout ? t.aboutPage.title : undefined;
  const headDesc = isAbout ? t.aboutPage.description : undefined;
  const headOg = isAbout ? '/img/omid.jpg' : undefined;

  useEffect(() => {
    document.documentElement.lang = lang;
    const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
    for (const [hl, path] of HREFLANGS[page]) {
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
  }, [lang, page]);

  return (
    <>
      <HeadMeta t={t} title={headTitle} description={headDesc} ogImage={headOg} />
      <a id="top" />
      <div className="parallax" aria-hidden />
      <SiteHeader t={t} />
      <main>
        {isAbout ? <About t={t} /> : <Home t={t} heroRef={heroRef} />}
      </main>
      <SiteFooter t={t} footerRef={footerRef} />
      <Fab cta={t.cta} heroRef={heroRef} footerRef={footerRef} />
    </>
  );
}
