import type { RefObject } from 'react';
import { Link } from 'react-router-dom';
import type { Content } from '../content/types';
import HeroCard from '../components/HeroCard';
import Treatments from '../components/Treatments';
import HoursTable from '../components/HoursTable';
import ContactRow from '../components/ContactRow';
import Faq from '../components/Faq';

export interface HomeProps {
  t: Content;
  heroRef: RefObject<HTMLElement | null>;
}

function AboutBlock({ t }: { t: Content }) {
  const { eyebrow, h2, body } = t.about;
  return (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{h2}</h2>
      {body.map((para, i) => (
        <p key={i}>{para}</p>
      ))}
      <p>
        <Link className="read-more" to={t.aboutPage.path}>
          {t.aboutPage.readMoreLabel} →
        </Link>
      </p>
    </>
  );
}

function PracticalAddress({ t }: { t: Content }) {
  const { address, transport } = t.practical;
  return (
    <div>
      {address.map((line) => (
        <p key={line}>{line}</p>
      ))}
      <p>{transport}</p>
    </div>
  );
}

export default function Home({ t, heroRef }: HomeProps) {
  return (
    <>
      <section className="hero" ref={heroRef}>
        <div className="container">
          <HeroCard t={t} />
        </div>
      </section>
      <section className="alt" id="about">
        <div className="container">
          <AboutBlock t={t} />
        </div>
      </section>
      <section id="treatments">
        <div className="container">
          <Treatments t={t} />
        </div>
      </section>
      <section className="alt" id="faq">
        <div className="container">
          <Faq t={t} />
        </div>
      </section>
      <section id="practical">
        <div className="container">
          <p className="eyebrow">{t.practical.eyebrow}</p>
          <h2>{t.practical.h2}</h2>
          <div className="cols-2">
            <PracticalAddress t={t} />
            <HoursTable t={t} />
          </div>
        </div>
      </section>
      <section className="alt" id="contact">
        <div className="container">
          <ContactRow t={t} />
        </div>
      </section>
    </>
  );
}
