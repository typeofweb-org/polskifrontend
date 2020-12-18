import Link from 'next/link';

import { formatDate } from '../../utils';

import style from './articleTile.module.scss';

type ArticleTileProps = {
  readonly title: string;
  readonly blogName: string;
  readonly publishedAt: Date;
  readonly excerpt: string;
  readonly url: string;
  readonly slug: string;
  readonly favicon?: string;
};

export const ArticleTile = ({
  title,
  blogName,
  publishedAt,
  excerpt,
  url,
  slug,
  favicon,
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
          <img src={favicon} width={16} height={16} className={style.favicon} />
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
            <Link href={url}>
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
