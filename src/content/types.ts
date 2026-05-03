export type LangCode = 'da' | 'en';

export interface CtaTriple {
  bookHref: string;
  bookLabel: string;
  phoneE164: string;
  phoneDisplay: string;
  phoneLabel: string;
  email: string;
  emailLabel: string;
}

export interface HoursRow {
  day: string;
  open: string;
  closed?: boolean;
}

export interface RatingChip {
  value: '4.9';
  label: string;
  href: string;
}

export interface HeroBlock {
  eyebrow: string;
  deco: string;
  h1: string;
  lead: string;
  metaLine: string;
}

export interface AboutBlock {
  eyebrow: string;
  h2: string;
  body: string[];
}

export interface TreatmentItem {
  title: string;
  body: string;
}

export interface TreatmentsBlock {
  eyebrow: string;
  h2: string;
  items: TreatmentItem[];
}

export interface PracticalBlock {
  eyebrow: string;
  h2: string;
  address: string[];
  transport: string;
  hours: HoursRow[];
}

export interface ContactBlock {
  h2: string;
  cta: CtaTriple;
}

export interface PhotoCredit {
  prefix: string;
  photographer: string;
  photographerHref: string;
  suffix: string;
}

export interface FooterBlock {
  lines: string[];
  photoCredit: PhotoCredit;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlock {
  h2: string;
  items: FaqItem[];
}

export interface Content {
  langCode: LangCode;
  title: string;
  description: string;
  ogImage: string;
  rating: RatingChip;
  hero: HeroBlock;
  about: AboutBlock;
  treatments: TreatmentsBlock;
  practical: PracticalBlock;
  contactBlock: ContactBlock;
  footer: FooterBlock;
  faq: FaqBlock;
  cta: CtaTriple;
}
