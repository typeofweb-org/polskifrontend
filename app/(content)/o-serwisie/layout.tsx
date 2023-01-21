import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../components/Content/Content';
import { ContentNavigation } from '../../../components/Content/ContentNavigation';
import { ContentTitle } from '../../../components/Content/ContentTitle';

import type { ReactNode } from 'react';

type AboutServiceLayoutProps = {
  readonly children: ReactNode;
};

export default function AboutServiceLayout({ children }: AboutServiceLayoutProps) {
  return (
    <>
      <ContentTitle>O serwisie</ContentTitle>

      <ContentNavigation>
        <ButtonAsLink href="/" icon="arrow-left2">
          Strona Główna
        </ButtonAsLink>
      </ContentNavigation>

      <Content>{children}</Content>
    </>
  );
}
