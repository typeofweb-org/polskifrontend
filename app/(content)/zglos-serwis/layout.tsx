import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../components/Content/Content';
import { ContentTitle } from '../../../components/Content/ContentTitle';

import type { ReactNode } from 'react';

type AddContentCreatorLayoutProps = {
  readonly children: ReactNode;
};

export default function AddContentCreatorLayout({ children }: AddContentCreatorLayoutProps) {
  return (
    <>
      <ContentTitle>Zgłoś Serwis</ContentTitle>

      <ButtonAsLink href="/" icon={faArrowLeftLong}>
        Strona Główna
      </ButtonAsLink>

      <Content>{children}</Content>
    </>
  );
}
