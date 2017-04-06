'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFaviconUrl = getFaviconUrl;

var _faviconGetter = require('favicon-getter');

var _faviconGetter2 = _interopRequireDefault(_faviconGetter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFaviconUrl(url) {
  return new Promise(resolve => {
    (0, _faviconGetter2.default)(url).then(faviconUrl => {
      resolve(faviconUrl);
    }).catch(() => {
      resolve('');
    });
  });
}