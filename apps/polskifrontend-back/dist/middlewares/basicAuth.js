'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _authHelper = require('../utils/authHelper');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    const token = req.headers.authorization;
    if (token && token === (0, _authHelper.getBasicAuthToken)()) {
      next();
    } else {
      const excludeUrls = [''];
      for (const excludeUrl of excludeUrls) {
        if (req.url.indexOf(excludeUrl) === 0) {
          return next();
        }
      }
      next({ status: 401, msg: 'not authorized' });
    }
  });

  function basicAuth(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return basicAuth;
})();