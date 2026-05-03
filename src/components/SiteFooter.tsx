import type { RefObject } from 'react';
import type { Content } from '../content/types';
import { MapPinIcon } from './icons';

export interface SiteFooterProps {
  t: Content;
  footerRef: RefObject<HTMLElement | null>;
}

export default function SiteFooter({ t, footerRef }: SiteFooterProps) {
  const { brandLine, address, mapHref, contactLine, cvrLine, photoCredit } = t.footer;
  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="container">
        <p>{brandLine}</p>
        <p>
          <a
            className="footer-map"
            href={mapHref}
            target="_blank"
            rel="noopener"
          >
            <MapPinIcon />
            <span>{address}</span>
          </a>
        </p>
        <p>{contactLine}</p>
        <p>{cvrLine}</p>
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
