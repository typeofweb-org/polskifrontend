'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _basicAuth = require('../middlewares/basicAuth');

var _basicAuth2 = _interopRequireDefault(_basicAuth);

var _adminAuth = require('../middlewares/adminAuth');

var _adminAuth2 = _interopRequireDefault(_adminAuth);

var _blogs = require('./blogs');

var _blogs2 = _interopRequireDefault(_blogs);

var _articles = require('./articles');

var _articles2 = _interopRequireDefault(_articles);

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express2.default.Router();

// check basic auth on every route
router.use(_basicAuth2.default);

// public routes
router.use('/blogs', _blogs2.default);
router.use('/articles', _articles2.default);
router.use('/users', _users2.default);

// check logged in user
router.use(_adminAuth2.default);

// admin routes
router.use('/admin', _admin2.default);

exports.default = router;