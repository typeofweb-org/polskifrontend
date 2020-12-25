import { resolve } from 'path';
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
  readonly feeds: readonly Feed[];
};

type Feed = {
  readonly type: string;
  readonly url: string;
  readonly title: string;
};

export const addContentCreator = async (url: string, email?: string) => {
  const prisma = await openConnection();
  try {
    const { name, href, favicon, feeds } = await getBlogData(url);
    return prisma.blog.create({
      data: {
        name,
        href,
        favicon,
        rss: feeds[0].url, // @to-do Ustalić, który jest najlepszy
        slug: Slugify(name, { lower: true }),
        lastUpdateDate: NEVER,
      },
    });
  } finally {
    await closeConnection();
  }
};

const getBlogData = async (url: string): Promise<BlogData> => {
  const youtubeRss = getYoutubeRss(url);
  if (youtubeRss) {
    return {
      name: 'Some Youtube Channel', // @to-do Ustalić, nazwę strony z yt
      href: url,
      favicon: 'https://www.youtube.com/s/desktop/d743f786/img/favicon.ico',
      feeds: [
        {
          type: '',
          url: youtubeRss,
          title: youtubeRss,
        },
      ],
    };
  } else {
    const response = await fetch(url);
    const htmlText = await response.text();
    if (htmlText) {
      const $ = cheerio.load(htmlText);
      const blogName = getBlogName($);
      const favicon = getFavicon(url, $);
      const feeds = searchFeed(url, $);
      return {
        name: blogName,
        href: url,
        favicon,
        feeds,
      };
    }
  }
  throw Boom.badData();
};

const getYoutubeRss = (url: string) => {
  const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm;
  const isYoutubeUrl = regex.test(url);

  if (isYoutubeUrl) {
    return getYoutubeChannel(url);
  } else {
    return false;
  }
};

const getYoutubeChannel = (url: string) => {
  const urlWithoutParams = url.split('?')[0];
  if (urlWithoutParams.split('channel/')[1]) {
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${
      urlWithoutParams.split('channel/')[1].split('/')[0]
    }`;
  } else if (url.split('user/')[1]) {
    return `https://www.youtube.com/feeds/videos.xml?user=${
      urlWithoutParams.split('user/')[1].split('/')[0]
    }`;
  }
  return false;
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

const getFavicon = (url: string, $: cheerio.Root) => {
  const favicon = $("link[rel='shortcut icon'], link[rel='icon']");
  const faviconHref = favicon.first().attr('href');
  if (faviconHref) {
    return resolve(url, faviconHref);
  } else {
    return resolve(url, '/favicon.ico');
  }
};

const getBlogName = ($: cheerio.Root) => {
  return $('title').text();
};
