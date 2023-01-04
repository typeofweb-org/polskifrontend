import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
import { DisplayStyleSwitch } from '../../../components/DisplayStyleSwitch/DisplayStyleSwitch';

import Styles from './layout.module.scss';

import type { DisplayStyle } from '../../../types';
import type { ReactNode } from 'react';

type LayoutProps = {
  readonly children: ReactNode;
  readonly params: {
    readonly displayStyle: DisplayStyle;
    readonly page: String;
  };
};

export default function Layout({ children, params }: LayoutProps) {
  return (
    <>
      <h2 className={Styles.heading}>Wszystkie artykuły</h2>

      <div className={Styles.buttons}>
        <ButtonAsLink href="/zglos-serwis" icon="icon-plus">
          Dodaj serwis
        </ButtonAsLink>

        <DisplayStyleSwitch value={params.displayStyle} />
      </div>

      {children}
    </>
  );
}
