import { Link } from 'react-router-dom';
import type { Content } from '../content/types';

export interface AboutProps {
  t: Content;
}

export default function About({ t }: AboutProps) {
  const { aboutPage } = t;
  return (
    <article className="about-page">
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="about-hero__copy">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h1>{aboutPage.h1}</h1>
            <p className="lead">{aboutPage.intro}</p>
          </div>
          <img
            className="about-hero__photo"
            src={`${import.meta.env.BASE_URL}img/omid.jpg`}
            alt={aboutPage.imageAlt}
            width="576"
            height="683"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>
      <section className="alt">
        <div className="container about-body">
          {aboutPage.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </section>
      <section>
        <div className="container about-body">
          <h2>{aboutPage.educationLabel}</h2>
          <ul className="about-education">
            {aboutPage.education.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="alt">
        <div className="container about-body">
          {aboutPage.subsections.map(({ title, body }) => (
            <div className="about-sub" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="container about-body">
          <Link className="back-link" to={aboutPage.homeHref}>
            ← {aboutPage.backLabel}
          </Link>
        </div>
      </section>
    </article>
  );
}
