import type { Content } from '../content/types';
import Button from './Button';

export interface ContactRowProps {
  t: Content;
}

export default function ContactRow({ t }: ContactRowProps) {
  const { cta, h2 } = t.contactBlock;
  return (
    <>
      <p className="eyebrow">{cta.bookLabel}</p>
      <h2>{h2}</h2>
      <div className="contact-row">
        <Button
          variant="primary"
          href={cta.bookHref}
          target="_blank"
          rel="noopener"
        >
          {cta.bookLabel}
        </Button>
        <Button
          variant="ghost"
          href={`tel:${cta.phoneE164}`}
          ariaLabel={`${cta.phoneLabel} ${cta.phoneDisplay}`}
        >
          {cta.phoneLabel}
        </Button>
        <Button
          variant="ghost"
          href={`mailto:${cta.email}`}
          ariaLabel={`${cta.emailLabel} ${cta.email}`}
        >
          {cta.emailLabel}
        </Button>
      </div>
    </>
  );
}
