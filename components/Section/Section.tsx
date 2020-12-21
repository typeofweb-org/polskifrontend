import type { ReactNode } from 'react';
import { memo } from 'react';

import styles from './section.module.scss';

type SectionProps = {
  readonly children: ReactNode;
  readonly buttons?: ReactNode;
  readonly title?: string;
};

export const Section = memo(({ children, title, buttons }: SectionProps) => {
  return (
    <section className={styles.section}>
      {title && <h2 className={styles.heading}>{title}</h2>}
      {buttons && <div className={styles.buttons}>{buttons}</div>}
      {children}
    </section>
  );
});

Section.displayName = 'Section';
