import { resolve } from 'path';

import Boom from '@hapi/boom';
import cheerio from 'cheerio';
import Slugify from 'slugify';

import { openConnection } from './db';

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
  const { name, href, favicon, feeds } = await getBlogData(url);

  const response = await prisma.blog.create({
    data: {
      name,
      href,
      favicon,
      rss: feeds[0].url, // @to-do Ustalić, który jest najlepszy
      slug: Slugify(name, { lower: true }),
      lastUpdateDate: NEVER,
    },
  });
};

const getBlogData = async (url: string): Promise<BlogData> => {
  const youtubeRss = getYoutubeRss(url);
  if (youtubeRss !== false) {
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
    if (htmlText !== '') {
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
  const regex = RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/gm);
  const isYoutubeUrl = regex.test(url);

  if (isYoutubeUrl) {
    const urlWithoutParams = url.split('?')[0];
    let channel = '';
    if (urlWithoutParams.split('channel/')[1]) {
      channel = 'channel_id=' + urlWithoutParams.split('channel/')[1].split('/')[0];
    } else if (url.split('user/')[1]) {
      channel = 'user=' + urlWithoutParams.split('user/')[1].split('/')[0];
    }

    if (channel !== '') {
      return 'https://www.youtube.com/feeds/videos.xml?' + channel;
    } else {
      return false;
    }
  } else {
    return false;
  }
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
          title: ($(link).attr('title') as string) || feedUrl,
        } as Feed;
      }
      return null;
    })
    .filter((feed): feed is Feed => feed !== null);
};

const getFeedUrl = (url: string, linkHref: string) => {
  if (linkHref.startsWith('//')) {
    return 'http:' + linkHref;
  } else if (linkHref.startsWith('/')) {
    return url.split('/')[0] + '//' + url.split('/')[2] + linkHref;
  } else if (/^(http|https):\/\//i.test(linkHref)) {
    return linkHref;
  } else if (!/\//.exec(linkHref)) {
    return url.substr(0, url.lastIndexOf('/')) + '/' + linkHref;
  } else {
    return url + '/' + linkHref.replace(/^\//g, '');
  }
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
