import { AlgoliaSearch } from '../../components/AlgoliaSearch/AlgoliaSearch';

import Styles from './layout.module.scss';

import type { ReactNode } from 'react';

type ArticlesLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: ArticlesLayoutProps) {
  return (
    <section className={Styles.section}>
      <AlgoliaSearch>{children}</AlgoliaSearch>
    </section>
  );
}
