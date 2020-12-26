import { getFeedUrl } from './contentCreatorFunctions';

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
