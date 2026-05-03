import { Link } from 'react-router-dom';
import type { ConditionBlock, Content } from '../content/types';
import Section from '../components/Section';
import ContactRow from '../components/ContactRow';

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
      </Section>
      <Section id="contact">
        <ContactRow t={t} />
      </Section>
      <Section alt>
        <div className="about-body">
          <Link className="back-link" to={condition.homeHref}>
            ← {condition.backLabel}
          </Link>
        </div>
      </Section>
    </article>
  );
}
