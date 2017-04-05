'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _feedparser = require('feedparser');

var _feedparser2 = _interopRequireDefault(_feedparser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// for fetching the feed

class RssHandler {
  constructor(feedAddress) {
    this.feedAddress = feedAddress;
  }

  getParsedData(onItemRead) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const feedRequest = (0, _request2.default)(_this.feedAddress);
      const feedparser = new _feedparser2.default();

      feedRequest.on('error', function (error) {
        console.log(error);
      });

      feedRequest.on('response', function (response) {
        if (response.statusCode !== 200) {
          feedRequest.emit('error', new Error('Bad status code'));
        } else {
          feedRequest.pipe(feedparser);
        }
      });

      feedparser.on('error', function (error) {
        console.log(error);
      });

      feedparser.on('readable', function () {
        let item;
        while (item = feedparser.read()) {
          // eslint-disable-line no-cond-assign
          onItemRead({
            meta: feedparser.meta,
            article: item
          });
        }
      });
    })();
  }
}

exports.default = RssHandler;