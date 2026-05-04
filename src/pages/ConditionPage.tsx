import type { ConditionBlock, Content } from '../content/types';
import Section from '../components/Section';
import ContactRow from '../components/ContactRow';
import BackLink from '../components/BackLink';

export interface ConditionPageProps {
  condition: ConditionBlock;
  t: Content;
}

export default function ConditionPage({ condition, t }: ConditionPageProps) {
  return (
    <article className="condition-page">
      <Section className="about-hero">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <p className="eyebrow">{t.treatments.eyebrow}</p>
            <h1>{condition.h1}</h1>
            <p className="lead">{condition.intro}</p>
          </div>
        </div>
      </Section>
      <Section alt>
        <div className="about-body">
          {condition.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
        <BackLink href={condition.homeHref} label={condition.backLabel} />
      </Section>
      <Section id="contact">
        <ContactRow t={t} />
      </Section>
    </article>
  );
}
