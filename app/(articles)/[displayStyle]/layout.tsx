import { AlgoliaSearch } from '../../../components/AlgoliaSearch/AlgoliaSearch';
import { SwitchDisplayStyle } from '../../../components/SwitchDisplayStyle/SwitchDisplayStyle';

import type { DisplayStyle } from '../../../types';
import type { ReactNode } from 'react';

type ArticlesLayoutProps = {
  readonly children: ReactNode;
  readonly params: {
    readonly displayStyle: DisplayStyle;
    readonly page: String;
  };
};

export default function ArticlesLayout({ children, params }: ArticlesLayoutProps) {
  return (
    <section>
      <AlgoliaSearch>
        <SwitchDisplayStyle value={params.displayStyle} />
        {children}
      </AlgoliaSearch>
    </section>
  );
}
