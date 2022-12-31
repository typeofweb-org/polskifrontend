import { AlgoliaSearch } from '../../components/AlgoliaSearch/AlgoliaSearch';
import { ButtonAsLink } from '../../components/ButtonAsLink/ButtonAsLink';
// import { DisplayStyleSwitch } from '../../../../components/DisplayStyleSwitch/DisplayStyleSwitch';

import Styles from './layout.module.scss';

import type { ReactNode } from 'react';

type ArticlesLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: ArticlesLayoutProps) {
  return (
    <section className={Styles.section}>
      <AlgoliaSearch>
        <h2 className={Styles.heading}>Wszystkie artykuły</h2>

        <div className={Styles.buttons}>
          <ButtonAsLink href="/zglos-serwis" icon="icon-plus">
            Dodaj serwis
          </ButtonAsLink>

          {/* <DisplayStyleSwitch value={displayStyle} onChange={changeDisplayStyle} /> */}
        </div>

        {children}
      </AlgoliaSearch>
    </section>
  );
}
