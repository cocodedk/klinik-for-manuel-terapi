import type { Content } from '../content/types';

export default function Faq({ t }: { t: Content }) {
  const { eyebrow, h2, items } = t.faq;
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{h2}</h2>
      <dl className="faq-list">
        {items.map(({ question, answer }) => (
          <div key={question}>
            <dt>{question}</dt>
            <dd>{answer}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
