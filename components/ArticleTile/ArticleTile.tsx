import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { detectContentGenre } from '../../utils/creator-utils';
import { addTrackingToLink } from '../../utils/link-utils';
import { ArticleDate } from '../ArticleDate/ArticleDate';

import Styles from './articleTile.module.scss';

import type { Article, Blog } from '../../types';

export type ArticleTileArticle = Pick<
  Article,
  'title' | 'publishedAt' | 'excerpt' | 'href' | 'slug' | 'blog'
>;

export type ArticleTileBlog = Pick<Blog, 'name' | 'href' | 'favicon'>;

type ArticleTileProps = {
  readonly article: ArticleTileArticle;
  readonly blog: ArticleTileBlog;
  readonly truncate?: boolean;
};

export const ArticleTile = ({ article, blog, truncate }: ArticleTileProps) => {
  const contentGenre = detectContentGenre(article);

  const { title, publishedAt, excerpt, href, slug } = article;
  const { name: blogName, favicon } = blog;

  return (
    <article className="relative rounded-xl bg-white p-4 shadow-sm">
      <div className="relative flex w-full justify-between gap-1">
        <header className="mb-2 w-full">
          <div className="mb-3 flex items-center gap-2">
            {favicon && (
              <Image
                src={favicon}
                width={40}
                height={40}
                className="h-[32px] w-[32px] align-top md:h-[40px] md:w-[40px]"
                alt=""
              />
            )}
            <p className="flex flex-col">
              <span className="font-semibold md:text-xl">{blogName}&nbsp;</span>
              <span className="text-sm capitalize text-[#4F4F4F]">{contentGenre}</span>
            </p>
          </div>

          <Link href={`/artykuly/${slug}`} className="block">
            <h3
              className={Clsx(
                'w-full text-lg font-bold hover:underline md:text-xl',
                truncate && 'overflow-hidden text-ellipsis whitespace-nowrap',
              )}
            >
              {title}
            </h3>
          </Link>
        </header>
      </div>

      <p className={Clsx('text-[#505050]', truncate && Styles.excerpt)}>{excerpt}</p>

      <div className="mt-1 flex items-center justify-between md:justify-end">
        <Link
          href={addTrackingToLink(href, { utm_medium: 'homepage' })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-fit items-center justify-center rounded-[10px] bg-[#F8F8F8] py-2 px-3 leading-4 md:absolute md:top-3 md:right-3 md:gap-3"
        >
          <FontAwesomeIcon icon={faArrowRightToBracket} className="text-primary-base" />
          <span className="font-medium text-[#797979]">URL</span>
        </Link>

        <ArticleDate publishedAt={publishedAt} />
      </div>
    </article>
  );
};
