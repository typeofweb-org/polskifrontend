import Link from 'next/link';

import type { HomePageArticle, HomePageBlog } from '../../types';
import { formatDate } from '../../utils/date-utils';

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
        <Link href={`/artykuly/${slug}`}>
          <a className={style.articleTitleLink}>
            <h3 className={style.articleTitle}>{title}</h3>
          </a>
        </Link>
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
            <Link href={`/artykuly/${slug}`}>
              <a className={style.footerLink}>
                <span className={`icon- ${style.icon}`}>folder-open</span>OTWÓRZ
              </a>
            </Link>
          </li>
          <li className={style.footerItem}>
            <Link href={href}>
              <a target="_blank" className={style.footerLink}>
                <span className={`icon- ${style.icon}`}>new-tab</span>ORYGINAŁ
              </a>
            </Link>
          </li>
        </ul>
      </footer>
    </article>
  );
};
