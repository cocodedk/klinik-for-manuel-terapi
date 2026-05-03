import type { ReactNode, RefObject } from 'react';

export interface SectionProps {
  id?: string;
  alt?: boolean;
  className?: string;
  innerRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
}

export default function Section({
  id,
  alt,
  className,
  innerRef,
  children,
}: SectionProps) {
  const cls = [alt ? 'alt' : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <section className={cls || undefined} id={id} ref={innerRef}>
      <div className="container">{children}</div>
    </section>
  );
}
