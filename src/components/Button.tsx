import type { ReactNode } from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'ghost';
  block?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  children: ReactNode;
}

/**
 * Anchor-shaped button. The site only renders link-style CTAs (booking,
 * tel:, mailto:), so a `<button>` branch isn't needed yet.
 */
export default function Button(props: ButtonProps) {
  const { variant = 'primary', block, href, target, rel, ariaLabel, children } = props;
  const cls = [
    'btn',
    variant === 'primary' ? 'btn--primary' : 'btn--ghost',
    block ? 'btn--block' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={cls} href={href} target={target} rel={rel} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
