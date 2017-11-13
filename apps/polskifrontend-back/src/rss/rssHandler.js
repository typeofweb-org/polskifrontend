import FeedParser from 'feedparser';
import request from 'request'; // for fetching the feed

class RssHandler {
  constructor(feedAddress) {
    this.feedAddress = feedAddress;
  }

  isRssAddressValid() {
    return new Promise((resolve, reject) => {
      const feedRequest = request(this.feedAddress);
      const feedparser = new FeedParser();

      feedRequest.on('error', () => {
        reject({ error: 'bad-request' });
      });

      feedRequest.on('response', (response) => {
        if (response.statusCode !== 200) {
          reject({ error: 'bad-status' });
        } else {
          feedRequest.pipe(feedparser);
        }
      });

      feedparser.on('error', () => {
        reject({ error: 'invalid-rss' });
      });

      feedparser.on('readable', () => {
        resolve(true);
      });
    });
  }

  getParsedData() {
    return new Promise((resolve, reject) => {
      const data = [];
      const feedRequest = request(this.feedAddress);
      const feedparser = new FeedParser();

      feedRequest.on('error', error => console.log(error));

      feedRequest.on('response', () => {
        feedRequest
          .pipe(feedparser)
          .on('end', () => resolve(data))
          .on('error', error => reject(error));
      });

      feedparser.on('readable', () => {
        let item;
        while (item = feedparser.read()) { // eslint-disable-line no-cond-assign
          data.push({
            meta: feedparser.meta,
            article: item
          });
        }
      });
    });
  }
}

export default RssHandler;
