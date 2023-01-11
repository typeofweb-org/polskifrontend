import { ButtonAsLink } from '../ButtonAsLink/ButtonAsLink';

import type { DisplayStyle } from '../../types';

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
    <div className="mt-3 mb-5 flex flex-wrap items-center justify-center gap-3">
      {!isLastPage && (
        <>
          <ButtonAsLink href={`/${displayStyle}/${previousPage}`} icon="icon-arrow-left2">
            POPRZEDNIA STRONA
          </ButtonAsLink>
          <ButtonAsLink href={`/${displayStyle}`}>NAJNOWSZE</ButtonAsLink>
        </>
      )}

      {!isFirstPage && (
        <ButtonAsLink href={`/${displayStyle}/${nextPage}`} icon="icon-arrow-right2">
          NASTĘPNA STRONA
        </ButtonAsLink>
      )}
    </div>
  );
};
