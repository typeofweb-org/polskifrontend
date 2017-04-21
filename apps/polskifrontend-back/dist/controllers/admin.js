'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

var _rssHandler = require('../rss/rssHandler');

var _rssHandler2 = _interopRequireDefault(_rssHandler);

var _faviconHelper = require('../utils/faviconHelper');

var faviconHelper = _interopRequireWildcard(_faviconHelper);

var _slugify = require('../utils/slugify');

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _express2.default.Router();

router.get('/blogs', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const blogs = yield _models.Blogs.getAllBlogs();
    return res.send({ blogs });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.delete('/blogs/:blogId', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const blogId = req.params.blogId;
    try {
      const blog = yield _models.Blogs.getById(blogId);

      try {
        yield _models.Blogs.remove(blog);
      } catch (error) {
        return res.send({ success: false, reason: 'cant-remove', message: `Unable to delete blog with ID: ${blogId}` });
      }

      const blogs = yield _models.Blogs.getAllBlogs();
      return res.send({ success: true, blogs });
    } catch (error) {
      return res.send({ success: false, reason: 'cant-find', message: `Unable to delete blog with ID: ${blogId}` });
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

router.post('/blogs/:blogId/refresh', (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      const blog = yield _models.Blogs.getById(req.params.blogId);

      // remove all articles for this blog
      yield _models.Articles.removeByBlogId(blog._id);

      // reset blog last update date
      blog.publishedDate = new Date(1900, 1, 1);
      yield blog.save();

      // load rss and fill articles for this blog
      yield _models.Articles.getArticlesForBlog(blog);

      res.send({ success: true });
    } catch (error) {
      res.send({ success: false, message: error });
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());

router.post('/blogs', (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    const rssInstance = new _rssHandler2.default(req.body.rss);
    const faviconUrl = yield faviconHelper.getFaviconUrl(req.body.href);

    let rssValid = false;
    try {
      rssValid = yield rssInstance.isRssAddressValid();
    } catch (error) {
      return res.send({ success: false, reason: 'rss-invalid', message: 'Given rss address is not a valid RSS feed.' });
    }

    if (rssValid) {
      const slug = (0, _slugify2.default)(req.body.name);
      const existingBlog = yield _models.Blogs.getBySlug(slug);

      if (existingBlog) {
        // there is such blog in the database already
        return res.send({ success: false, reason: 'slug-exists', message: 'There is such blog in the database' });
      }

      try {
        const blog = yield _models.Blogs.add(_extends({}, req.body, { slug, favicon: faviconUrl }));

        // load rss and fill articles for this blog
        yield _models.Articles.getArticlesForBlog(blog);

        return res.send({ success: true, blog });
      } catch (error) {
        console.log(error);
        return res.send({ success: false, reason: 'cant-add', message: 'New blog entity adding failed' });
      }
    }
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})());

exports.default = router;