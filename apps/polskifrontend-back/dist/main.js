'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _log = require('./log');

var _log2 = _interopRequireDefault(_log);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_utils.db.init();

// error handle
process.on('unhandledRejection', err => {
  throw err;
});

process.on('uncaughtException', err => {
  _log2.default.error('uncaughtException:', err);
});

const app = (0, _express2.default)();

app.use((0, _cors2.default)({
  origin: ['http://localhost:3001', 'https://polskifrontend-front.herokuapp.com'],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept'
}));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json({
  limit: '50mb'
}));

app.set('secret', _config2.default.secret);
process.env.JWT_SECRET = _config2.default.secret;

app.use('/', _routes2.default);

app.use(_utils.errorHandle);

const port = _config2.default.port;
app.listen(port, () => {
  _log2.default.info(`App is listening on ${port}.`);
});

exports.default = app;