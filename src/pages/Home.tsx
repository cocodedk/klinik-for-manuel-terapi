import type { RefObject } from 'react';
import type { Content } from '../content/types';
import HeroCard from '../components/HeroCard';
import Treatments from '../components/Treatments';
import HoursTable from '../components/HoursTable';
import ContactRow from '../components/ContactRow';

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
      <section className="alt" id="om">
        <div className="container">
          <AboutBlock t={t} />
        </div>
      </section>
      <section id="behandling">
        <div className="container">
          <Treatments t={t} />
        </div>
      </section>
      <section className="alt" id="praktisk">
        <div className="container cols-2">
          <PracticalAddress t={t} />
          <HoursTable t={t} />
        </div>
      </section>
      <section id="kontakt">
        <div className="container">
          <ContactRow t={t} />
        </div>
      </section>
    </>
  );
}
