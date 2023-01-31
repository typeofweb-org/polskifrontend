import Clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { detectContentGenre } from '../../utils/creator-utils';
import { addTrackingToLink } from '../../utils/link-utils';
import { ArticleDate } from '../ArticleDate/ArticleDate';

import Styles from './articleTile.module.scss';

import type { ArticleFromBlog, BlogFromArticle } from '../../types';

type ArticleTileProps = {
  readonly article: ArticleFromBlog;
  readonly blog: BlogFromArticle;
  readonly truncate?: boolean;
  readonly isInGrid: boolean;
};

export const ArticleTile = ({ article, blog, truncate, isInGrid }: ArticleTileProps) => {
  const contentGenre = detectContentGenre(article, blog);

  const { title, publishedAt, excerpt, href, slug } = article;
  const { name: blogName, favicon } = blog;

  const TitleTag = isInGrid ? 'h4' : 'h3';

  return (
    <article className="relative rounded-xl bg-theme-primary p-4 shadow-sm">
      <div className="relative flex w-full justify-between gap-1">
        <header className="mb-2 w-full">
          <div className="mb-3 flex items-center gap-2">
            {favicon && (
              <Image
                src={favicon}
                width={40}
                height={40}
                className="h-8 w-8 align-top md:h-10 md:w-10"
                alt=""
              />
            )}
            <p className="flex w-full flex-col overflow-hidden md:w-3/4">
              <span className="font-semibold md:text-xl">{blogName}&nbsp;</span>
              <span className="text-sm capitalize text-gray-primary">{contentGenre}</span>
            </p>
          </div>

          <Link href={`/artykuly/${slug}`} className="block">
            <TitleTag
              className={Clsx(
                'w-full text-lg font-bold leading-[1.3] hover:underline md:text-xl',
                truncate && 'overflow-hidden text-ellipsis whitespace-nowrap',
              )}
            >
              {title}
            </TitleTag>
          </Link>
        </header>
      </div>

      <p className={Clsx('text-gray-primary', truncate && Styles.excerpt)}>{excerpt}</p>

      <footer className="mt-1 flex items-center justify-between md:justify-end">
        <Link
          href={addTrackingToLink(href, { utm_medium: 'homepage' })}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex h-fit items-center justify-center gap-2 rounded-[10px] bg-theme-secondary py-2 px-3 leading-4 md:absolute md:top-3 md:right-3 md:mt-0"
        >
          <Image src="/icons/link.svg" width="13" height="13" alt="" />
          <span className="font-medium text-gray-secondary">URL</span>
        </Link>

        <div className="mt-1">
          <ArticleDate publishedAt={publishedAt} />
        </div>
      </footer>
    </article>
  );
};
