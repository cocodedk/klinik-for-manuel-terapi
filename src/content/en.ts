import type { Content, CtaTriple, HoursRow, TreatmentItem } from './types';

const cta: CtaTriple = {
  bookHref: 'https://klinik-for-manuel-terapi.planway.com/',
  bookLabel: 'Book a time',
  phoneE164: '+4551529620',
  phoneDisplay: '+45 51 52 96 20',
  phoneLabel: 'Call',
  email: 'omidirnadk@gmail.com',
  emailLabel: 'Email',
};

const hours: HoursRow[] = [
  { day: 'Monday', open: '10:30 – 20:00' },
  { day: 'Tuesday', open: '10:30 – 19:00' },
  { day: 'Wednesday', open: '10:30 – 19:00' },
  { day: 'Thursday', open: '10:30 – 20:00' },
  { day: 'Friday', open: '10:00 – 19:00' },
  { day: 'Saturday', open: 'Closed', closed: true },
  { day: 'Sunday', open: 'Closed', closed: true },
];

const treatments: TreatmentItem[] = [
  {
    title: 'Tension and stiff muscles.',
    body: 'Neck, shoulders, back.',
    conditionSlug: '/en/neck-pain',
  },
  {
    title: 'Locked joints.',
    body: 'Manual mobilisation of the back and pelvis.',
    conditionSlug: '/en/locked-joints',
  },
  {
    title: 'Musculoskeletal pain.',
    body: 'Knee, hip, elbow.',
    conditionSlug: '/en/musculoskeletal-pain',
  },
  {
    title: 'Tension-type headache.',
    body: 'Jaw, neck, upper back.',
    conditionSlug: '/en/tension-headache',
  },
  {
    title: 'Rehab and body awareness.',
    body: 'Exercises to take home.',
    conditionSlug: '/en/rehabilitation',
  },
  {
    title: 'Sports injuries.',
    body: 'Assessment and a plan.',
    conditionSlug: '/en/sports-injuries',
  },
];

export const en: Content = {
  langCode: 'en',
  title: 'Manual Therapy Frederiksberg | Klinik for Manuel Terapi',
  description:
    'Manual therapy, body therapy, and pain science in Frederiksberg, Copenhagen. Book online. ★ 4.9 on Google.',
  ogImage: '/img/og.jpg',
  rating: {
    value: '4.9',
    count: 50,
    label: 'Rated on Google Maps',
    href: 'https://maps.app.goo.gl/FAbmVBvtPQbczbQB8',
  },
  hero: {
    h1: 'Klinik for Manuel Terapi',
    h1Sub: 'Frederiksberg C',
    lead: 'Effective treatment for tension, locked joints, and pain in the body.',
    perks: ['Open until 8 pm', 'Gift cards'],
    metaLine: 'Martensens Allé 12, basement · 1828 Frederiksberg C',
  },
  about: {
    eyebrow: 'About the clinic',
    h2: 'Care you can feel',
    body: [
      'Omid Hodabakhshi has worked with manual therapy since 2007 and is reading for a Master’s in pain science at Aalborg University. Each session is one-to-one. You leave knowing what’s happening in your body and what you can do at home before your next visit. No package deals, no follow-ups you didn’t ask for.',
    ],
  },
  treatments: {
    eyebrow: 'Treatments',
    h2: 'What we work with',
    items: treatments,
  },
  practical: {
    eyebrow: 'Practical',
    h2: 'How to find us',
    address: ['Martensens Allé 12, basement', '1828 Frederiksberg C'],
    transport:
      '5 min walk from Frederiksberg Metro (lines M1/M2); buses 9A and 31 stop nearby.',
    hours,
  },
  contactBlock: {
    h2: 'Book a time or ask',
    cta,
  },
  footer: {
    brandLine: 'Klinik for Manuel Terapi',
    address: 'Martensens Allé 12, basement · 1828 Frederiksberg C',
    mapHref: 'https://maps.app.goo.gl/FAbmVBvtPQbczbQB8',
    contactLine: 'Phone +45 51 52 96 20 · omidirnadk@gmail.com',
    cvrLine: 'CVR 36 22 09 45',
    photoCredit: {
      prefix: 'Photo:',
      photographer: 'Toa Heftiba',
      photographerHref: 'https://unsplash.com/@heftiba',
      suffix: 'on Unsplash · © 2026',
    },
    designer: {
      prefix: 'Designed by',
      label: 'cocode.dk',
      href: 'https://cocode.dk',
    },
  },
  aboutPage: {
    path: '/en/about-me',
    homeHref: '/en/',
    ogImage: '/img/omid.jpg',
    title: 'About me | Omid Hodabakhshi · Klinik for Manuel Terapi',
    description:
      'Omid Hodabakhshi · education, approach, and specialties. Manual therapy, body therapy, and pain science in Frederiksberg.',
    h1: 'Omid Hodabakhshi',
    intro:
      'I treat conditions across the entire spine — from the neck to the tailbone.',
    imageAlt: 'Omid Hodabakhshi at the clinic',
    educationLabel: 'My education',
    education: [
      '2007–2009: ManuVision body therapist',
      '2014–2016: Doctor-examined back therapist',
      '2017–2021: European School of Osteopathy (not authorised)',
      '2021–2022: ManuVision continuing education in Shock/Trauma',
      '2024–2026: Master’s in Pain Science and Interdisciplinary Pain Management, Aalborg University (expected 2026)',
    ],
    body: [
      'As a trained ManuVision body therapist, I find these educations complement each other with important knowledge and experience. It has given me a deeper understanding of the body and more options in my treatments.',
      'At Klinik for Manuel Terapi I meet you not only as a set of symptoms, but as a whole person. Pain is complex. It is rarely just a signal of injury — it’s a personal experience where body, mind, and social factors interact.',
      'Whether you are dealing with acute back problems, tension from stress, or complex chronic pain, I combine my educational background with the latest pain science to help you back to a life with more energy.',
    ],
    subsections: [
      {
        title: 'Whole-person body therapy',
        body: 'As a trained ManuVision body therapist I work with the connection between body and mind, so we can release the tensions that sit deep in the system.',
      },
      {
        title: 'Specialty in back and neck',
        body: 'With continuing education in Columna therapy from Lasota Academy, I have the right tools for precise treatment of back and spine issues. I have completed the diploma from the European School of Osteopathy, which gives me deep anatomical understanding and advanced manual techniques. Because of Brexit-related conversion rules, the diploma does not allow me to be authorised as an osteopath in Denmark.',
      },
      {
        title: 'Expertise in pain science',
        body: 'I am currently completing my Master’s in Pain Science and Interdisciplinary Pain Management at Aalborg University (2024–2026). I specialise in complex pain, including pain in cancer patients and the psychological effects of long-term pain conditions.',
      },
    ],
    readMoreLabel: 'Read more about Omid',
    backLabel: 'Back to the home page',
  },
  reviewsPage: {
    path: '/en/reviews',
    homeHref: '/en/',
    title: 'Reviews | Klinik for Manuel Terapi',
    description: 'What patients say about Klinik for Manuel Terapi in Frederiksberg. Read genuine Google reviews.',
    h1: 'What patients say',
    lead: "Reviews from Google — in patients’ own words.",
    backLabel: 'Back to the home page',
  },
  faq: {
    eyebrow: 'FAQ',
    h2: 'Frequently asked questions',
    items: [
      {
        question: 'Do I need a referral?',
        answer: 'No – you can book directly without a GP or insurance referral.',
      },
      {
        question: 'What does manual therapy treat?',
        answer: 'Manual therapy addresses tension, restricted joints, and musculoskeletal pain using precise hands-on techniques, mobilisation, and exercises – no medication.',
      },
      {
        question: 'Do you offer gift cards?',
        answer: 'Yes – gift cards are available. Contact the clinic to find out more.',
      },
      {
        question: 'What happens at the first visit?',
        answer: 'We start with a thorough conversation about your symptoms and movement patterns. We then treat, and you leave with specific exercises to do at home.',
      },
    ],
  },
  cta,
};
