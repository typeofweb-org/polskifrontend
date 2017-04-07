'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

var _rssHandler = require('../rss/rssHandler');

var _rssHandler2 = _interopRequireDefault(_rssHandler);

var _faviconHelper = require('../utils/faviconHelper');

var faviconHelper = _interopRequireWildcard(_faviconHelper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _express2.default.Router();

router.get('/blogs', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const blogs = yield _models.Blog.find().sort({ publishedDate: -1 });
    res.send({ success: true, blogs });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.get('/articles/', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const articles = yield _models.Article.find().populate('_blog').sort({ date: -1 });
    res.send({ success: true, articles });
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

router.get('/articles/:blog', (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    const blog_id = req.params.blog;
    const articles = yield _models.Article.find({ _blog: blog_id }).sort({ date: -1 }).limit(5);
    res.send({ success: true, articles });
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());

router.post('/authenticate', (() => {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    // find the user
    _models.User.findOne({
      user: req.body.user
    }, function (err, user) {
      if (err) {
        throw err;
      }

      if (!user) {
        res.json({ success: false, reason: 'cant-authenticate', message: 'Authentication failed.' });
      } else if (user) {
        // check if password matches
        if (user.password !== req.body.password) {
          res.json({ success: false, reason: 'cant-authenticate', message: 'Authentication failed.' });
        } else {
          // if user is found and password is right
          // create a token
          const token = _jsonwebtoken2.default.sign(user, _main2.default.get('secret'), {
            expiresIn: 18000 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            token
          });
        }
      }
    });
  });

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
})());

router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, _main2.default.get('secret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, reason: 'bad-token', message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      reason: 'no-token',
      message: 'No token provided.'
    });
  }
});

router.get('/admin/blogs', (() => {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    const blogs = yield _models.Blog.find();
    return res.send({ blogs });
  });

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
})());

router.delete('/admin/blogs/:blogId', (() => {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    const blogId = req.params.blogId;
    _models.Blog.findById(blogId, function (error, blog) {
      if (error) {
        return res.send({ success: false, reason: 'cant-find', message: `Unable to delete blog with ID: ${blogId}` });
      }

      // hack to call pre middleware
      blog.remove(function (err) {
        if (err) {
          return res.send({ success: false, reason: 'cant-remove', message: `Unable to delete blog with ID: ${blogId}` });
        }

        _models.Blog.find(function (error, blogs) {
          return res.send({ success: true, blogs });
        });
      });
    });
  });

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
})());

router.post('/admin/blogs/:blogId/refresh', (() => {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    const blogId = req.params.blogId;
    _models.Blog.findById(blogId, (() => {
      var _ref8 = _asyncToGenerator(function* (error, blog) {
        yield _models.Article.remove({ _blog: blog._id });

        // reset blog last update date
        blog.publishedDate = new Date(1900, 1, 1);
        yield blog.save();

        const rssHandler = new _rssHandler2.default(blog.rss);
        rssHandler.getParsedData(function (data) {
          const pubDate = new Date(data.article.pubDate);
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

          if (pubDate > blog.publishedDate) {
            blog.publishedDate = pubDate;
            blog.save();
          }
        });

        res.send({ success: true });
      });

      return function (_x15, _x16) {
        return _ref8.apply(this, arguments);
      };
    })());
  });

  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
})());

router.post('/admin/blogs', (() => {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    const rssInstance = new _rssHandler2.default(req.body.rss);
    faviconHelper.getFaviconUrl(req.body.href).then(function (faviconUrl) {
      rssInstance.isRssAddressValid().then(function () {
        const blog = new _models.Blog(_extends({}, req.body, { favicon: faviconUrl }));
        blog.save(function (error, createdBlog) {
          if (error) {
            res.send({ success: false, reason: 'cant-add', message: 'New blog entity adding failed' });
          }

          const rssHandler = new _rssHandler2.default(createdBlog.rss);
          rssHandler.getParsedData(function (data) {
            const pubDate = new Date(data.article.pubDate);
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

            if (pubDate > createdBlog.publishedDate) {
              createdBlog.publishedDate = pubDate;
              createdBlog.save();
            }
          });

          res.send({ success: true, blog: createdBlog });
        });
      }).catch(function () {
        res.send({ success: false, reason: 'rss-invalid', message: 'Given rss address is not a valid RSS feed.' });
      });
    });
  });

  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
})());

exports.default = router;