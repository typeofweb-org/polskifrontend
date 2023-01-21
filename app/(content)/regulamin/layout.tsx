import { ButtonAsLink } from '../../../components/ButtonAsLink/ButtonAsLink';
import { Content } from '../../../components/Content/Content';
import { ContentTitle } from '../../../components/Content/ContentTitle';

import type { ReactNode } from 'react';

type TermsOfUseLayoutProps = {
  readonly children: ReactNode;
};

export default function TermsOfUseLayout({ children }: TermsOfUseLayoutProps) {
  return (
    <>
      <ContentTitle>
        Regulamin polskifrontend.pl
        <p className="mx-auto mt-2 w-full text-center text-sm font-normal normal-case text-gray-secondary sm:text-right">
          Wersja z dnia 27. stycznia 2021r.
        </p>
      </ContentTitle>

      <ButtonAsLink href="/" icon="arrow-left2">
        Strona Główna
      </ButtonAsLink>

      <Content>{children}</Content>
    </>
  );
}
