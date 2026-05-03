import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export interface VisibilityArgs {
  /** ref pointing at the hero section — hide until this is out of view */
  heroRef: RefObject<HTMLElement>;
  /** ref pointing at the footer — re-hide when this enters view */
  footerRef: RefObject<HTMLElement>;
}

/**
 * Returns `true` when the hero is scrolled past (above the viewport)
 * AND the footer has not yet approached the viewport bottom (within 120 px).
 * Uses two IntersectionObserver instances — no scroll listeners.
 */
export function useScrollVisibility(args: VisibilityArgs): boolean {
  const { heroRef, footerRef } = args;
  const [heroOut, setHeroOut] = useState(false);
  const [footerNear, setFooterNear] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }
    const heroEl = heroRef.current;
    const footerEl = footerRef.current;
    let heroObs: IntersectionObserver | undefined;
    let footerObs: IntersectionObserver | undefined;

    if (heroEl) {
      heroObs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setHeroOut(
              entry.intersectionRatio === 0 && entry.boundingClientRect.top < 0,
            );
          }
        },
        { threshold: [0, 0.01] },
      );
      heroObs.observe(heroEl);
    }
    if (footerEl) {
      footerObs = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) setFooterNear(entry.isIntersecting);
        },
        { rootMargin: '0px 0px -120px 0px' },
      );
      footerObs.observe(footerEl);
    }
    return () => {
      heroObs?.disconnect();
      footerObs?.disconnect();
    };
  }, [heroRef, footerRef]);

  return heroOut && !footerNear;
}
