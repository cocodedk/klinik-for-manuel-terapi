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

/**
 * Route shell: picks the localized content object, syncs <html lang>,
 * <title>, and meta description, and wires the parallax + sticky header
 * + sticky FAB cluster + footer with refs for the visibility observer.
 * vite-react-ssg + a Helmet integration land in plan 10; for now the
 * meta is set at runtime only (good enough until prerender ships).
 */
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
  }, [lang, t.title, t.description]);

  return (
    <>
      <a id="top" />
      <div className="parallax" aria-hidden />
      <SiteHeader t={t} />
      <main>
        <Home t={t} heroRef={heroRef} />
      </main>
      <SiteFooter t={t} footerRef={footerRef} />
      <Fab
        bookingUrl={t.cta.bookHref}
        bookingLabel={t.cta.bookLabel}
        phoneE164={t.cta.phoneE164}
        phoneLabel={t.cta.phoneLabel}
        email={t.cta.email}
        emailLabel={t.cta.emailLabel}
        heroRef={heroRef}
        footerRef={footerRef}
      />
    </>
  );
}
