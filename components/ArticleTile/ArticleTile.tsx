import type { HomePageArticle, HomePageBlog } from '../../types';
import { formatDate } from '../../utils/date-utils';
import { LinkAnchor } from '../LinkAnchor/LinkAnchor';

import style from './articleTile.module.scss';

type ArticleTileProps = {
  readonly article: HomePageArticle;
  readonly blog: HomePageBlog;
};

export const ArticleTile = ({
  article: { title, publishedAt, excerpt, href, slug },
  blog: { name: blogName, favicon },
}: ArticleTileProps) => {
  const dateTime = publishedAt.toISOString();
  const readableDate = formatDate(publishedAt);

  return (
    <article className={style.articleTile}>
      <header>
        <LinkAnchor className={style.articleTitleLink} href={`/artykuly/${slug}`}>
          <h3 className={style.articleTitle}>{title}</h3>
        </LinkAnchor>
        <p className={style.meta}>
          <img src={favicon || undefined} width={16} height={16} className={style.favicon} alt="" />
          {blogName}{' '}
          <time className={style.articleDate} dateTime={dateTime}>
            {readableDate}
          </time>
        </p>
      </header>
      <p>{excerpt}</p>
      <footer className={style.footer}>
        <ul className={style.footerList}>
          <li className={style.footerItem}>
            <LinkAnchor className={style.footerLink} href={`/artykuly/${slug}`}>
              <span className={`icon- ${style.icon}`}>folder-open</span>OTWÓRZ
            </LinkAnchor>
          </li>
          <li className={style.footerItem}>
            <LinkAnchor target="_blank" className={style.footerLink} href={href}>
              <span className={`icon- ${style.icon}`}>new-tab</span>ORYGINAŁ
            </LinkAnchor>
          </li>
        </ul>
      </footer>
    </article>
  );
};
