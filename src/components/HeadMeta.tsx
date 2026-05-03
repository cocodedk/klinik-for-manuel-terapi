import { useEffect } from 'react';
import type { Content } from '../content/types';

interface HeadMetaProps {
  t: Content;
}

const SITE_URL = 'https://cocodedk.github.io/klinik-for-manuel-terapi';

const LD_JSON = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'MedicalBusiness',
  name: 'Klinik for Manuel Terapi',
  url: SITE_URL + '/',
  telephone: '+4551529620',
  email: 'omidirnadk@gmail.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Martensens Allé 12, kld.',
    postalCode: '1828',
    addressLocality: 'Frederiksberg',
    addressCountry: 'DK',
  },
  openingHours: [
    'Mo 10:30-20:00',
    'Tu 10:30-19:00',
    'We 10:30-19:00',
    'Th 10:30-20:00',
    'Fr 10:00-19:00',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    ratingCount: '50',
  },
});

function setMeta(attr: string, value: string, attrName = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attrName}="${attr}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attr);
    document.head.appendChild(el);
  }
  if (el.content !== value) el.content = value;
}

export default function HeadMeta({ t }: HeadMetaProps) {
  useEffect(() => {
    if (document.title !== t.title) document.title = t.title;
    setMeta('description', t.description);
    setMeta('og:title', t.title, 'property');
    setMeta('og:description', t.description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', window.location.href, 'property');
    setMeta('og:image', SITE_URL + t.ogImage, 'property');

    let ld = document.getElementById('ld-json') as HTMLScriptElement | null;
    if (!ld) {
      ld = document.createElement('script');
      ld.id = 'ld-json';
      ld.type = 'application/ld+json';
      document.head.appendChild(ld);
    }
    if (ld.textContent !== LD_JSON) ld.textContent = LD_JSON;
  }, [t]);

  return null;
}
