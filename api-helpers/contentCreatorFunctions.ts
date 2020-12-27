import { URL } from 'url';

import Boom from '@hapi/boom';
import Cheerio from 'cheerio';
import Slugify from 'slugify';

import { closeConnection, openConnection } from './db';
import { isPrismaError } from './prisma-helper';

const NEVER = new Date(0);
const YOUTUBE_REGEX = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const YOUTUBE_CHANNEL_ID_REGEX = /channel\/(.*?)(\/|$)/;
const YOUTUBE_USER_REGEX = /user\/(.*?)(\/|$)/;

type BlogData = {
  readonly name: string;
  readonly href: string;
  readonly favicon: string;
  readonly rss: string;
};

type Feed = {
  readonly type: string;
  readonly url: string;
  readonly title: string;
};

export const addContentCreator = async (url: string, email?: string) => {
  try {
    const prisma = await openConnection();
    const blogData = await getBlogData(url);
    return await prisma.blog.create({
      data: {
        ...blogData,
        lastUpdateDate: NEVER,
        slug: Slugify(blogData.name, { lower: true }),
        creatorEmail: email,
      },
    });
  } catch (e) {
    if (isPrismaError(e) && e.code === 'P2002') {
      throw Boom.conflict();
    }
    throw Boom.badRequest();
  } finally {
    await closeConnection();
  }
};

const getBlogData = (url: string): Promise<BlogData> => {
  const youtubeRss = getYouTubeRss(url);
  if (youtubeRss) {
    return getBlogDataForYouTubeRss(url, youtubeRss);
  }
  return getBlogDataForUrl(url);
};

export const getYouTubeRss = (url: string) => {
  const isYoutubeUrl = YOUTUBE_REGEX.test(url);
  if (isYoutubeUrl) {
    return getYouTubeChannelFeedUrl(url);
  }
  return undefined;
};

const getYouTubeChannelFeedUrl = (url: string) => {
  if (getYouTubeChannelIdFromUrl(url)) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${
      getYouTubeChannelIdFromUrl(url) as string
    }`;
  }
  if (getYouTubeUserFromUrl(url)) {
    return `https://www.youtube.com/feeds/videos.xml?user=${getYouTubeUserFromUrl(url) as string}`;
  }
  return undefined;
};

const getYouTubeChannelIdFromUrl = (url: string) => {
  const channelId = YOUTUBE_CHANNEL_ID_REGEX.exec(url)?.[1];
  return channelId;
};

const getYouTubeUserFromUrl = (url: string) => {
  const user = YOUTUBE_USER_REGEX.exec(url)?.[1];
  return user;
};

const getBlogDataForYouTubeRss = async (url: string, youtubeRss: string) => {
  const response = await fetch(youtubeRss);
  const xmlText = await response.text();
  if (xmlText) {
    const $ = Cheerio.load(xmlText, { xmlMode: true, decodeEntities: true });
    return {
      name: getBlogName($),
      href: url,
      favicon: 'https://www.youtube.com/s/desktop/d743f786/img/favicon_48.png',
      rss: youtubeRss,
    };
  }
  throw Boom.badData();
};

const getBlogDataForUrl = async (url: string) => {
  const response = await fetch(url);
  const htmlText = await response.text();
  if (htmlText) {
    const $ = Cheerio.load(htmlText);
    const feeds = searchFeed(url, $);
    const rssFeedUrl = feeds[0]?.url;

    if (!rssFeedUrl) {
      throw Boom.badData();
    }

    const blogData = await getBlogDataFromRss(rssFeedUrl);
    if (blogData) {
      return {
        name: blogData.name,
        href: url,
        favicon: blogData.favicon,
        rss: rssFeedUrl,
      };
    }
  }

  throw Boom.badData();
};

const RSS_LINK_TYPES = [
  'application/rss+xml',
  'application/atom+xml',
  'application/rdf+xml',
  'application/rss',
  'application/atom',
  'application/rdf',
  'text/rss+xml',
  'text/atom+xml',
  'text/rdf+xml',
  'text/rss',
  'text/atom',
  'text/rdf',
];

const searchFeed = (url: string, $: cheerio.Root): readonly Feed[] => {
  return $('link[type]')
    .toArray()
    .map((link) => {
      const linkType = $(link).attr('type') as string;
      if (RSS_LINK_TYPES.includes(linkType)) {
        const feedUrl = getFeedUrl(url, $(link).attr('href') as string);
        return {
          type: linkType,
          url: feedUrl,
          title: $(link).attr('title') || feedUrl,
        } as Feed;
      }
      return null;
    })
    .filter((feed): feed is Feed => Boolean(feed));
};

export const getFeedUrl = (url: string, linkHref: string) => {
  return new URL(linkHref, url).href;
};

const getBlogDataFromRss = async (rssUrl: string) => {
  const response = await fetch(rssUrl);
  const xmlText = await response.text();
  if (xmlText) {
    const $ = Cheerio.load(xmlText, { xmlMode: true, decodeEntities: true });
    return {
      name: getBlogName($),
      favicon: getFavicon($),
    };
  }
  return undefined;
};

const getFavicon = ($: cheerio.Root) => {
  return $('image url').first().text();
};

const getBlogName = ($: cheerio.Root) => {
  return $('title').first().text();
};
