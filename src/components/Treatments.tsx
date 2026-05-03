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
        {items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
