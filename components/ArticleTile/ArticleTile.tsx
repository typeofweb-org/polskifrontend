import Clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { formatDate } from '../../utils/date-utils';
import { addTrackingToLink } from '../../utils/link-utils';

import Styles from './articleTile.module.scss';

import type { Article, Blog } from '../../types';

export type ArticleTileArticle = Pick<
  Article,
  'title' | 'publishedAt' | 'excerpt' | 'href' | 'slug'
>;
export type ArticleTileBlog = Pick<Blog, 'name' | 'favicon'>;

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
    <article className="relative rounded-xl bg-white p-4 shadow-sm">
      <div className="relative flex w-full justify-between gap-1">
        <header className="mb-2 w-full">
          <div className="mb-3 flex items-center gap-2">
            {favicon && (
              <Image
                src={favicon}
                width={40}
                height={40}
                className="h-[40px] w-[40px] align-top"
                alt=""
              />
            )}
            <p className="flex flex-col">
              <span className="font-semibold md:text-xl">{blogName}&nbsp;</span>
              <span className="text-sm text-[#4F4F4F]">YouTube / Blog</span>
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

      <div className="mt-1 flex items-center justify-between">
        <Link
          href={addTrackingToLink(href, { utm_medium: 'homepage' })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-fit items-center justify-center gap-2 rounded-[10px] bg-[#F8F8F8] py-2 px-3 md:absolute md:top-3 md:right-3 md:gap-3"
        >
          <span className="icon-plus text-primary-base md:text-xl"></span>
          <span className="font-medium text-[#797979]">URL</span>
        </Link>

        <time className="text-sm text-[#797979]" dateTime={dateTime}>
          {readableDate}
        </time>
      </div>
    </article>
  );
};
