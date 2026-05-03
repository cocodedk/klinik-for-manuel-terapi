# Plan 05 — `Fab.tsx` + `useScrollVisibility.ts` + `fab.css`

## Goal

Floating action cluster bottom-right that:

1. Is hidden until the hero leaves the viewport.
2. Tucks itself away ~120 px before the footer reaches the viewport bottom
   so it never overlaps footer content.
3. Honors `prefers-reduced-motion` (cross-fade only).
4. Is keyboard reachable; never traps focus.

## Inputs

- `docs/design.md` §4 (FAB), §5 (motion)
- Token vars in `src/styles/tokens.css`
- The class-name contract from plan 04

## Outputs

- `src/components/Fab.tsx` (≤ 100 lines)
- `src/hooks/useScrollVisibility.ts` (≤ 60 lines)
- `src/styles/fab.css` (≤ 80 lines)

## `useScrollVisibility.ts` contract

```ts
export interface VisibilityArgs {
  /** ref pointing at the hero section — hide until this is out of view */
  heroRef: React.RefObject<HTMLElement>;
  /** ref pointing at the footer — re-hide when this enters view */
  footerRef: React.RefObject<HTMLElement>;
}
export function useScrollVisibility(args: VisibilityArgs): boolean;
```

Implementation: two `IntersectionObserver` instances. Returns `true` when
hero is *below* the viewport bottom **and** footer is *above* the viewport
bottom (with a 120 px root-margin shrink). No `scroll` listener — observers
only.

Reduced-motion path: still returns the same boolean; CSS handles motion.

## `src/components/Fab.tsx` outline

```tsx
import { useRef } from 'react';
import { useScrollVisibility } from '../hooks/useScrollVisibility';

export interface FabProps {
  bookingUrl: string;
  bookingLabel: string;   // localized
  phoneE164: string;      // e.g. '+4551529620'
  phoneLabel: string;     // a11y
  email: string;
  emailLabel: string;     // a11y
  heroRef: React.RefObject<HTMLElement>;
  footerRef: React.RefObject<HTMLElement>;
}

export function Fab(props: FabProps) {
  const visible = useScrollVisibility({ heroRef: props.heroRef, footerRef: props.footerRef });
  return (
    <div
      className={`fab ${visible ? 'is-visible' : ''}`}
      aria-hidden={visible ? undefined : true}
    >
      <a className="fab__btn fab__btn--primary" href={props.bookingUrl} target="_blank" rel="noopener">
        <svg /* calendar icon */ />
        <span>{props.bookingLabel}</span>
      </a>
      <a className="fab__btn fab__btn--icon" href={`tel:${props.phoneE164}`} aria-label={props.phoneLabel}>
        <svg /* phone icon */ />
      </a>
      <a className="fab__btn fab__btn--icon" href={`mailto:${props.email}`} aria-label={props.emailLabel}>
        <svg /* mail icon */ />
      </a>
    </div>
  );
}
```

Icons: inline SVG `<path>` (Heroicons-derived `outline` set is fine). No
external icon library — stays under 200 lines.

## `src/styles/fab.css` skeleton

```css
.fab {
  position: fixed;
  inset-block-end: var(--space-5);
  inset-inline-end: var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-3);
  z-index: 60;
  opacity: 0;
  transform: translateY(.5rem);
  pointer-events: none;
  transition: opacity .25s ease, transform .25s ease;
}
.fab.is-visible {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}
.fab__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  text-decoration: none;
  background: var(--brand);
  color: var(--bg);
  box-shadow: var(--shadow-2);
  min-width: 56px;
  min-height: 56px;
}
.fab__btn--primary {
  border-radius: var(--radius-pill);
  padding: 0 1.25rem;
  font-weight: 600;
}
.fab__btn--icon {
  width: 56px;
  border-radius: 50%;
  background: var(--surface);
  color: var(--brand);
  border: 1px solid var(--line);
}
.fab__btn:hover { filter: brightness(1.05); }

@media (prefers-reduced-motion: reduce) {
  .fab { transition: opacity .25s ease; transform: none; }
}
```

## Edge cases

- Above the fold the FAB is hidden — in-flow CTAs do the work.
- When the hero is taller than the viewport (small phones in landscape), the
  observer still triggers correctly because the threshold is the hero
  bottom, not its top.
- If JS fails, the FAB stays hidden (default `.fab` opacity 0). The in-flow
  CTAs continue to work — the FAB is a progressive enhancement.

## Acceptance

- `wc -l` each file ≤ ceiling.
- Smoke route: render `<Fab>` with stub refs and a tall scroll body; verify
  the `is-visible` class toggles correctly across hero / mid / footer
  positions.
- Tap-targets ≥ 44 px (FABs are 56).
- Lighthouse a11y check passes for the FAB cluster (ARIA labels, focus
  ring, color contrast).
