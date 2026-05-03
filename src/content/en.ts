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
  },
  {
    title: 'Locked joints.',
    body: 'Manual mobilisation of the back and pelvis.',
  },
  {
    title: 'Musculoskeletal pain.',
    body: 'Knee, hip, elbow.',
  },
  {
    title: 'Tension-type headache.',
    body: 'Jaw, neck, upper back.',
  },
  {
    title: 'Rehab and body awareness.',
    body: 'Exercises to take home.',
  },
  {
    title: 'Sports injuries.',
    body: 'Assessment and a plan.',
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
    label: 'Rated on Google Maps',
    href: 'https://maps.app.goo.gl/FAbmVBvtPQbczbQB8',
  },
  hero: {
    eyebrow: 'Frederiksberg · Manual therapy',
    deco: 'Movement',
    h1: 'Klinik for Manuel Terapi – Frederiksberg C',
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
    lines: [
      'Klinik for Manuel Terapi · Martensens Allé 12, basement · 1828 Frederiksberg C',
      'Phone +45 51 52 96 20 · omidirnadk@gmail.com',
      'CVR 36 22 09 45',
    ],
    photoCredit: {
      prefix: 'Photo:',
      photographer: 'Toa Heftiba',
      photographerHref: 'https://unsplash.com/@heftiba',
      suffix: 'on Unsplash · © 2026',
    },
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
