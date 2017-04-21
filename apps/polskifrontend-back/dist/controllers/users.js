'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _express2.default.Router();

router.post('/authenticate', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      const user = yield _models.Users.getUser(req.body.user);

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
    } catch (error) {
      throw error;
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

exports.default = router;