import { Content } from '../../../components/Content/Content';
import { ContentTitle } from '../../../components/Content/ContentTitle';

import type { ReactNode } from 'react';

type TermsOfUseLayoutProps = {
  readonly children: ReactNode;
};

export default function TermsOfUseLayout({ children }: TermsOfUseLayoutProps) {
  return (
    <>
      <div className="order-1">
        <ContentTitle>
          Regulamin polskifrontend.pl
          <p className="mx-auto mt-2 w-full text-center text-sm font-normal normal-case text-gray-medium sm:text-right">
            Wersja z dnia 27. stycznia 2021r.
          </p>
        </ContentTitle>
      </div>

      <Content>{children}</Content>
    </>
  );
}
