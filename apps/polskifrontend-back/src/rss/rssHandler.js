import FeedParser from 'feedparser';
import request from 'request'; // for fetching the feed

class RssHandler {
  constructor(feedAddress) {
    this.feedAddress = feedAddress;
  }

  async getParsedData(onItemRead, onError) {
    const feedRequest = request(this.feedAddress);
    const feedparser = new FeedParser();

    feedRequest.on('error', error => {
      onError(error);
    });

    feedRequest.on('response', response => {
      if (response.statusCode !== 200) {
        onError({ type: 'bad-status' });
        feedRequest.emit('error', new Error('Bad status code'));
      } else {
        feedRequest.pipe(feedparser);
      }
    });

    feedparser.on('error', error => {
      onError(error);
    });

    feedparser.on('readable', () => {
      let item;
      while (item = feedparser.read()) { // eslint-disable-line no-cond-assign
        onItemRead({
          meta: feedparser.meta,
          article: item
        });
      }
    });
  }
}

export default RssHandler;
