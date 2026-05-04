import { useEffect, useRef } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import { da } from './content/da';
import { en } from './content/en';
import type { ConditionBlock, Content } from './content/types';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import { Fab } from './components/Fab';
import HeadMeta from './components/HeadMeta';
import Home from './pages/Home';
import About from './pages/About';
import ConditionPage from './pages/ConditionPage';
import ReviewsPage from './pages/ReviewsPage';

type Lang = 'da' | 'en';
type Page = 'home' | 'about' | 'condition' | 'reviews';

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

function getLangPair(page: Page, condition?: ConditionBlock): { da: string; en: string } {
  if (page === 'condition' && condition) {
    const isEn = condition.slug.startsWith('/en/');
    return {
      da: isEn ? condition.altSlug : condition.slug,
      en: isEn ? condition.slug : condition.altSlug,
    };
  }
  if (page === 'about') return { da: '/om-mig', en: '/en/about-me' };
  if (page === 'reviews') return { da: '/anmeldelser', en: '/en/reviews' };
  return { da: '/', en: '/en/' };
}

function getHreflangs(page: Page, condition?: ConditionBlock): [string, string][] {
  const { da, en } = getLangPair(page, condition);
  return hl(da, en);
}

function getHeadMeta(
  page: Page,
  t: Content,
  condition?: ConditionBlock,
): { title: string | undefined; desc: string | undefined } {
  if (page === 'about') return { title: t.aboutPage.title, desc: t.aboutPage.description };
  if (page === 'reviews') return { title: t.reviewsPage.title, desc: t.reviewsPage.description };
  if (page === 'condition' && condition) return { title: condition.title, desc: condition.description };
  return { title: undefined, desc: undefined };
}

export default function App({ lang, page, condition }: AppProps) {
  const t = lang === 'da' ? da : en;
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isHome = page === 'home';
  const { title: headTitle, desc: headDesc } = getHeadMeta(page, t, condition);
  const headOg = page === 'about' ? t.aboutPage.ogImage : undefined;
  const { da: daHref, en: enHref } = getLangPair(page, condition);

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
      <SiteHeader t={t} daHref={daHref} enHref={enHref} />
      <main>
        {page === 'about' && <About t={t} />}
        {page === 'condition' && condition && <ConditionPage condition={condition} t={t} />}
        {page === 'home' && <Home t={t} heroRef={heroRef} />}
        {page === 'reviews' && <ReviewsPage t={t} />}
      </main>
      <SiteFooter t={t} footerRef={footerRef} />
      {isHome && <Fab cta={t.cta} heroRef={heroRef} footerRef={footerRef} />}
    </>
  );
}
