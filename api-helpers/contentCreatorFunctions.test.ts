import { getFeedUrl, getYoutubeRss } from './contentCreatorFunctions';

describe('getFeedUrl return valid url when', () => {
  it('link href starts with https', () => {
    expect(getFeedUrl('https://example.com', 'https://example.com/feed')).toBe(
      'https://example.com/feed',
    );
  });
  it('link href starts with https and ends with slash', () => {
    expect(getFeedUrl('https://example.com', 'https://example.com/feed/')).toBe(
      'https://example.com/feed/',
    );
  });
  it('link href starts with https and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', 'https://example.com/feed')).toBe(
      'https://example.com/feed',
    );
  });
  it('link href starts with https and ends with slash and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', 'https://example.com/feed/')).toBe(
      'https://example.com/feed/',
    );
  });
  it('link href starts with http', () => {
    expect(getFeedUrl('https://example.com', 'http://example.com/feed')).toBe(
      'http://example.com/feed',
    );
  });
  it('link href starts with http and ends with slash', () => {
    expect(getFeedUrl('https://example.com', 'http://example.com/feed/')).toBe(
      'http://example.com/feed/',
    );
  });
  it('link href starts with http and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', 'http://example.com/feed')).toBe(
      'http://example.com/feed',
    );
  });
  it('link href starts with http and ends with slash and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', 'http://example.com/feed/')).toBe(
      'http://example.com/feed/',
    );
  });
  it('link href starts with /', () => {
    expect(getFeedUrl('https://example.com', '/path/feed')).toBe('https://example.com/path/feed');
  });
  it('link href starts with / and ends with slash', () => {
    expect(getFeedUrl('https://example.com', '/path/feed/')).toBe('https://example.com/path/feed/');
  });
  it('link href starts with / and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', '/path/feed')).toBe('https://example.com/path/feed');
  });
  it('link href starts with / and ends with slash and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', '/path/feed/')).toBe(
      'https://example.com/path/feed/',
    );
  });
  it('link href starts with / and baseUrl has path', () => {
    expect(getFeedUrl('https://example.com/second', '/path/feed')).toBe(
      'https://example.com/path/feed',
    );
  });
  it('link href starts with / and ends with slash and baseUrl has path', () => {
    expect(getFeedUrl('https://example.com/second', '/path/feed/')).toBe(
      'https://example.com/path/feed/',
    );
  });
  it('link href starts with / and baseUrl ends with slash and baseUrl has path', () => {
    expect(getFeedUrl('https://example.com/second/', '/path/feed')).toBe(
      'https://example.com/path/feed',
    );
  });
  it('link href starts with / and ends with slash and baseUrl ends with slash and baseUrl has path', () => {
    expect(getFeedUrl('https://example.com/second/', '/path/feed/')).toBe(
      'https://example.com/path/feed/',
    );
  });
  it('link href is relative', () => {
    expect(getFeedUrl('https://example.com/second/half', 'path/feed')).toBe(
      'https://example.com/second/path/feed',
    );
  });
  it('link href is relative and ends with slash', () => {
    expect(getFeedUrl('https://example.com/second/half', 'path/feed/')).toBe(
      'https://example.com/second/path/feed/',
    );
  });
  it('link href is relative and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/second/half/', 'path/feed')).toBe(
      'https://example.com/second/half/path/feed',
    );
  });
  it('link href is relative and ends with slash and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/second/half/', 'path/feed/')).toBe(
      'https://example.com/second/half/path/feed/',
    );
  });
  it('link href is a file', () => {
    expect(getFeedUrl('https://example.com', 'feed.xml')).toBe('https://example.com/feed.xml');
  });
  it('link href is a file and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', 'feed.xml')).toBe('https://example.com/feed.xml');
  });
  it('link href starts with //', () => {
    expect(getFeedUrl('https://example.com', '//example.com/feed.xml')).toBe(
      'https://example.com/feed.xml',
    );
  });

  it('link href starts with // and baseUrl ends with slash', () => {
    expect(getFeedUrl('https://example.com/', '//example.com/feed.xml')).toBe(
      'https://example.com/feed.xml',
    );
  });
});

describe('getYoutubeRss', () => {
  it('returns valid rss url when given url with channelId', () => {
    expect(getYoutubeRss('https://www.youtube.com/channel/UC_QG8miwKHFNuWY9VpkrI8w')).toBe(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UC_QG8miwKHFNuWY9VpkrI8w',
    );
  });
  it('returns valid rss url when given url with channelId and additional path', () => {
    expect(getYoutubeRss('https://www.youtube.com/channel/UC_QG8miwKHFNuWY9VpkrI8w/videos')).toBe(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UC_QG8miwKHFNuWY9VpkrI8w',
    );
  });
  it('returns valid rss url when given url with channelId and other additional path', () => {
    expect(getYoutubeRss('https://www.youtube.com/channel/UC_QG8miwKHFNuWY9VpkrI8w/about')).toBe(
      'https://www.youtube.com/feeds/videos.xml?channel_id=UC_QG8miwKHFNuWY9VpkrI8w',
    );
  });
  it('returns valid rss url when given url with userId', () => {
    expect(getYoutubeRss('https://www.youtube.com/user/chopin8810')).toBe(
      'https://www.youtube.com/feeds/videos.xml?user=chopin8810',
    );
  });
  it('returns valid rss url when given url with userId and additional path', () => {
    expect(getYoutubeRss('https://www.youtube.com/user/chopin8810/videos')).toBe(
      'https://www.youtube.com/feeds/videos.xml?user=chopin8810',
    );
  });
  it('returns valid rss url when given url with userId and other additional path', () => {
    expect(getYoutubeRss('https://www.youtube.com/user/chopin8810/about')).toBe(
      'https://www.youtube.com/feeds/videos.xml?user=chopin8810',
    );
  });
  it('return undefined when given url without channelId or userId', () => {
    expect(
      getYoutubeRss('https://www.youtube.com/watch?v=pHlqEvAwdVc&list=RDpHlqEvAwdVc&start_radio=1'),
    ).toBe(undefined);
  });
});
