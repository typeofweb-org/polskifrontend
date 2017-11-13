import fetchFavicon from 'favicon-getter';

export async function getFaviconUrl(url) {
  return new Promise((resolve) => {
    fetchFavicon(url).then((faviconUrl) => {
      resolve(faviconUrl);
    }).catch(() => {
      resolve('');
    });
  });
}
