import { useEffect, useRef } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { da } from './content/da';
import { en } from './content/en';
import type { ConditionBlock } from './content/types';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { Fab } from './components/Fab';
import HeadMeta from './components/HeadMeta';
import Home from './pages/Home';
import About from './pages/About';
import ConditionPage from './pages/ConditionPage';

type Lang = 'da' | 'en';
type Page = 'home' | 'about' | 'condition';

interface AppProps {
  lang: Lang;
  page: Page;
  condition?: ConditionBlock;
}

const hl = (da: string, en: string): [string, string][] => [
  ['da', da],
  ['en', en],
  ['x-default', da],
];

const STATIC_HREFLANGS: Record<'home' | 'about', [string, string][]> = {
  home: hl('/', '/en/'),
  about: hl('/om-mig', '/en/about-me'),
};

function getHreflangs(page: Page, condition?: ConditionBlock): [string, string][] {
  if (page === 'condition' && condition) {
    const isEn = condition.slug.startsWith('/en/');
    const da = isEn ? condition.altSlug : condition.slug;
    const en = isEn ? condition.slug : condition.altSlug;
    return hl(da, en);
  }
  return STATIC_HREFLANGS[page === 'about' ? 'about' : 'home'];
}

export default function App({ lang, page, condition }: AppProps) {
  const t = lang === 'da' ? da : en;
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isHome = page === 'home';
  const isAbout = page === 'about';
  const isCondition = page === 'condition';
  const headTitle = isAbout
    ? t.aboutPage.title
    : isCondition && condition
      ? condition.title
      : undefined;
  const headDesc = isAbout
    ? t.aboutPage.description
    : isCondition && condition
      ? condition.description
      : undefined;
  const headOg = isAbout ? t.aboutPage.ogImage : undefined;

  useEffect(() => {
    document.documentElement.lang = lang;
    const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
    for (const [hl, path] of getHreflangs(page, condition)) {
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
  }, [lang, page, condition]);

  return (
    <>
      <HeadMeta t={t} title={headTitle} description={headDesc} ogImage={headOg} />
      <ScrollRestoration />
      <a id="top" />
      <div className="parallax" aria-hidden />
      <SiteHeader t={t} />
      <main>
        {isAbout && <About t={t} />}
        {isCondition && condition && <ConditionPage condition={condition} t={t} />}
        {isHome && <Home t={t} heroRef={heroRef} />}
      </main>
      <SiteFooter t={t} footerRef={footerRef} />
      {isHome && <Fab cta={t.cta} heroRef={heroRef} footerRef={footerRef} />}
    </>
  );
}
