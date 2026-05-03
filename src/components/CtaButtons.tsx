import type { CtaTriple } from '../content/types';
import Button from './Button';
import { PhoneIcon, MailIcon } from './icons';

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
        iconOnly
        href={`tel:${cta.phoneE164}`}
        ariaLabel={`${cta.phoneLabel} ${cta.phoneDisplay}`}
      >
        <PhoneIcon />
      </Button>
      <Button
        variant="ghost"
        iconOnly
        href={`mailto:${cta.email}`}
        ariaLabel={`${cta.emailLabel} ${cta.email}`}
      >
        <MailIcon />
      </Button>
    </>
  );
}
