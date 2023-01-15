import { Content } from '../../../components/Content/Content';
import { ContentTitle } from '../../../components/Content/ContentTitle';

import type { ReactNode } from 'react';

type AboutServiceLayoutProps = {
  readonly children: ReactNode;
};

export default function AboutServiceLayout({ children }: AboutServiceLayoutProps) {
  return (
    <>
      <ContentTitle>O serwisie</ContentTitle>
      <Content>{children}</Content>
    </>
  );
}
