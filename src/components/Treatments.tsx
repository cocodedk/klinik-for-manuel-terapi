import { Link } from 'react-router-dom';
import type { Content } from '../content/types';

export interface TreatmentsProps {
  t: Content;
}

export default function Treatments({ t }: TreatmentsProps) {
  const { eyebrow, h2, items } = t.treatments;
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{h2}</h2>
      <ul className="treatments">
        {items.map(({ title, body, conditionSlug }) => (
          <li key={title}>
            {conditionSlug ? (
              <Link to={conditionSlug} className="treatment-link">
                <strong>{title}</strong>
                <p>{body}</p>
              </Link>
            ) : (
              <>
                <strong>{title}</strong>
                <p>{body}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
