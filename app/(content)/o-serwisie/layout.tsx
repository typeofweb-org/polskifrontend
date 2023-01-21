import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
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

      <ButtonAsLink href="/" icon="arrow-left2">
        Strona Główna
      </ButtonAsLink>

      <Content>{children}</Content>
    </>
  );
}
