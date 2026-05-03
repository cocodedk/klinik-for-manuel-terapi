import type { RefObject } from 'react';
import type { Content } from '../content/types';

export interface SiteFooterProps {
  t: Content;
  footerRef: RefObject<HTMLElement | null>;
}

/**
 * Footer. The ref is forwarded to the raw <footer> so the FAB hook can
 * observe it via IntersectionObserver and hide the cluster on approach.
 */
export default function SiteFooter({ t, footerRef }: SiteFooterProps) {
  const { lines, photoCredit } = t.footer;
  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="container">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>
          Foto:{' '}
          <a
            href={photoCredit.photographerHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {photoCredit.photographer}
          </a>
          {' '}på Unsplash · © 2026
        </p>
      </div>
    </footer>
  );
}
