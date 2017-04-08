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

var _scheduler = require('./rss/scheduler');

var scheduler = _interopRequireWildcard(_scheduler);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
  origin: ['http://localhost:3001', 'https://polskifrontend-front.herokuapp.com', 'http://www.polskifrontend.pl', 'http://polskifrontend.pl'],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Access-Token'
}));
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json({
  limit: '50mb'
}));

app.set('secret', _config2.default.secret);
process.env.JWT_SECRET = _config2.default.secret;

app.use('/', _routes2.default);

app.use(_utils.errorHandle);

scheduler.initRssParsingSchedule();

const port = process.env.PORT || _config2.default.port;
app.listen(port, () => {
  _log2.default.info(`App is listening on ${port}.`);
});

exports.default = app;