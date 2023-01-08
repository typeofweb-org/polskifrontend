import { ButtonAsLink } from '../ButtonAsLink/ButtonAsLink';

import Styles from './pagination.module.scss';

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
    <div className={Styles.container}>
      {!isLastPage && (
        <>
          <ButtonAsLink
            href={`/${displayStyle}/${previousPage}`}
            icon="icon-arrow-left2"
            className={Styles.nextPageButton}
          >
            Poprzednia strona
          </ButtonAsLink>
          <ButtonAsLink href={`/${displayStyle}`} className={Styles.nextPageButton}>
            Najnowsze
          </ButtonAsLink>
        </>
      )}
      {!isFirstPage && (
        <ButtonAsLink
          href={`/${displayStyle}/${nextPage}`}
          icon="icon-arrow-right2"
          className={Styles.nextPageButton}
        >
          Następna strona
        </ButtonAsLink>
      )}
    </div>
  );
};
