import { Content } from '../../../components/Content/Content';
import { ContentTitle } from '../../../components/Content/ContentTitle';

import type { ReactNode } from 'react';

type AboutServiceLayoutProps = {
  readonly children: ReactNode;
};

export default function AboutServiceLayout({ children }: AboutServiceLayoutProps) {
  return (
    <>
      <div className="order-1">
        <ContentTitle>O serwisie</ContentTitle>
      </div>
      <Content>{children}</Content>
    </>
  );
}
