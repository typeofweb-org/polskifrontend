import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../components/Content/Content';
import { ContentTitle } from '../../../components/Content/ContentTitle';

import type { ReactNode } from 'react';

type LoginLayoutProps = {
  readonly children: ReactNode;
};

export default function LoginLayout({ children }: LoginLayoutProps) {
  return (
    <>
      <ContentTitle>LOGOWANIE</ContentTitle>

      <ButtonAsLink href="/" icon="arrow-left2">
        Strona Główna
      </ButtonAsLink>

      <Content>{children}</Content>
    </>
  );
}
