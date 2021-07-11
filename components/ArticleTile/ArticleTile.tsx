import clsx from 'clsx';
import Link from 'next/link';

import type { HomePageArticle, HomePageBlog } from '../../types';
import { formatDate } from '../../utils/date-utils';
import { addTrackingToLink } from '../../utils/link-utils';

import style from './articleTile.module.scss';

export type ArticleTileArticle = Pick<
  HomePageArticle,
  'title' | 'publishedAt' | 'excerpt' | 'href' | 'slug'
>;

export type ArticleTileBlog = Pick<HomePageBlog, 'name' | 'favicon'>;

type ArticleTileProps = {
  readonly article: ArticleTileArticle;
  readonly blog: ArticleTileBlog;
  readonly truncate?: boolean;
};

export const ArticleTile = ({
  article: { title, publishedAt, excerpt, href, slug },
  blog: { name: blogName, favicon },
  truncate,
}: ArticleTileProps) => {
  const dateTime = publishedAt.toISOString();
  const readableDate = formatDate(publishedAt);

  return (
    <article className={style.article}>
      <header className={style.articleHeader}>
        <Link href={`/artykuly/${slug}`}>
          <a className={style.articleTitleLink}>
            <h3 className={clsx(style.articleTitle, truncate && style.articleTitleTruncate)}>
              {title}
            </h3>
          </a>
        </Link>
        <p className={style.meta}>
          {favicon && (
            <img
              loading="lazy"
              src={favicon}
              width={16}
              height={16}
              className={style.favicon}
              alt=""
            />
          )}
          <span className={style.blogName}>{blogName}&nbsp;</span>
          <time className={style.articleDate} dateTime={dateTime}>
            {readableDate}
          </time>
        </p>
      </header>
      <p className={clsx(truncate && style.excerpt)}>{excerpt}</p>
      <footer className={style.footer}>
        <ul className={style.footerList}>
          <li className={style.footerItem}>
            <Link href={`/artykuly/${slug}`}>
              <a className={style.footerLink}>
                <span className={`icon-folder-open ${style.icon}`}></span>
                OTWÓRZ
              </a>
            </Link>
          </li>
          <li className={style.footerItem}>
            <Link href={addTrackingToLink(href, { utm_medium: 'homepage' })}>
              <a target="_blank" className={style.footerLink} rel="noopener noreferrer">
                <span className={`icon-new-tab ${style.icon}`}></span>
                ORYGINAŁ
              </a>
            </Link>
          </li>
        </ul>
      </footer>
    </article>
  );
};
