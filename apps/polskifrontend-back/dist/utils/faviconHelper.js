'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFaviconUrl = undefined;

let getFaviconUrl = exports.getFaviconUrl = (() => {
  var _ref = _asyncToGenerator(function* (url) {
    return new Promise(function (resolve) {
      (0, _faviconGetter2.default)(url).then(function (faviconUrl) {
        resolve(faviconUrl);
      }).catch(function () {
        resolve('');
      });
    });
  });

  return function getFaviconUrl(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _faviconGetter = require('favicon-getter');

var _faviconGetter2 = _interopRequireDefault(_faviconGetter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }