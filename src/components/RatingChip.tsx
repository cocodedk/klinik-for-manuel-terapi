import type { Content } from '../content/types';

export interface RatingChipProps {
  rating: Content['rating'];
}

export default function RatingChip({ rating }: RatingChipProps) {
  return (
    <a
      className="rating"
      href={rating.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="star" aria-hidden>★</span>
      <span className="score">{rating.value}</span>
      <span className="label">· {rating.label}</span>
    </a>
  );
}
