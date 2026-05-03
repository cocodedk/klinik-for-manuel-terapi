import type { Content } from '../content/types';
import CtaButtons from './CtaButtons';
import RatingChip from './RatingChip';
import { MapPinIcon } from './icons';

export interface HeroCardProps {
  t: Content;
}

export default function HeroCard({ t }: HeroCardProps) {
  const { hero, rating, cta } = t;
  return (
    <div className="hero-card">
      <h1>{hero.h1}</h1>
      <p className="hero-sub">{hero.h1Sub}</p>
      <p className="lead">{hero.lead}</p>
      <p className="hero-perks">{hero.perks.join(' · ')}</p>
      <RatingChip rating={rating} />
      <div className="cta-row">
        <CtaButtons cta={cta} />
      </div>
      <a
        className="hero-map"
        href={rating.href}
        target="_blank"
        rel="noopener"
      >
        <MapPinIcon />
        <span>{hero.metaLine}</span>
      </a>
    </div>
  );
}
