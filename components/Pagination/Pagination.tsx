import { ButtonAsLink } from '../ButtonAsLink/ButtonAsLink';

import type { DisplayStyle } from '../../utils/types/types';

type PaginationProps = {
  readonly isFirstPage: boolean;
  readonly isLastPage: boolean;
  readonly displayStyle: DisplayStyle;
  readonly previousPage: number;
  readonly nextPage: number;
};

export const Pagination = ({
  isFirstPage,
  isLastPage,
  displayStyle,
  previousPage,
  nextPage,
}: PaginationProps) => {
  return (
    <nav
      aria-label="Paginacja"
      className="my-5 flex flex-col flex-wrap items-center justify-center gap-3 sm:flex-row"
    >
      {!isLastPage && (
        <>
          <ButtonAsLink href={`/${displayStyle}/${previousPage}`} icon="arrow-left2">
            Poprzednia strona
          </ButtonAsLink>
          <ButtonAsLink href={`/${displayStyle}`}>Najnowsze</ButtonAsLink>
        </>
      )}

      {!isFirstPage && (
        <ButtonAsLink href={`/${displayStyle}/${nextPage}`} icon="arrow-right2">
          Następna strona
        </ButtonAsLink>
      )}
    </nav>
  );
};
