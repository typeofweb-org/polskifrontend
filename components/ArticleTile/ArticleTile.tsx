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
    <article className="rounded-xl bg-white p-4 shadow-sm">
      <div className="relative flex w-full justify-between">
        <header className="mb-2 w-full">
          <div className="mb-3 flex gap-2">
            {favicon && <Image src={favicon} width={40} height={40} className="align-top" alt="" />}

            <p className="flex flex-col">
              <span className="text-xl font-medium">{blogName}&nbsp;</span>
              <span className="text-sm text-[#4F4F4F]">YouTube / Blog</span>
            </p>
          </div>

          <Link href={`/artykuly/${slug}`} className="block">
            <h3
              className={Clsx(
                'w-full text-xl font-bold hover:underline',
                truncate && 'overflow-hidden text-ellipsis whitespace-nowrap',
              )}
            >
              {title}
            </h3>
          </Link>
        </header>

        <Link
          href={addTrackingToLink(href, { utm_medium: 'homepage' })}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 right-0 z-10 flex h-fit items-center justify-center gap-3 rounded-[10px] bg-[#F8F8F8] p-2"
        >
          <span className="icon-plus text-xl text-primary-base"></span>
          <span className="font-medium text-[#797979]">URL</span>
        </Link>
      </div>

      <p className={Clsx('text-[#505050]', truncate && Styles.excerpt)}>{excerpt}</p>

      <div className="mt-1 flex justify-end">
        <time className="text-sm text-[#797979]" dateTime={dateTime}>
          {readableDate}
        </time>
      </div>
    </article>
  );
};
