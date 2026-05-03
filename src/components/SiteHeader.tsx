import type { Content } from '../content/types';

export interface SiteHeaderProps {
  t: Content;
}

/**
 * Sticky header. The clinic name is the back-to-top affordance per spec §5.
 * The lang switch keeps both anchors visible so a visitor on either route
 * always sees DA · EN; aria-current marks the active route.
 */
export default function SiteHeader({ t }: SiteHeaderProps) {
  const isDa = t.langCode === 'da';
  return (
    <header className="site-header">
      <div className="container">
        <a className="logo" href="#top">Klinik for Manuel Terapi</a>
        <nav className="lang" aria-label="Sprog / Language">
          <a href="/" aria-current={isDa ? 'page' : undefined}>DA</a>
          <span aria-hidden>·</span>
          <a href="/en/" aria-current={!isDa ? 'page' : undefined}>EN</a>
        </nav>
      </div>
    </header>
  );
}
