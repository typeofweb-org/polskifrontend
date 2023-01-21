import { Readable } from 'stream';

import Cheerio from 'cheerio';
import FeedParser from 'feedparser';
import Iconv from 'iconv-lite';
import Ms from 'ms';
import { EMPTY, firstValueFrom, from, of } from 'rxjs';
import { catchError, map, mergeMap, groupBy, last, timeout, filter } from 'rxjs/operators';
import Slugify from 'slugify';

import {
  getBlogName,
  getFavicon,
  getYouTubeChannelIdFromUrl,
  getYouTubeUserFromUrl,
} from './contentCreatorFunctions';
import { getYouTubeChannelFavicon } from './external-services/youtube';
import { logger } from './logger';
import { streamToRx } from './rxjs-utils';

import type { Blog, Prisma, PrismaClient } from '@prisma/client';

const MAX_CONCURRENCY = 5;
const MAX_FETCHING_TIME = Ms('6 s');

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
      const responseStream = Readable.from(
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- ok
        maybeTranslate(res.body as unknown as NodeJS.ReadableStream, charset),
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
  const params = str.split(';').reduce<Record<string, string | undefined>>((params, param) => {
    const parts = param.split('=').map((part) => part.trim());
    if (parts.length === 2) {
      const [key, val] = parts;
      params[key] = val;
    }
    return params;
  }, {});
  return params;
}

function maybeTranslate(res: NodeJS.ReadableStream, charset: string | undefined) {
  if (charset && !/utf-*8/i.test(charset)) {
    try {
      const iconvStream = Iconv.decodeStream(charset);
      return res.pipe(iconvStream);
    } catch (err) {
      console.error(err);
      res.emit('error', err);
    }
  }
  return res;
}

const feedParserItemToArticle =
  (now: Date) =>
  (blogId: Blog['id']) =>
  (item: FeedParser.Item): Prisma.ArticleCreateInput => {
    logger.debug(`Mapping articles for blog ID ${blogId}`);

    const description =
      item.summary ||
      item.description ||
      item.meta.description ||
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/consistent-type-assertions -- @todo legacy ?
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

export const updateFeeds = async (prisma: PrismaClient) => {
  const blogs = await prisma.blog.findMany({
    where: {
      isPublic: true,
    },
  });
  const now = new Date();

  logger.info(`Found blogs in SQL database ${blogs.length}`);
  return await firstValueFrom(
    from(blogs).pipe(
      mergeMap(getNewArticlesForBlog(now), MAX_CONCURRENCY),
      mergeMap((article) =>
        from(prisma.article.create({ data: article })).pipe(
          map((article) => article.blogId),
          catchError((err: Error) => {
            logger.error(err, `Database error`);
            return of(article.blog.connect?.id);
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
    ),
  );
};

const getUpdatedInfoFor = (blog: Blog) => {
  return from(fetchFeedFor(blog)).pipe(
    timeout(MAX_FETCHING_TIME),
    catchError((err: Error) => {
      logger.error(`Timeout while fetching blog: ${blog.id} ${blog.name} – ${err?.toString()}`);
      return EMPTY;
    }),
    mergeMap((res) => from(res.text())),
    mergeMap((text) => from(getBlogInfoFromRss(text, blog))),
    map((updatedInfo) => {
      logger.debug(`Got updated info for blog: ${updatedInfo.name || blog.name}`);
      return {
        blog,
        updatedInfo,
      };
    }),
  );
};

const getBlogInfoFromRss = async (rssContent: string, blog: Blog) => {
  const channelId = getYouTubeChannelIdFromUrl(blog.href);
  const username = getYouTubeUserFromUrl(blog.href);

  const $ = Cheerio.load(rssContent, { xmlMode: true, decodeEntities: true });
  const type = blog.rss.includes('youtube.com') ? 'youtube' : 'other';

  const blogName = getBlogName($) || undefined;
  const favicon =
    (type === 'youtube' ? await getYouTubeChannelFavicon({ channelId, username }) : '') ||
    getFavicon($) ||
    undefined;

  const name = blogName ? (type === 'youtube' ? `${blogName} YouTube` : blogName) : undefined;
  const slug = name ? Slugify(name, { lower: true }) : undefined;

  return {
    name,
    favicon,
    slug,
  };
};

export const updateBlogs = async (prisma: PrismaClient) => {
  const blogs = await prisma.blog.findMany({
    where: {
      isPublic: true,
    },
  });

  return await firstValueFrom(
    from(blogs).pipe(
      mergeMap(getUpdatedInfoFor, MAX_CONCURRENCY),
      mergeMap(({ blog, updatedInfo }) => {
        logger.debug(`Updating blog: ${updatedInfo.name || blog.name}`);
        return from(
          prisma.blog.update({
            where: {
              id: blog.id,
            },
            data: updatedInfo,
          }),
        );
      }),
    ),
  );
};
