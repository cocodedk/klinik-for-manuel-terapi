import { Link } from 'react-router-dom';
import type { Content } from '../content/types';

export interface SiteHeaderProps {
  t: Content;
  daHref: string;
  enHref: string;
}

/**
 * Sticky header. The clinic name is the back-to-top affordance per spec §5.
 * daHref/enHref come from App so the lang switch lands on the equivalent
 * page in the other language (e.g. /nakkesmerter ↔ /en/neck-pain) instead
 * of always sending visitors back to the home page.
 */
export default function SiteHeader({ t, daHref, enHref }: SiteHeaderProps) {
  const isDa = t.langCode === 'da';
  return (
    <header className="site-header">
      <div className="container">
        <a className="logo" href="#top">Klinik for Manuel Terapi</a>
        <nav className="lang" aria-label="Sprog / Language">
          <Link to={daHref} aria-current={isDa ? 'page' : undefined}>DA</Link>
          <span aria-hidden>·</span>
          <Link to={enHref} aria-current={!isDa ? 'page' : undefined}>EN</Link>
        </nav>
      </div>
    </header>
  );
}
