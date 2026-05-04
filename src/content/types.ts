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
  value: string;
  count: number;
  label: string;
  href: string;
}

export interface HeroBlock {
  h1: string;
  h1Sub: string;
  lead: string;
  perks: string[];
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
  conditionSlug?: string;
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

export interface DesignerCredit {
  prefix: string;
  label: string;
  href: string;
}

export interface FooterBlock {
  brandLine: string;
  address: string;
  mapHref: string;
  contactLine: string;
  cvrLine: string;
  photoCredit: PhotoCredit;
  designer: DesignerCredit;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqBlock {
  eyebrow: string;
  h2: string;
  items: FaqItem[];
}

export interface ConditionBlock {
  slug: string;
  altSlug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  body: string[];
  backLabel: string;
  homeHref: string;
}

export interface AboutPageSubsection {
  title: string;
  body: string;
}

export interface AboutPageBlock {
  path: string;
  homeHref: string;
  ogImage: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  imageAlt: string;
  educationLabel: string;
  education: string[];
  body: string[];
  subsections: AboutPageSubsection[];
  readMoreLabel: string;
  backLabel: string;
}

export interface ReviewItem {
  author: string;
  source: string;
  text: string;
}

export interface ReviewsPageBlock {
  path: string;
  homeHref: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  backLabel: string;
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
  aboutPage: AboutPageBlock;
  reviewsPage: ReviewsPageBlock;
  cta: CtaTriple;
}
