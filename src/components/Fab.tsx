import type { RefObject } from 'react';
import type { CtaTriple } from '../content/types';
import { useScrollVisibility } from '../hooks/useScrollVisibility';

export interface FabProps {
  cta: CtaTriple;
  heroRef: RefObject<HTMLElement | null>;
  footerRef: RefObject<HTMLElement | null>;
}

const SVG_PROPS = {
  'aria-hidden': true,
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function CalendarIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path d="M7 3v3M17 3v3M3.5 9h17M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V7A1.5 1.5 0 0 1 5 5.5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path d="M5 4.5h3l1.5 4-2 1.25a12 12 0 0 0 6.75 6.75L15.5 14.5l4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A14 14 0 0 1 3.5 6 1.5 1.5 0 0 1 5 4.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg {...SVG_PROPS}>
      <path d="M4 6.5h16a.5.5 0 0 1 .5.5v10a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17V7a.5.5 0 0 1 .5-.5Z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function Fab({ cta, heroRef, footerRef }: FabProps) {
  const visible = useScrollVisibility({ heroRef, footerRef });

  return (
    <div
      className={visible ? 'fab is-visible' : 'fab'}
      aria-hidden={visible ? undefined : true}
    >
      <a
        className="fab__btn fab__btn--primary"
        href={cta.bookHref}
        target="_blank"
        rel="noopener"
      >
        <CalendarIcon />
        <span>{cta.bookLabel}</span>
      </a>
      <a
        className="fab__btn fab__btn--icon"
        href={`tel:${cta.phoneE164}`}
        aria-label={cta.phoneLabel}
      >
        <PhoneIcon />
      </a>
      <a
        className="fab__btn fab__btn--icon"
        href={`mailto:${cta.email}`}
        aria-label={cta.emailLabel}
      >
        <MailIcon />
      </a>
    </div>
  );
}
