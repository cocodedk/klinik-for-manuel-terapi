import { Link } from 'react-router-dom';
import type { Content } from '../content/types';

export interface SiteHeaderProps {
  t: Content;
}

/**
 * Sticky header. The clinic name is the back-to-top affordance per spec §5.
 * The lang switch keeps both anchors visible so a visitor on either route
 * always sees DA · EN; aria-current marks the active route. We use
 * react-router's <Link> so the hrefs resolve against the router basename
 * ('/klinik-for-manuel-terapi') instead of the host root, and we get
 * client-side navigation as a bonus.
 */
export default function SiteHeader({ t }: SiteHeaderProps) {
  const isDa = t.langCode === 'da';
  return (
    <header className="site-header">
      <div className="container">
        <a className="logo" href="#top">Klinik for Manuel Terapi</a>
        <nav className="lang" aria-label="Sprog / Language">
          <Link to="/" aria-current={isDa ? 'page' : undefined}>DA</Link>
          <span aria-hidden>·</span>
          <Link to="/en/" aria-current={!isDa ? 'page' : undefined}>EN</Link>
        </nav>
      </div>
    </header>
  );
}
