import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

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

      <ButtonAsLink href="/" icon={faArrowLeftLong}>
        Strona Główna
      </ButtonAsLink>

      <Content>{children}</Content>
    </>
  );
}
