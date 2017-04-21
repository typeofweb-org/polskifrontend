'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feedparser = require('feedparser');

var _feedparser2 = _interopRequireDefault(_feedparser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// for fetching the feed

class RssHandler {
  constructor(feedAddress) {
    this.feedAddress = feedAddress;
  }

  isRssAddressValid() {
    return new Promise((resolve, reject) => {
      const feedRequest = (0, _request2.default)(this.feedAddress);
      const feedparser = new _feedparser2.default();

      feedRequest.on('error', () => {
        reject({ error: 'bad-request' });
      });

      feedRequest.on('response', response => {
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
      const feedRequest = (0, _request2.default)(this.feedAddress);
      const feedparser = new _feedparser2.default();

      feedRequest.on('response', () => {
        feedRequest.pipe(feedparser).on('end', () => resolve(data)).on('error', error => reject(error));
      });

      feedparser.on('readable', () => {
        let item;
        while (item = feedparser.read()) {
          // eslint-disable-line no-cond-assign
          data.push({
            meta: feedparser.meta,
            article: item
          });
        }
      });
    });
  }
}

exports.default = RssHandler;