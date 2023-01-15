import { faArrowLeftLong, faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

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
    <div className="mt-8 mb-5 flex flex-wrap items-center justify-center gap-3">
      {!isLastPage && (
        <>
          <ButtonAsLink href={`/${displayStyle}/${previousPage}`} icon={faArrowLeftLong}>
            Poprzednia strona
          </ButtonAsLink>
          <ButtonAsLink href={`/${displayStyle}`}>Najnowsze</ButtonAsLink>
        </>
      )}

      {!isFirstPage && (
        <ButtonAsLink href={`/${displayStyle}/${nextPage}`} icon={faArrowRightLong}>
          Następna strona
        </ButtonAsLink>
      )}
    </div>
  );
};
