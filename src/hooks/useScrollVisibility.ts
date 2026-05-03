import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

export interface VisibilityArgs {
  heroRef: RefObject<HTMLElement | null>;
  footerRef: RefObject<HTMLElement | null>;
}

export function useScrollVisibility(args: VisibilityArgs): boolean {
  const { heroRef, footerRef } = args;
  const [heroOut, setHeroOut] = useState(false);
  const [footerNear, setFooterNear] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const heroEl = heroRef.current;
    const footerEl = footerRef.current;
    let heroObs: IntersectionObserver | undefined;
    let footerObs: IntersectionObserver | undefined;

    if (heroEl) {
      heroObs = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          setHeroOut(
            entry.intersectionRatio === 0 && entry.boundingClientRect.top < 0,
          );
        },
        { threshold: 0 },
      );
      heroObs.observe(heroEl);
    }
    if (footerEl) {
      footerObs = new IntersectionObserver(
        ([entry]) => {
          if (entry) setFooterNear(entry.isIntersecting);
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
