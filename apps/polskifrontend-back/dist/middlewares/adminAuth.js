'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = adminAuth;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function adminAuth(req, res, next) {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, _main2.default.get('secret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, reason: 'bad-token', message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      reason: 'no-token',
      message: 'No token provided.'
    });
  }
}