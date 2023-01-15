import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

import { ButtonAsLink } from '../../components/ButtonAsLink/ButtonAsLink';

import type { ReactNode } from 'react';

type ContentLayoutProps = {
  readonly children: ReactNode;
};

// Children inside this layout (and nested layouts)
// are ordered by flex "order-x" property:
// 1. ContentTitle (h2)
// 2. Strona Główna (back link)
// 3. Main Content (article)
export default function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <section className="mx-auto flex max-w-6xl flex-col">
      <div className="order-2 p-4 md:py-8 md:pb-4">
        <ButtonAsLink href="/" icon={faArrowLeftLong}>
          Strona Główna
        </ButtonAsLink>
      </div>

      {children}
    </section>
  );
}
