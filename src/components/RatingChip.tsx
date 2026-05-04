import { Link } from 'react-router-dom';
import type { Content } from '../content/types';

export interface RatingChipProps {
  rating: Content['rating'];
}

export default function RatingChip({ rating }: RatingChipProps) {
  return (
    <Link className="rating" to={rating.href}>
      <span className="star" aria-hidden>★</span>
      <span className="score">{rating.value}</span>
      <span className="label">· {rating.label}</span>
    </Link>
  );
}
