'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArticlesForBlog = exports.removeByBlogId = exports.getArticlesByBlogId = exports.getArticles = undefined;

let getArticles = exports.getArticles = (() => {
  var _ref = _asyncToGenerator(function* (page) {
    const perPage = 50;
    const count = yield Article.count();
    const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
    const articles = yield Article.find().populate('_blog').sort({ date: -1 }).skip(perPage * page).limit(perPage);

    return {
      articles,
      nextPage
    };
  });

  return function getArticles(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getArticlesByBlogId = exports.getArticlesByBlogId = (() => {
  var _ref2 = _asyncToGenerator(function* (blogId) {
    return yield Article.find({ _blog: blogId }).sort({ date: -1 }).limit(5);
  });

  return function getArticlesByBlogId(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let removeByBlogId = exports.removeByBlogId = (() => {
  var _ref3 = _asyncToGenerator(function* (blogId) {
    return yield Article.remove({ _blog: blogId });
  });

  return function removeByBlogId(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

let getArticlesForBlog = exports.getArticlesForBlog = (() => {
  var _ref4 = _asyncToGenerator(function* (blog) {
    const rssHandler = new _rssHandler2.default(blog.rss);
    const data = yield rssHandler.getParsedData();

    _lodash2.default.orderBy(data, 'article.pubDate', 'asc').forEach(function (item) {
      const pubDate = new Date(item.article.pubDate);

      if (pubDate > blog.publishedDate) {
        let description = item.article.summary || item.article.description;
        if (!description && item.article['media:group'] && item.article['media:group']['media:description']) {
          description = item.article['media:group']['media:description']['#'];
        }

        const article = new Article({
          title: item.article.title,
          href: item.article.link,
          description,
          date: pubDate,
          _blog: blog._id
        });

        article.save(function (error) {
          if (error) {
            console.log(error);
          }
        });

        blog.publishedDate = pubDate;
        blog.save();
      }
    });
  });

  return function getArticlesForBlog(_x4) {
    return _ref4.apply(this, arguments);
  };
})();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _rssHandler = require('../rss/rssHandler');

var _rssHandler2 = _interopRequireDefault(_rssHandler);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Schema = _mongoose2.default.Schema;
const ArticleSchema = new Schema({
  title: String,
  href: String,
  description: String,
  summary: String,
  date: Date,
  _blog: { type: String, ref: 'blog' }
});

ArticleSchema.options.toJSON = ArticleSchema.options.toJSON || {};
ArticleSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const Article = _mongoose2.default.model('article', ArticleSchema);

exports.default = Article;