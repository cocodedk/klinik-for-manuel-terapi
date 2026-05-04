import type { Content } from '../content/types';
import { googleReviews } from '../content/reviews';
import Section from '../components/Section';
import BackLink from '../components/BackLink';

export interface ReviewsPageProps {
  t: Content;
}

export default function ReviewsPage({ t }: ReviewsPageProps) {
  const { reviewsPage } = t;
  return (
    <article className="reviews-page">
      <Section className="reviews-hero">
        <h1>{reviewsPage.h1}</h1>
        <p className="reviews-hero__lead">{reviewsPage.lead}</p>
      </Section>
      <Section alt>
        <ul className="reviews-grid" role="list">
          {googleReviews.map((r, i) => (
            <li key={i} className="review-card">
              <blockquote className="review-card__quote">
                <p>{r.text}</p>
              </blockquote>
              <footer className="review-card__footer">
                <span className="review-card__author">{r.author}</span>
                <span className="review-card__source">{r.source}</span>
              </footer>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <a
          className="reviews-google-link"
          href={reviewsPage.googleHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {reviewsPage.googleLabel} ↗
        </a>
        <BackLink href={reviewsPage.homeHref} label={reviewsPage.backLabel} />
      </Section>
    </article>
  );
}
