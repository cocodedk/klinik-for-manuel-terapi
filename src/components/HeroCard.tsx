import type { Content } from '../content/types';
import Button from './Button';
import RatingChip from './RatingChip';

export interface HeroCardProps {
  t: Content;
}

export default function HeroCard({ t }: HeroCardProps) {
  const { hero, rating, cta } = t;
  return (
    <div className="hero-card">
      <span className="deco" aria-hidden>{hero.deco}</span>
      <p className="eyebrow">{hero.eyebrow}</p>
      <h1>{hero.h1}</h1>
      <p className="lead">{hero.lead}</p>
      <div className="cta-row">
        <RatingChip rating={rating} />
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
      <p className="meta">{hero.metaLine}</p>
    </div>
  );
}
