# Condition pages — implementation plan

> **For agentic workers:** Use `superpowers:executing-plans` to implement task-by-task.
> Verify with `pnpm tsc --noEmit && pnpm build` before every commit.

**Goal:** 6 condition landing pages (DA + EN) linked from treatment cards on the home
page. Generic data-driven component. No new design patterns.

---

## File map

| File | Action |
|------|--------|
| `src/content/types.ts` | Add `ConditionBlock`; add `conditionSlug?` to `TreatmentItem` |
| `src/content/da.ts` | Add `conditionSlug` to each treatment item |
| `src/content/en.ts` | Add `conditionSlug` to each treatment item |
| `src/content/conditions/da.ts` | Create — `daConditions: ConditionBlock[]` |
| `src/content/conditions/en.ts` | Create — `enConditions: ConditionBlock[]` |
| `src/pages/ConditionPage.tsx` | Create — generic condition page |
| `src/App.tsx` | Add `page: 'condition'`, `condition?: ConditionBlock` prop |
| `src/main.tsx` | Add 12 condition routes |
| `src/styles/components.css` | Add `.treatment-link` styles |
| `package.json` | Extend build script for 12 new static paths |

---

## Task 1 — Extend content types

**File:** `src/content/types.ts`

Add `conditionSlug?: string` to `TreatmentItem`:

```ts
export interface TreatmentItem {
  title: string;
  body: string;
  conditionSlug?: string;
}
```

Add after `FaqBlock`:

```ts
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
```

- [ ] Edit `src/content/types.ts`
- [ ] `pnpm tsc --noEmit` — expect errors about missing `conditionSlug` data (fix in Task 2–3)

---

## Task 2 — Add conditionSlug to DA treatment items

**File:** `src/content/da.ts`

Replace the `treatments` array with:

```ts
const treatments: TreatmentItem[] = [
  { title: 'Spændinger og stive muskler.', body: 'Nakke, skuldre, ryg.', conditionSlug: '/nakkesmerter' },
  { title: 'Låste led.', body: 'Manuel mobilisering af ryg og bækken.', conditionSlug: '/laaste-led' },
  { title: 'Smerter i bevægeapparatet.', body: 'Knæ, hofte, albue.', conditionSlug: '/smerter-i-bevaegelse' },
  { title: 'Spændingshovedpine.', body: 'Kæbe, nakke, øvre ryg.', conditionSlug: '/spaendingshovedpine' },
  { title: 'Genoptræning, kropsbevidsthed.', body: 'Øvelser at tage med hjem.', conditionSlug: '/genoptraening' },
  { title: 'Idrætsskader.', body: 'Vurdering og en plan.', conditionSlug: '/idraetsskader' },
];
```

- [ ] Edit `src/content/da.ts`

---

## Task 3 — Add conditionSlug to EN treatment items

**File:** `src/content/en.ts`

Replace the `treatments` array with:

```ts
const treatments: TreatmentItem[] = [
  { title: 'Tension and stiff muscles.', body: 'Neck, shoulders, back.', conditionSlug: '/en/neck-pain' },
  { title: 'Locked joints.', body: 'Manual mobilisation of the back and pelvis.', conditionSlug: '/en/locked-joints' },
  { title: 'Musculoskeletal pain.', body: 'Knee, hip, elbow.', conditionSlug: '/en/musculoskeletal-pain' },
  { title: 'Tension-type headache.', body: 'Jaw, neck, upper back.', conditionSlug: '/en/tension-headache' },
  { title: 'Rehab and body awareness.', body: 'Exercises to take home.', conditionSlug: '/en/rehabilitation' },
  { title: 'Sports injuries.', body: 'Assessment and a plan.', conditionSlug: '/en/sports-injuries' },
];
```

- [ ] Edit `src/content/en.ts`
- [ ] `pnpm tsc --noEmit` — should be clean at this point

---

## Task 4 — Create DA condition content

**File:** `src/content/conditions/da.ts` (new file, new directory)

```ts
import type { ConditionBlock } from '../types';

export const daConditions: ConditionBlock[] = [
  {
    slug: '/nakkesmerter',
    altSlug: '/en/neck-pain',
    title: 'Nakkesmerter behandling Frederiksberg | Klinik for Manuel Terapi',
    description: 'Manuel terapi mod nakkesmerter og stiv nakke i Frederiksberg. Behandling af muskler og led uden medicin. Book tid online.',
    h1: 'Nakkesmerter',
    intro: 'Nakkesmerter opstår tit gradvist og bliver ved, fordi musklerne og leddene holdes fast i det samme mønster.',
    body: [
      'De fleste nakkesmerter skyldes en kombination af muskelspændinger og led der har mistet bevægelighed. Stillesiddende arbejde, stress og ensidigt belastede bevægemønstre er de typiske årsager. Kroppen spænder musklerne rundt om det ømme sted for at beskytte det, og så er problemet fastlåst.',
      'I behandlingen arbejder vi med de led og muskler der fastholder smerten. Manuel mobilisering af nakke og øvre ryg genopretter bevægelighed og dæmper smertesignalerne. Mange mærker forskel allerede fra første session.',
      'Du får øvelser med hjem tilpasset din nakke. Ikke en standardpakke, men bevægelser der passer til det vi finder i netop din krop. Målet er at forstå hvad der skaber smerten, så den ikke bare flyttes, men løses.',
    ],
    backLabel: 'Tilbage til forsiden',
    homeHref: '/',
  },
  {
    slug: '/laaste-led',
    altSlug: '/en/locked-joints',
    title: 'Låste led og mobilisering Frederiksberg | Klinik for Manuel Terapi',
    description: 'Behandling af låste led i ryg, bækken og nakke. Manuel mobilisering i Frederiksberg uden medicin. Book tid online.',
    h1: 'Låste led',
    intro: 'Et låst led er et led der ikke bevæger sig som det skal. Det kan sidde i ryggen, bækkenet eller nakken og give smerter et helt andet sted end der hvor problemet sidder.',
    body: [
      'Låste led opstår tit gradvist. Ensidigt arbejde, uhensigtsmæssige bevægemønstre eller en gammel skade der aldrig helt heler. Kroppen kompenserer ved at lægge bevægelsen andre steder, og til sidst begynder det at gøre ondt der i stedet.',
      'Manuel mobilisering arbejder præcist med det led der mangler bevægelighed. Vi finder det og frigiver det. Ingen medicin, ingen apparater. Det kræver god anatomisk forståelse og præcise hænder.',
      'Når leddet bevæger sig igen, ændrer hele systemet karakter. Spændingerne aftager, smerterne falder, og kroppen finder sin normale rytme tilbage.',
    ],
    backLabel: 'Tilbage til forsiden',
    homeHref: '/',
  },
  {
    slug: '/smerter-i-bevaegelse',
    altSlug: '/en/musculoskeletal-pain',
    title: 'Smerter i knæ, hofte og albue Frederiksberg | Klinik for Manuel Terapi',
    description: 'Behandling af smerter i knæ, hofte og albue. Manuel terapi i Frederiksberg. Book tid online.',
    h1: 'Smerter i bevægeapparatet',
    intro: 'Smerter i knæ, hofte eller albue er sjældent bare slitage. Oftest handler det om belastningsmønstre der over tid slider skævt.',
    body: [
      'Bevægeapparatet er et sammenhængende system. Knæsmerter kan skyldes at hoften ikke bevæger sig optimalt. Albuesmerter kan komme fra nakken. Behandling der kun kigger på det sted der gør ondt, løser ikke altid problemet.',
      'Vi vurderer hele bevægekæden og finder hvorfra problemet egentlig styres. Derefter behandler vi der, ikke kun der hvor det gør ondt.',
      'Du får en konkret forklaring på hvad der sker i din krop, og øvelser der arbejder med årsagen. Mange mærker hurtigt forbedring, men varig bedring kræver at man forstår sit eget bevægemønster.',
    ],
    backLabel: 'Tilbage til forsiden',
    homeHref: '/',
  },
  {
    slug: '/spaendingshovedpine',
    altSlug: '/en/tension-headache',
    title: 'Spændingshovedpine behandling Frederiksberg | Klinik for Manuel Terapi',
    description: 'Behandling af spændingshovedpine med udgangspunkt i kæbe, nakke og øvre ryg. Manuel terapi i Frederiksberg. Book tid.',
    h1: 'Spændingshovedpine',
    intro: 'Spændingshovedpine sidder typisk som et tryk bag øjnene eller et bånd rundt om hovedet. Den kommer fra musklerne, ikke fra hjernen.',
    body: [
      'De muskelgrupper der oftest driver spændingshovedpine er kæben, nakken og den øvre ryg. Stress, langvarig skærmtid og dårlig sovstilling er klassiske udløsere. Mange tager smertestillende og venter på at det går over, men det løser ikke det der skaber den.',
      'Manuel terapi arbejder direkte med de muskler og led der er spændte. Vi finder de triggerpunkter der sender smerten op i hovedet og behandler dem. Det er anatomi, ikke magi.',
      'Mange patienter med tilbagevendende spændingshovedpine får markant færre anfald efter et behandlingsforløb. Det kræver at vi finder det individuelle mønster, for det sidder aldrig helt ens hos to mennesker.',
    ],
    backLabel: 'Tilbage til forsiden',
    homeHref: '/',
  },
  {
    slug: '/genoptraening',
    altSlug: '/en/rehabilitation',
    title: 'Genoptræning og øvelser Frederiksberg | Klinik for Manuel Terapi',
    description: 'Genoptræning, kropsbevidsthed og hjemmeøvelser. Manuel terapi i Frederiksberg. Book tid online.',
    h1: 'Genoptræning og kropsbevidsthed',
    intro: 'Genoptræning handler om at genfinde de bevægemønstre kroppen har glemt eller aldrig lært ordentligt.',
    body: [
      'Efter en skade eller et smerteforløb begynder kroppen typisk at bevæge sig anderledes for at undgå det der gjorde ondt. Smart på kort sigt. På lang sigt skaber det nye problemer.',
      'Vi arbejder med at genoprette den bevægelighed og styrke der er nødvendig for at kroppen kan fungere uden at kompensere. Det sker i behandlingen, men mindst lige så meget i de øvelser du laver derhjemme.',
      'Du forlader klinikken med en konkret plan. Øvelserne er valgt ud fra hvad vi finder i din krop og forklaret så du forstår hvad de gør og hvorfor.',
    ],
    backLabel: 'Tilbage til forsiden',
    homeHref: '/',
  },
  {
    slug: '/idraetsskader',
    altSlug: '/en/sports-injuries',
    title: 'Idrætsskader behandling Frederiksberg | Klinik for Manuel Terapi',
    description: 'Behandling og vurdering af idrætsskader. Manuel terapi i Frederiksberg. Book tid online.',
    h1: 'Idrætsskader',
    intro: 'En idrætsskade kan holde dig ude af sporten i uger. Det behøver den ikke.',
    body: [
      'De mest almindelige idrætsskader er forstuvninger, muskeltrækninger og overbelastningsskader. Fælles for dem er at de heler bedst når man forstår mekanismen og behandler aktivt, ikke bare holder pause.',
      'Vi laver en grundig vurdering af skaden og dens årsager: hvad der er gået i stykker, og hvad der gjorde kroppen sårbar over for det i første omgang. Det kan være en styrkeusymmetri, en bevægebegrænsning eller et gammelt mønster der aldrig er blevet rettet op.',
      'Du får en realistisk plan for hvornår du kan vende tilbage til din sport, hvad du konkret skal gøre for at nå dertil, og hvad du skal holde øje med undervejs.',
    ],
    backLabel: 'Tilbage til forsiden',
    homeHref: '/',
  },
];
```

- [ ] `mkdir -p src/content/conditions`
- [ ] Create `src/content/conditions/da.ts`
- [ ] `pnpm tsc --noEmit`

---

## Task 5 — Create EN condition content

**File:** `src/content/conditions/en.ts` (new file)

```ts
import type { ConditionBlock } from '../types';

export const enConditions: ConditionBlock[] = [
  {
    slug: '/en/neck-pain',
    altSlug: '/nakkesmerter',
    title: 'Neck Pain Treatment Frederiksberg | Klinik for Manuel Terapi',
    description: 'Manual therapy for neck pain and stiffness in Frederiksberg, Copenhagen. No medication. Book online.',
    h1: 'Neck Pain',
    intro: 'Neck pain tends to build gradually and persist because muscles and joints get stuck in the same loading pattern.',
    body: [
      'Most neck pain comes from a mix of muscle tension and joints that have lost their range of motion. Desk work, stress, and repetitive loading are the usual culprits. The body tightens the muscles around the sore spot to protect it, which locks the area further.',
      'Treatment works directly with the joints and muscles keeping the problem in place. Manual mobilisation of the neck and upper back restores movement and quiets the pain signals. Most people feel a clear difference after the first session.',
      'You leave with exercises for your specific neck, not a generic handout. The goal is to understand what is creating the pain so it does not just move somewhere else.',
    ],
    backLabel: 'Back to the home page',
    homeHref: '/en/',
  },
  {
    slug: '/en/locked-joints',
    altSlug: '/laaste-led',
    title: 'Locked Joints and Mobilisation Frederiksberg | Klinik for Manuel Terapi',
    description: 'Treatment of restricted and locked joints in the back, pelvis, and neck. Manual mobilisation in Frederiksberg. Book online.',
    h1: 'Locked Joints',
    intro: 'A locked joint is one that is not moving the way it should. It can sit in the back, pelvis, or neck and produce pain somewhere else entirely.',
    body: [
      'Locked joints usually develop gradually. Repetitive work, poor movement habits, or an old injury that never fully resolved. The body compensates by routing movement elsewhere, and eventually that somewhere else starts to hurt instead.',
      'Manual mobilisation works precisely with the joint that has lost its range. We find it and release it. No medication, no machines. It requires solid anatomical knowledge and precise hands.',
      'Once the joint moves freely again, the whole system tends to settle. Tension drops, pain fades, and the body finds its way back to its normal rhythm.',
    ],
    backLabel: 'Back to the home page',
    homeHref: '/en/',
  },
  {
    slug: '/en/musculoskeletal-pain',
    altSlug: '/smerter-i-bevaegelse',
    title: 'Knee, Hip and Elbow Pain Frederiksberg | Klinik for Manuel Terapi',
    description: 'Treatment of pain in the knee, hip, elbow, and musculoskeletal system. Manual therapy in Frederiksberg. Book online.',
    h1: 'Musculoskeletal Pain',
    intro: 'Pain in the knee, hip, or elbow is rarely just wear and tear. Usually it is about loading patterns that have been running skewed for a long time.',
    body: [
      'The musculoskeletal system is connected. Knee pain often comes from a hip that is not moving well. Elbow pain can come from the neck. Treatment that only looks at the painful spot does not always fix the underlying problem.',
      'We assess the full movement chain and find where the problem is actually coming from. Then we treat there, not just where it hurts.',
      'You get a clear explanation of what is happening in your body and exercises that address the cause. Many people improve quickly, but lasting change requires understanding your own movement pattern.',
    ],
    backLabel: 'Back to the home page',
    homeHref: '/en/',
  },
  {
    slug: '/en/tension-headache',
    altSlug: '/spaendingshovedpine',
    title: 'Tension Headache Treatment Frederiksberg | Klinik for Manuel Terapi',
    description: 'Treatment of tension headaches focused on the jaw, neck, and upper back. Manual therapy in Frederiksberg. Book online.',
    h1: 'Tension Headache',
    intro: 'Tension headaches feel like pressure behind the eyes or a band around the head. They come from muscles, not from the brain.',
    body: [
      'The muscle groups most often behind tension headaches are the jaw, the neck, and the upper back. Stress, long hours at a screen, and poor sleep positions are the usual triggers. Many people take painkillers and wait it out, but that does not address what is generating the headache.',
      'Manual therapy works directly with the tense muscles and restricted joints. We find the trigger points sending pain up into the head and treat them. It is anatomy, not mystery.',
      'Many patients with recurring tension headaches see far fewer episodes after treatment. Finding the individual pattern matters, because it never sits in quite the same place in two people.',
    ],
    backLabel: 'Back to the home page',
    homeHref: '/en/',
  },
  {
    slug: '/en/rehabilitation',
    altSlug: '/genoptraening',
    title: 'Rehabilitation and Home Exercises Frederiksberg | Klinik for Manuel Terapi',
    description: 'Rehabilitation, body awareness, and exercises you can do at home. Manual therapy in Frederiksberg. Book online.',
    h1: 'Rehabilitation and Body Awareness',
    intro: 'Rehabilitation is about recovering the movement patterns the body has forgotten, or never properly learned.',
    body: [
      'After an injury or a period of pain, the body naturally starts moving differently to avoid what hurt. Smart in the short term. In the long term, it creates new problems.',
      'We work to restore the mobility and strength the body needs to function without compensating. That happens in the session, but just as much through the exercises you do at home.',
      'You leave with a concrete plan. The exercises are chosen based on what we find in your body and explained so you understand what they do and why.',
    ],
    backLabel: 'Back to the home page',
    homeHref: '/en/',
  },
  {
    slug: '/en/sports-injuries',
    altSlug: '/idraetsskader',
    title: 'Sports Injury Treatment Frederiksberg | Klinik for Manuel Terapi',
    description: 'Assessment and treatment of sports injuries. Manual therapy in Frederiksberg. Book online.',
    h1: 'Sports Injuries',
    intro: 'A sports injury can keep you out of training for weeks. It does not have to.',
    body: [
      'The most common sports injuries are sprains, muscle strains, and overuse injuries. They tend to heal better when you understand the mechanism and treat actively, rather than just resting.',
      'We assess the injury and its causes thoroughly. We look at what broke and what made the body vulnerable in the first place. That might be a strength imbalance, a movement restriction, or an old pattern that was never addressed.',
      'You get a realistic timeline for returning to sport, a concrete plan for getting there, and clarity on what to watch for along the way.',
    ],
    backLabel: 'Back to the home page',
    homeHref: '/en/',
  },
];
```

- [ ] Create `src/content/conditions/en.ts`
- [ ] `pnpm tsc --noEmit`

---

## Task 6 — Create ConditionPage component

**File:** `src/pages/ConditionPage.tsx` (new file)

```tsx
import { Link } from 'react-router-dom';
import type { ConditionBlock } from '../content/types';
import type { Content } from '../content/types';
import Section from '../components/Section';
import ContactRow from '../components/ContactRow';

export interface ConditionPageProps {
  condition: ConditionBlock;
  t: Content;
}

export default function ConditionPage({ condition, t }: ConditionPageProps) {
  return (
    <article>
      <Section>
        <p className="eyebrow">{t.treatments.eyebrow}</p>
        <h1>{condition.h1}</h1>
        <p className="lead">{condition.intro}</p>
      </Section>
      <Section alt>
        <div className="about-body">
          {condition.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </Section>
      <Section>
        <ContactRow t={t} />
      </Section>
      <Section alt>
        <Link to={condition.homeHref} className="back-link">
          {condition.backLabel}
        </Link>
      </Section>
    </article>
  );
}
```

- [ ] Create `src/pages/ConditionPage.tsx`
- [ ] `pnpm tsc --noEmit`

---

## Task 7 — Extend App.tsx

**File:** `src/App.tsx`

1. Add imports at the top:

```ts
import ConditionPage from './pages/ConditionPage';
import type { ConditionBlock } from './content/types';
```

2. Extend the types:

```ts
type Page = 'home' | 'about' | 'condition';

interface AppProps {
  lang: Lang;
  page: Page;
  condition?: ConditionBlock;
}
```

3. Extend `HREFLANGS` to handle condition pages. Replace the static `Record` with a
   function:

```ts
function getHreflangs(page: Page, condition?: ConditionBlock): [string, string][] {
  if (page === 'condition' && condition) {
    return [
      ['da', condition.slug.startsWith('/en/') ? condition.altSlug : condition.slug],
      ['en', condition.slug.startsWith('/en/') ? condition.slug : condition.altSlug],
      ['x-default', condition.slug.startsWith('/en/') ? condition.altSlug : condition.slug],
    ];
  }
  const pairs: Record<'home' | 'about', [string, string][]> = {
    home: hl('/', '/en/'),
    about: hl('/om-mig', '/en/about-me'),
  };
  return pairs[page as 'home' | 'about'];
}
```

4. Update `App` function signature and body:

```ts
export default function App({ lang, page, condition }: AppProps) {
  const t = lang === 'da' ? da : en;
  const heroRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const isHome = page === 'home';
  const isCondition = page === 'condition';
  const isAbout = page === 'about';
  const headTitle = isAbout ? t.aboutPage.title
    : isCondition ? condition?.title
    : undefined;
  const headDesc = isAbout ? t.aboutPage.description
    : isCondition ? condition?.description
    : undefined;
  const headOg = isAbout ? t.aboutPage.ogImage : undefined;

  useEffect(() => {
    document.documentElement.lang = lang;
    const base = window.location.origin + import.meta.env.BASE_URL.replace(/\/$/, '');
    for (const [hl, path] of getHreflangs(page, condition)) {
      let l = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hl}"]`);
      if (!l) {
        l = document.createElement('link');
        l.rel = 'alternate';
        l.hreflang = hl;
        document.head.appendChild(l);
      }
      const next = base + path;
      if (l.href !== next) l.href = next;
    }
  }, [lang, page, condition]);

  return (
    <>
      <HeadMeta t={t} title={headTitle} description={headDesc} ogImage={headOg} />
      <ScrollRestoration />
      <a id="top" />
      <div className="parallax" aria-hidden />
      <SiteHeader t={t} />
      <main>
        {isAbout && <About t={t} />}
        {isCondition && condition && <ConditionPage condition={condition} t={t} />}
        {isHome && <Home t={t} heroRef={heroRef} />}
      </main>
      <SiteFooter t={t} footerRef={footerRef} />
      {isHome && <Fab cta={t.cta} heroRef={heroRef} footerRef={footerRef} />}
    </>
  );
}
```

- [ ] Edit `src/App.tsx`
- [ ] `pnpm tsc --noEmit`

---

## Task 8 — Add 12 routes to main.tsx

**File:** `src/main.tsx`

Add imports:

```ts
import { daConditions } from './content/conditions/da';
import { enConditions } from './content/conditions/en';
```

Extend the router array:

```ts
const router = createBrowserRouter(
  [
    { path: '/', element: <App lang="da" page="home" /> },
    { path: '/en/', element: <App lang="en" page="home" /> },
    { path: '/om-mig', element: <App lang="da" page="about" /> },
    { path: '/en/about-me', element: <App lang="en" page="about" /> },
    ...daConditions.map((c) => ({
      path: c.slug,
      element: <App lang="da" page="condition" condition={c} />,
    })),
    ...enConditions.map((c) => ({
      path: c.slug,
      element: <App lang="en" page="condition" condition={c} />,
    })),
  ],
  { basename: '/klinik-for-manuel-terapi' },
);
```

- [ ] Edit `src/main.tsx`
- [ ] `pnpm tsc --noEmit`

---

## Task 9 — Link treatment cards

**File:** `src/components/Treatments.tsx` (or wherever the treatment grid renders)

Wrap each treatment card in a `<Link>` when `conditionSlug` is present:

```tsx
import { Link } from 'react-router-dom';

// Inside the map:
{items.map(({ title, body, conditionSlug }) =>
  conditionSlug ? (
    <Link key={title} to={conditionSlug} className="treatment-link">
      <div className="treatment-item">
        <p className="treatment-title">{title}</p>
        <p>{body}</p>
      </div>
    </Link>
  ) : (
    <div key={title} className="treatment-item">
      <p className="treatment-title">{title}</p>
      <p>{body}</p>
    </div>
  )
)}
```

Note: check the actual class names in the existing Treatments component before editing.

- [ ] Read `src/components/Treatments.tsx` (or equivalent) and apply the pattern above
- [ ] `pnpm tsc --noEmit`

---

## Task 10 — Add treatment-link CSS

**File:** `src/styles/components.css`

Append:

```css
/* Condition page links on treatment cards */
.treatment-link {
  display: block;
  color: inherit;
  text-decoration: none;
}
.treatment-link .treatment-item {
  position: relative;
}
.treatment-link .treatment-item::after {
  content: '→';
  position: absolute;
  bottom: var(--space-3);
  right: var(--space-3);
  color: var(--brand);
  font-size: var(--fs-sm);
}
```

- [ ] Edit `src/styles/components.css`

---

## Task 11 — Extend build script for static paths

**File:** `package.json`

The current build script copies `dist/index.html` for `/om-mig` and `/en/about-me`.
Add the 12 condition paths using the same pattern:

```json
"build": "vite-ssg build && mkdir -p dist/om-mig && cp dist/index.html dist/om-mig/index.html && mkdir -p dist/en/about-me && cp dist/index.html dist/en/about-me/index.html && mkdir -p dist/nakkesmerter && cp dist/index.html dist/nakkesmerter/index.html && mkdir -p dist/laaste-led && cp dist/index.html dist/laaste-led/index.html && mkdir -p dist/smerter-i-bevaegelse && cp dist/index.html dist/smerter-i-bevaegelse/index.html && mkdir -p dist/spaendingshovedpine && cp dist/index.html dist/spaendingshovedpine/index.html && mkdir -p dist/genoptraening && cp dist/index.html dist/genoptraening/index.html && mkdir -p dist/idraetsskader && cp dist/index.html dist/idraetsskader/index.html && mkdir -p dist/en/neck-pain && cp dist/index.html dist/en/neck-pain/index.html && mkdir -p dist/en/locked-joints && cp dist/index.html dist/en/locked-joints/index.html && mkdir -p dist/en/musculoskeletal-pain && cp dist/index.html dist/en/musculoskeletal-pain/index.html && mkdir -p dist/en/tension-headache && cp dist/index.html dist/en/tension-headache/index.html && mkdir -p dist/en/rehabilitation && cp dist/index.html dist/en/rehabilitation/index.html && mkdir -p dist/en/sports-injuries && cp dist/index.html dist/en/sports-injuries/index.html"
```

Read the current `package.json` build script first and extend it exactly.

- [ ] Edit `package.json`
- [ ] `pnpm build` — confirm all 12 condition paths exist in `dist/`

---

## Task 12 — Full verification

- [ ] `pnpm tsc --noEmit && pnpm build` — clean
- [ ] `pnpm dev` — open `http://localhost:5173/klinik-for-manuel-terapi/`
- [ ] Click each treatment card → lands on correct condition page
- [ ] Check back link → returns to home
- [ ] Open `/en/` → EN cards link to `/en/*` slugs
- [ ] DevTools `<head>` on condition page: title tag correct, og:title correct, hreflang alternate pointing to other language
- [ ] Commit with message: `feat(conditions): add 6 condition landing pages (DA + EN)`
