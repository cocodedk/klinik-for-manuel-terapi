// Danish content for the landing page. Strings sourced verbatim from
// docs/content-da.md; numbers + URLs locked by docs/spec.md §9.
// Plan 09 may humanize wording; identifiers, hours, and contact data stay.

import type { Content, CtaTriple, HoursRow, TreatmentItem } from './types';

const cta: CtaTriple = {
  bookHref: 'https://klinik-for-manuel-terapi.planway.com/',
  bookLabel: 'Bestil tid',
  phoneE164: '+4551529620',
  phoneDisplay: '+45 51 52 96 20',
  phoneLabel: 'Ring',
  email: 'omidirnadk@gmail.com',
  emailLabel: 'Skriv',
};

const hours: HoursRow[] = [
  { day: 'Mandag', open: '10:30 – 20:00' },
  { day: 'Tirsdag', open: '10:30 – 19:00' },
  { day: 'Onsdag', open: '10:30 – 19:00' },
  { day: 'Torsdag', open: '10:30 – 20:00' },
  { day: 'Fredag', open: '10:00 – 19:00' },
  { day: 'Lørdag', open: 'Lukket', closed: true },
  { day: 'Søndag', open: 'Lukket', closed: true },
];

const treatments: TreatmentItem[] = [
  {
    title: 'Spændinger og stive muskler.',
    body: 'Nakke, skuldre, ryg.',
  },
  {
    title: 'Låste led.',
    body: 'Manuel mobilisering af ryg og bækken.',
  },
  {
    title: 'Smerter i bevægeapparatet.',
    body: 'Knæ, hofte, albue.',
  },
  {
    title: 'Hovedpine af spændingstype.',
    body: 'Kæbe, nakke, øvre ryg.',
  },
  {
    title: 'Genoptræning og kropsbevidsthed.',
    body: 'Øvelser at tage med hjem.',
  },
  {
    title: 'Idrætsskader.',
    body: 'Vurdering og en plan.',
  },
];

export const da: Content = {
  langCode: 'da',
  altHref: '/en/',
  altLangCode: 'en',
  altLabel: 'EN',
  title: 'Klinik for Manuel Terapi · Frederiksberg',
  description:
    'Manuel terapi, kropsterapi og smertevidenskab i Frederiksberg. Bestil tid online — ★ 4.9 på Google.',
  ogImage: '/img/og.jpg',
  rating: {
    value: '4.9',
    label: 'Vurdering på Google Maps',
    href: 'https://maps.app.goo.gl/FAbmVBvtPQbczbQB8',
  },
  hero: {
    eyebrow: 'Frederiksberg · Manuel terapi',
    deco: 'Bevægelse',
    h1: 'Klinik for Manuel Terapi',
    lead: 'Effektiv behandling der hjælper dig af med spændinger, låste led og smerter i kroppen.',
    metaLine: 'Martensens Allé 12, kld. · 1828 Frederiksberg C',
  },
  about: {
    eyebrow: 'Om klinikken',
    h2: 'Behandling der mærkes',
    body: [
      'Omid Hodabakhshi har arbejdet med manuel terapi siden 2007 og læser kandidat i smertevidenskab på Aalborg Universitet. Hver session er én-til-én. Du får en konkret vurdering af hvad der sker i kroppen, og hvad du selv kan gøre derhjemme før næste gang. Ingen pakkeforløb, ingen genbesøg du ikke har bedt om.',
    ],
  },
  treatments: {
    eyebrow: 'Behandling',
    h2: 'Hvad vi arbejder med',
    items: treatments,
  },
  practical: {
    eyebrow: 'Praktisk',
    h2: 'Sådan finder du os',
    address: ['Martensens Allé 12, kld.', '1828 Frederiksberg C'],
    transport:
      '5 min gang fra Frederiksberg Metro (linje M1/M2); busser 9A og 31 stopper i nærheden.',
    hours,
  },
  contactBlock: {
    h2: 'Bestil tid eller spørg',
    cta,
  },
  footer: {
    lines: [
      'Klinik for Manuel Terapi · Martensens Allé 12, kld. · 1828 Frederiksberg C',
      'Telefon +45 51 52 96 20 · omidirnadk@gmail.com',
      'CVR 36 22 09 45',
    ],
    photoCredit: {
      text: 'Foto: Toa Heftiba på Unsplash · © 2026',
      photographer: 'Toa Heftiba',
      photographerHref: 'https://unsplash.com/@heftiba',
    },
  },
  cta,
};
