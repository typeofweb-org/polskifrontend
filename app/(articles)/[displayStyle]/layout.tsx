import { AlgoliaSearch } from '../../../components/AlgoliaSearch/AlgoliaSearch';
import { SwitchDisplayStyle } from '../../../components/SwitchDisplayStyle/SwitchDisplayStyle';

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
    <section>
      <AlgoliaSearch>
        <SwitchDisplayStyle value={params.displayStyle} />
        {children}
      </AlgoliaSearch>
    </section>
  );
}
