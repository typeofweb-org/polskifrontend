import type { Blog, Prisma } from '@prisma/client';
import FeedParser from 'feedparser';
import Iconv from 'iconv-lite';
import ms from 'ms';
import { EMPTY, from, of } from 'rxjs';
import { catchError, map, mergeMap, groupBy, last, timeout, filter } from 'rxjs/operators';
import Slugify from 'slugify';
import { prisma } from './db';

import { logger } from './logger';
import { streamToRx } from './rxjs-utils';

const MAX_CONCURRENCY = 5;
const MAX_FETCHING_TIME = ms('6 s');

async function fetchFeedFor(blog: Blog) {
  const res = await fetch(blog.rss, {
    headers: {
      'user-agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
      accept: 'text/html,application/xhtml+xml',
    },
  });

  if (res.status < 200 || res.status > 299) {
    throw new Error(`Bad response: ${res.status} for blog ${blog.id} ${blog.name}`);
  }

  return res;
}

function getFeedStreamFor(blog: Blog) {
  logger.info(`Getting stream for blog ${blog.name}`);
  return from(fetchFeedFor(blog)).pipe(
    timeout(MAX_FETCHING_TIME),
    catchError((err: Error) => {
      logger.error(`Timeout while fetching blog: ${blog.id} ${blog.name} – ${err?.toString()}`);
      return EMPTY;
    }),
    mergeMap((res) => {
      logger.debug(`Got stream for blog ${blog.name}`);
      const charset = getContentTypeParams(res.headers.get('content-type') || '').charset;
      const responseStream = maybeTranslate(
        (res.body as unknown) as NodeJS.ReadableStream,
        charset,
      );
      logger.debug(`Translated ${blog.name}`);
      const feedparser = new FeedParser({});
      return streamToRx<FeedParser>(responseStream.pipe(feedparser)).pipe(
        filter((item) => Boolean(item.pubdate && item.pubdate > blog.lastUpdateDate)),
      );
    }),
  );
}

function getContentTypeParams(str: string) {
  const params = str.split(';').reduce((params, param) => {
    const parts = param.split('=').map((part) => part.trim());
    if (parts.length === 2) {
      const [key, val] = parts;
      params[key] = val;
    }
    return params;
  }, {} as Record<string, string | undefined>);
  return params;
}

function maybeTranslate(res: NodeJS.ReadableStream, charset: string | undefined) {
  if (charset && !/utf-*8/i.test(charset)) {
    try {
      const iconvStream = Iconv.decodeStream(charset);
      return res.pipe(iconvStream);
    } catch (err) {
      res.emit('error', err);
    }
  }
  return res;
}

const feedParserItemToArticle = (now: Date) => (blogId: Blog['id']) => (
  item: FeedParser.Item,
): Prisma.ArticleCreateInput => {
  logger.debug(`Mapping articles for blog ID ${blogId}`);

  const description =
    item.summary ||
    item.description ||
    item.meta.description ||
    // @todo legacy ?
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ((item as any)?.['media:group']?.['media:description']?.['#'] as string | undefined) ||
    null;

  const article: Prisma.ArticleCreateInput = {
    title: item.title,
    href: item.link,
    description,
    publishedAt: item.pubdate || now,
    slug: Slugify(item.title, { lower: true }),
    blog: {
      connect: {
        id: blogId,
      },
    },
  };
  logger.debug(article, 'Mapping done!');
  return article;
};

const getNewArticlesForBlog = (now: Date) => (blog: Blog) => {
  return getFeedStreamFor(blog).pipe(
    map(feedParserItemToArticle(now)(blog.id)),
    catchError((err: Error) => {
      logger.error(`Error for blog ${blog.id} ${blog.name}: ${err?.toString()}`);
      return EMPTY;
    }),
  );
};

export const updateFeeds = async () => {
  const blogs = await prisma.blog.findMany();
  const now = new Date();

  logger.info(`Found blogs in SQL database ${blogs.length}`);
  return from(blogs)
    .pipe(
      mergeMap(getNewArticlesForBlog(now), MAX_CONCURRENCY),
      mergeMap((article) =>
        from(prisma.article.create({ data: article })).pipe(
          map((article) => article.blogId),
          catchError((err: Error) => {
            logger.error(err, `Database error`);
            return of(article.blog.connect!.id!);
          }),
        ),
      ),
      groupBy((blogId) => blogId),
      mergeMap((val) => val.pipe(last())),
      mergeMap((blogId) => {
        logger.info(`Updating blog ${blogId}`);
        return from(
          prisma.blog.update({
            where: {
              id: blogId,
            },
            data: {
              lastUpdateDate: now,
            },
          }),
        );
      }),
    )
    .toPromise();
};
