import { Link } from 'react-router-dom';
import type { Content } from '../content/types';
import Section from '../components/Section';

export interface AboutProps {
  t: Content;
}

export default function About({ t }: AboutProps) {
  const { aboutPage } = t;
  return (
    <article className="about-page">
      <Section className="about-hero">
        <div className="about-hero__inner">
          <div className="about-hero__copy">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h1>{aboutPage.h1}</h1>
            <p className="lead">{aboutPage.intro}</p>
          </div>
          <picture>
            <source srcSet={`${import.meta.env.BASE_URL}img/omid.avif`} type="image/avif" />
            <source srcSet={`${import.meta.env.BASE_URL}img/omid.webp`} type="image/webp" />
            <img
              className="about-hero__photo"
              src={`${import.meta.env.BASE_URL}img/omid.jpg`}
              alt={aboutPage.imageAlt}
              width="576"
              height="683"
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>
      </Section>
      <Section alt>
        <div className="about-body">
          {aboutPage.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </Section>
      <Section>
        <div className="about-body">
          <h2>{aboutPage.educationLabel}</h2>
          <ul className="about-education">
            {aboutPage.education.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </Section>
      <Section alt>
        <div className="about-body">
          {aboutPage.subsections.map(({ title, body }) => (
            <div className="about-sub" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <div className="about-body">
          <Link className="back-link" to={aboutPage.homeHref}>
            ← {aboutPage.backLabel}
          </Link>
        </div>
      </Section>
    </article>
  );
}
