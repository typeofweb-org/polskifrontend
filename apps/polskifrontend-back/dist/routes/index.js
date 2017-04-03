'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _privilege = require('./privilege');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = new _express2.default.Router();

// check basic auth
router.use(_privilege.ensureLogin);

// define routes
router.use(_routes2.default);

exports.default = router;