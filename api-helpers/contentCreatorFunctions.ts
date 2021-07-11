import { URL } from 'url';

import Boom from '@hapi/boom';
import type { PrismaClient } from '@prisma/client';
import Cheerio from 'cheerio';
import Slugify from 'slugify';

import { getYouTubeChannelFavicon } from './youtube';

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

export const addContentCreator = async (url: string, email: string, prisma: PrismaClient) => {
  const { data, type } = await getBlogData(url);
  const name = type === 'youtube' ? `${data.name} YouTube` : data.name;
  const slug = Slugify(name, { lower: true });

  return prisma.blog.create({
    data: {
      ...data,
      name,
      slug,
      lastUpdateDate: NEVER,
      creatorEmail: email,
    },
  });
};

type BlogType = 'youtube' | 'other';
const getBlogData = async (
  url: string,
): Promise<{ readonly data: BlogData; readonly type: BlogType }> => {
  const youtubeRssUrl = getYouTubeRss(url);
  if (youtubeRssUrl) {
    return { data: await getBlogDataForYouTubeRss(url, youtubeRssUrl), type: 'youtube' };
  }
  return { data: await getBlogDataForUrl(url), type: 'other' };
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
  throw Boom.badRequest();
};

export const getYouTubeChannelIdFromUrl = (url: string) => {
  const channelId = YOUTUBE_CHANNEL_ID_REGEX.exec(url)?.[1];
  return channelId;
};

export const getYouTubeUserFromUrl = (url: string) => {
  const user = YOUTUBE_USER_REGEX.exec(url)?.[1];
  return user;
};

const getBlogDataForYouTubeRss = async (url: string, youtubeRssUrl: string) => {
  const channelId = getYouTubeChannelIdFromUrl(url);
  const username = getYouTubeUserFromUrl(url);

  const [favicon, rssResponse] = await Promise.all([
    getYouTubeChannelFavicon({ channelId, username }),
    fetch(youtubeRssUrl),
  ]);

  const xmlText = await rssResponse.text();
  if (xmlText) {
    const $ = Cheerio.load(xmlText, { xmlMode: true, decodeEntities: true });
    return {
      name: getBlogName($),
      href: url,
      favicon: favicon,
      rss: youtubeRssUrl,
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

export const getFavicon = ($: cheerio.Root) => {
  return $('image url').first().text();
};

export const getBlogName = ($: cheerio.Root) => {
  return $('title').first().text();
};
