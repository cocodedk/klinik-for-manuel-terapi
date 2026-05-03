import type { Content } from '../content/types';
import CtaButtons from './CtaButtons';
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
        <CtaButtons cta={cta} />
      </div>
      <p className="meta">{hero.metaLine}</p>
    </div>
  );
}
