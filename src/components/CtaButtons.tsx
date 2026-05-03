import type { CtaTriple } from '../content/types';
import Button from './Button';

export interface CtaButtonsProps {
  cta: CtaTriple;
}

export default function CtaButtons({ cta }: CtaButtonsProps) {
  return (
    <>
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
    </>
  );
}
