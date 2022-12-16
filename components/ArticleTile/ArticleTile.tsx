import Clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '../../utils/date-utils';
import { addTrackingToLink } from '../../utils/link-utils';

import Styles from './articleTile.module.scss';

import type { HomePageArticle, HomePageBlog } from '../../types';

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
    <article className={Styles.article}>
      <header className={Styles.articleHeader}>
        <Link href={`/artykuly/${slug}`} className={Styles.articleTitleLink}>
          <h3 className={Clsx(Styles.articleTitle, truncate && Styles.articleTitleTruncate)}>
            {title}
          </h3>
        </Link>
        <p className={Styles.meta}>
          {favicon && (
            <Image src={favicon} width={16} height={16} className={Styles.favicon} alt="" />
          )}
          <span className={Styles.blogName}>{blogName}&nbsp;</span>
          <time className={Styles.articleDate} dateTime={dateTime}>
            {readableDate}
          </time>
        </p>
      </header>
      <p className={Clsx(truncate && Styles.excerpt)}>{excerpt}</p>
      <footer className={Styles.footer}>
        <ul className={Styles.footerList}>
          <li className={Styles.footerItem}>
            <Link href={`/artykuly/${slug}`} className={Styles.footerLink}>
              <span className={`icon-folder-open ${Styles.icon}`}></span>
              OTWÓRZ
            </Link>
          </li>
          <li className={Styles.footerItem}>
            <Link
              href={addTrackingToLink(href, { utm_medium: 'homepage' })}
              target="_blank"
              className={Styles.footerLink}
              rel="noopener noreferrer"
            >
              <span className={`icon-new-tab ${Styles.icon}`}></span>
              ORYGINAŁ
            </Link>
          </li>
        </ul>
      </footer>
    </article>
  );
};
