'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRssParsingSchedule = initRssParsingSchedule;

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _rssHandler = require('./rssHandler');

var _rssHandler2 = _interopRequireDefault(_rssHandler);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function initRssParsingSchedule() {
  _nodeSchedule2.default.scheduleJob('*/15 * * * *', _asyncToGenerator(function* () {
    console.log('running scheduled job [RSS update]...');
    const blogs = yield _models.Blog.find();
    blogs.forEach(function (blog) {
      const rssHandler = new _rssHandler2.default(blog.rss);
      rssHandler.getParsedData(function (data) {
        const pubDate = new Date(data.article.pubDate);
        if (pubDate > blog.publishedDate) {
          const article = new _models.Article({
            title: data.article.title,
            href: data.article.link,
            description: data.article.summary || data.article.description,
            date: pubDate,
            _blog: blog._id
          });

          article.save(function (error) {
            if (error) {
              console.log(error);
            }
          });

          blog.publishedDate = pubDate;
          blog.save(function (error) {
            if (error) {
              console.log(error);
            }
          });
        }
      }, function (error) {
        if (error) {
          console.log(error);
        }
      });
    });
  }));
}