'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _emailer = require('../utils/emailer');

var _emailer2 = _interopRequireDefault(_emailer);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _express2.default.Router();

router.get('/:page', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const perPage = 6;
      const page = req.params.page - 1;
      const count = yield _models.Blog.count();
      const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
      const blogs = yield _models.Blog.find().sort({ publishedDate: -1 }).skip(perPage * page).limit(perPage);
      res.send({ success: true, blogs, nextPage });
    } catch (error) {
      res.send({ success: false, message: error });
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.post('/submit', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      const body = `<p style="font-size: 1.4em;">
      Adres bloga: <a href="${req.body.blogName}">${req.body.blogName}</a>, 
      email: ${req.body.email || 'nie podano'}
      </p>`;
      const sendingResult = yield (0, _emailer2.default)(body);
      res.send(sendingResult);
    } catch (error) {
      res.send({ success: false, message: error });
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

exports.default = router;