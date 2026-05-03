import type { RefObject } from 'react';
import type { CtaTriple } from '../content/types';
import { useScrollVisibility } from '../hooks/useScrollVisibility';
import { CalendarIcon, PhoneIcon, MailIcon } from './icons';

export interface FabProps {
  cta: CtaTriple;
  heroRef: RefObject<HTMLElement | null>;
  footerRef: RefObject<HTMLElement | null>;
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
