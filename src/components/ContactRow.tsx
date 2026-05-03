import type { Content } from '../content/types';
import CtaButtons from './CtaButtons';

export interface ContactRowProps {
  t: Content;
}

export default function ContactRow({ t }: ContactRowProps) {
  const { cta, h2 } = t.contactBlock;
  return (
    <>
      <h2>{h2}</h2>
      <div className="contact-row">
        <CtaButtons cta={cta} />
      </div>
    </>
  );
}
