'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _express2.default.Router();

router.get('/all/:page', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const { articles, nextPage } = yield _models.Articles.getArticles(req.params.page - 1);
      res.send({ success: true, articles, nextPage });
    } catch (error) {
      res.send({ success: false, message: error });
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.get('/:blog', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const articles = yield _models.Articles.getArticlesByBlogId(req.params.blog);
      res.send({ success: true, articles });
    } catch (error) {
      res.send({ success: false, message: error });
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

exports.default = router;