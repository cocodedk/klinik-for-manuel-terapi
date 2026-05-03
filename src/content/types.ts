// Content contract for the bilingual landing page.
// Plans 07 (`da.ts`) and 08 (`en.ts`) implement this interface.
// Pure type definitions — no runtime exports, no `as const` defaults.

export type LangCode = 'da' | 'en';

/**
 * The booking + phone + email triple. Used both at `Content.cta`
 * (driving the FAB) and at `Content.contactBlock.cta` (driving the
 * in-flow contact row). They hold the same triple in `da.ts` / `en.ts`;
 * the type does not enforce equality between the two slots.
 */
export interface CtaTriple {
  bookHref: string;     // Planway URL
  bookLabel: string;    // 'Bestil tid' / 'Book a time'
  phoneE164: string;    // '+4551529620' — used in tel: href
  phoneDisplay: string; // '+45 51 52 96 20' — visible label
  phoneLabel: string;   // 'Ring' / 'Call'
  email: string;        // 'omidirnadk@gmail.com'
  emailLabel: string;   // 'Skriv' / 'Email'
}

/**
 * One row in the practical-info hours table.
 * `closed: true` is a render hint so the row gets the muted class;
 * `open` is set to the localized 'Lukket' / 'Closed' string for those
 * rows so the template never has to branch on the flag.
 */
export interface HoursRow {
  day: string;
  open: string;
  closed?: boolean;
}

export interface RatingChip {
  value: '4.9';   // locked literal — see docs/spec.md §9
  label: string;  // e.g. 'Vurdering på Google Maps' / 'Rating on Google Maps'
  href: string;   // maps.app.goo.gl/...
}

export interface HeroBlock {
  eyebrow: string;
  deco: string;     // decorative display word, e.g. 'Bevægelse' / 'Movement'
  h1: string;
  lead: string;
  metaLine: string; // address · today's hours, statically baked per weekday
}

export interface AboutBlock {
  eyebrow: string;
  h2: string;
  body: string[];   // paragraphs
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
  address: string[]; // 2-line address
  transport: string;
  hours: HoursRow[];
}

export interface ContactBlock {
  h2: string;
  cta: CtaTriple;
}

export interface PhotoCredit {
  text: string;       // e.g. 'Foto: Toa Heftiba på Unsplash · © 2026'
  photographer: string;
  photographerHref: string;
}

export interface FooterBlock {
  lines: string[];          // address line, contact line, CVR line
  photoCredit: PhotoCredit;
}

/**
 * Root export. The single source of truth that `Home.tsx`, `Fab.tsx`,
 * and the route loaders all read from. Adding fields is fine; renaming
 * or removing the fields below breaks plans 07 and 08.
 */
export interface Content {
  langCode: LangCode;
  altHref: string;          // sibling route '/en/' or '/'
  altLangCode: LangCode;
  altLabel: string;         // 'EN' / 'DA'
  title: string;            // <title>
  description: string;      // <meta description>
  ogImage: string;          // '/img/og.jpg'
  rating: RatingChip;
  hero: HeroBlock;
  about: AboutBlock;
  treatments: TreatmentsBlock;
  practical: PracticalBlock;
  contactBlock: ContactBlock;
  footer: FooterBlock;
  cta: CtaTriple;           // shared with the FAB
}
