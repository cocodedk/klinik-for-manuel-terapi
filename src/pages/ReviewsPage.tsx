import { Link } from 'react-router-dom';
import type { Content, ReviewItem } from '../content/types';
import Section from '../components/Section';

export interface ReviewsPageProps {
  t: Content;
  reviews: ReviewItem[];
}

export default function ReviewsPage({ t, reviews }: ReviewsPageProps) {
  const { reviewsPage } = t;
  return (
    <article className="reviews-page">
      <Section className="reviews-hero">
        <h1>{reviewsPage.h1}</h1>
        <p className="reviews-hero__lead">{reviewsPage.lead}</p>
      </Section>
      <Section alt>
        <ul className="reviews-grid" role="list">
          {reviews.map((r) => (
            <li key={r.author} className="review-card">
              <blockquote className="review-card__quote">
                <p>{r.text}</p>
              </blockquote>
              <footer className="review-card__footer">
                <span className="review-card__author">{r.author}</span>
                <span className="review-card__source">{r.date}</span>
              </footer>
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <Link className="back-link" to={reviewsPage.homeHref}>
          ← {reviewsPage.backLabel}
        </Link>
      </Section>
    </article>
  );
}
