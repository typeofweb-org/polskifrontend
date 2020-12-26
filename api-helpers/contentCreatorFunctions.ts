import { URL } from 'url';

import Boom from '@hapi/boom';
import cheerio from 'cheerio';
import Slugify from 'slugify';

import { closeConnection, openConnection } from './db';

const NEVER = new Date(0);

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

export const addContentCreator = async (url: string) => {
  try {
    const prisma = await openConnection();
    const blogData = await getBlogData(url);
    return await prisma.blog.create({
      data: { ...blogData, lastUpdateDate: NEVER, slug: Slugify(blogData.name, { lower: true }) },
    });
  } finally {
    await closeConnection();
  }
};

const getBlogData = async (url: string): Promise<BlogData> => {
  const youtubeRss = getYoutubeRss(url);
  if (youtubeRss) {
    const response = await fetch(youtubeRss);
    const xmlText = await response.text();
    if (xmlText) {
      const $ = cheerio.load(xmlText);
      return {
        name: getBlogName($),
        href: url,
        favicon:
          (await getYoutubeChannelImageSource(url)) ||
          'https://www.youtube.com/s/desktop/d743f786/img/favicon_48.png',
        rss: youtubeRss,
      };
    }
    throw Boom.badData();
  }
  const response = await fetch(url);
  const htmlText = await response.text();
  if (htmlText) {
    const $ = cheerio.load(htmlText);
    const feeds = searchFeed(url, $);
    const rssFeedUrl = feeds[0].url;
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

const getYoutubeRss = (url: string) => {
  const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
  const isYoutubeUrl = regex.test(url);

  if (isYoutubeUrl) {
    return getYouTubeChannelFeedUrl(url);
  }
  return undefined;
};

const getYouTubeChannelFeedUrl = (url: string) => {
  if (getYouTubeChannelIdFromUrl(url)) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${getYouTubeChannelIdFromUrl(url)}`;
  }
  if (getYouTubeUserIdFromUrl(url)) {
    return `https://www.youtube.com/feeds/videos.xml?user=${getYouTubeUserIdFromUrl(url)}`;
  }
  return undefined;
};

const getYouTubeChannelIdFromUrl = (url: string) => {
  const urlWithoutParams = getUrlWithoutParams(url);
  return urlWithoutParams.split('channel/')[1].split('/')[0];
};

const getYouTubeUserIdFromUrl = (url: string) => {
  const urlWithoutParams = getUrlWithoutParams(url);
  return urlWithoutParams.split('user/')[1].split('/')[0];
};

const getUrlWithoutParams = (url: string) => {
  return url.split('?')[0];
};

const getYoutubeChannelImageSource = async (url: string) => {
  const response = await fetch(url);
  const htmlText = await response.text();
  if (htmlText) {
    const $ = cheerio.load(htmlText);
    return $('yt-img-shadow img').attr('src');
  }

  return undefined;
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
    const $ = cheerio.load(xmlText);
    return {
      name: getBlogName($),
      favicon: getFavicon($),
    };
  }
  return undefined;
};

const getFavicon = ($: cheerio.Root) => {
  return $('image url').text();
};

const getBlogName = ($: cheerio.Root) => {
  return $('title').text();
};
