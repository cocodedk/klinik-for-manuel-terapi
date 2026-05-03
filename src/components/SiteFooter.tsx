import type { RefObject } from 'react';
import type { Content } from '../content/types';

export interface SiteFooterProps {
  t: Content;
  footerRef: RefObject<HTMLElement | null>;
}

export default function SiteFooter({ t, footerRef }: SiteFooterProps) {
  const { lines, photoCredit } = t.footer;
  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="container">
        {lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p>
          {photoCredit.prefix}{' '}
          <a
            href={photoCredit.photographerHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {photoCredit.photographer}
          </a>
          {' '}{photoCredit.suffix}
        </p>
      </div>
    </footer>
  );
}
