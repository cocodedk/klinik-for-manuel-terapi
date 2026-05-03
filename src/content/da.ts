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
    title: 'Genoptræning, kropsbevidsthed.',
    body: 'Øvelser at tage med hjem.',
  },
  {
    title: 'Idrætsskader.',
    body: 'Vurdering og en plan.',
  },
];

export const da: Content = {
  langCode: 'da',
  title: 'Manuel Terapi Frederiksberg | Klinik for Manuel Terapi',
  description:
    'Manuel terapi, kropsterapi og smertevidenskab i Frederiksberg. Bestil tid online. ★ 4.9 på Google.',
  ogImage: '/img/og.jpg',
  rating: {
    value: '4.9',
    label: 'Vurdering på Google Maps',
    href: 'https://maps.app.goo.gl/FAbmVBvtPQbczbQB8',
  },
  hero: {
    h1: 'Klinik for Manuel Terapi',
    h1Sub: 'Frederiksberg C',
    lead: 'Effektiv behandling der hjælper dig af med spændinger, låste led og smerter i kroppen.',
    perks: ['Åbent til kl. 20', 'Gavekort'],
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
    brandLine: 'Klinik for Manuel Terapi',
    address: 'Martensens Allé 12, kld. · 1828 Frederiksberg C',
    mapHref: 'https://maps.app.goo.gl/FAbmVBvtPQbczbQB8',
    contactLine: 'Telefon +45 51 52 96 20 · omidirnadk@gmail.com',
    cvrLine: 'CVR 36 22 09 45',
    photoCredit: {
      prefix: 'Foto:',
      photographer: 'Toa Heftiba',
      photographerHref: 'https://unsplash.com/@heftiba',
      suffix: 'på Unsplash · © 2026',
    },
    designer: {
      prefix: 'Designet af',
      label: 'cocode.dk',
      href: 'https://cocode.dk',
    },
  },
  aboutPage: {
    path: '/om-mig',
    homeHref: '/',
    ogImage: '/img/omid.jpg',
    title: 'Om mig | Omid Hodabakhshi · Klinik for Manuel Terapi',
    description:
      'Omid Hodabakhshi · uddannelser, tilgang og specialer. Manuel terapi, kropsterapi og smertevidenskab i Frederiksberg.',
    h1: 'Omid Hodabakhshi',
    intro:
      'Jeg tilbyder behandling af problemstillinger i hele rygsøjlen, fra nakken til halebenet.',
    imageAlt: 'Omid Hodabakhshi i klinikken',
    educationLabel: 'Mine uddannelser',
    education: [
      '2007–2009: ManuVision Kropsterapeut',
      '2014–2016: Lægeeksamineret rygterapeut',
      '2017–2021: European School of Osteopathy (ikke autoriseret)',
      '2021–2022: ManuVisions efteruddannelse i Chok/Traume',
      '2024–2026: Master i Smertevidenskab og Tværfaglig Smertebehandling, Aalborg Universitet (forventes 2026)',
    ],
    body: [
      'Som uddannet kropsterapeut fra ManuVision er det min erfaring, at uddannelserne supplerer hinanden med vigtig viden og erfaring. Det har givet mig en dybere forståelse af kroppen og flere muligheder i mine behandlinger.',
      'Hos Klinik for Manuel Terapi møder jeg dig ikke kun som et sæt symptomer, men som et helt menneske. Smerte er komplekst. Det er sjældent blot et signal om en skade, men en personlig oplevelse, hvor krop, psyke og sociale faktorer spiller sammen.',
      'Uanset om du kæmper med akutte rygproblemer, spændinger efter stress eller komplekse, kroniske smerter, kombinerer jeg min uddannelsesbaggrund med den nyeste smertevidenskab for at hjælpe dig tilbage til et liv med mere overskud.',
    ],
    subsections: [
      {
        title: 'Helhedsorienteret kropsterapi',
        body: 'Som uddannet ManuVision kropsterapeut arbejder jeg med forbindelsen mellem krop og sind, så vi får løsnet op for de spændinger, der sidder dybt i systemet.',
      },
      {
        title: 'Speciale i ryg og nakke',
        body: 'Med en efteruddannelse i Columnaterapi fra Lasota Academy har jeg de rette værktøjer til præcis behandling af ryg- og søjleproblematikker. Jeg har gennemført diplomuddannelsen fra European School of Osteopathy, hvilket giver mig en dyb anatomisk forståelse og avancerede manuelle teknikker. På grund af Brexit-relaterede konverteringsregler giver diplomet ikke mulighed for autorisation som osteopat i Danmark.',
      },
      {
        title: 'Ekspertise i smertevidenskab',
        body: 'Jeg er i gang med min Master i Smertevidenskab og Tværfaglig Smertebehandling ved Aalborg Universitet (2024–2026). Her specialiserer jeg mig i komplekse smerter, herunder smerte hos kræftpatienter og de psykologiske effekter af langvarige smerteforløb.',
      },
    ],
    readMoreLabel: 'Læs mere om Omid',
    backLabel: 'Tilbage til forsiden',
  },
  faq: {
    eyebrow: 'Spørgsmål',
    h2: 'Ofte stillede spørgsmål',
    items: [
      {
        question: 'Skal jeg have en henvisning?',
        answer: 'Nej – du kan bestille tid direkte uden lægehenvisning eller forsikringshenvisning.',
      },
      {
        question: 'Hvad arbejder manuel terapi med?',
        answer: 'Manuel terapi behandler spændinger, låste led og smerter i bevægeapparatet ved hjælp af præcise håndgreb, mobilisering og øvelser – uden medicin.',
      },
      {
        question: 'Tilbyder I gavekort?',
        answer: 'Ja – gavekort er tilgængeligt. Kontakt klinikken for at høre mere.',
      },
      {
        question: 'Hvad sker der til første besøg?',
        answer: 'Vi starter med en grundig samtale om dine symptomer og bevægemønstre. Derefter behandler vi, og du får konkrete øvelser med hjem.',
      },
    ],
  },
  cta,
};
