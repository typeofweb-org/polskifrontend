'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sha = require('sha1');

var _sha2 = _interopRequireDefault(_sha);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _express2.default.Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: user list
 *     description: return user list
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: object
 *           properties:
 *             users:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/User'
 */
router.get('/', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const users = yield _models.User.find();
    return res.send({ users });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: user login
 *     description: user login,return user info with token
 *     tags:
 *       - User
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         description: user and password
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               default: username
 *             password:
 *               type: string
 *               default: password
 *     responses:
 *       200:
 *         description: useinfo including token
 */
router.post('/login', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    const { name, password } = req.body;
    try {
      const user = yield _models.User.findOne({
        name,
        password: (0, _sha2.default)(password)
      });
      if (user) {
        return res.send(user);
      }
      next({ msg: 'wrong username or password', status: 401 });
    } catch (err) {
      next(err);
    }
  });

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
})());

/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: register user
 *     description: create user
 *     tags:
 *       - User
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         description: username and password
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               default: username
 *             password:
 *               type: string
 *               default: password
 *     responses:
 *       200:
 *         description: create new user
 */
router.post('/create', (() => {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    const { name, password } = req.body;
    try {
      const token = `Token ${_randomstring2.default.generate(20)}${Date.now()}${_randomstring2.default.generate(20)}`;
      let user = yield _models.User.findOne({ name });
      if (user) {
        return next({ msg: 'user already existed', status: 403 });
      }
      user = new _models.User({
        name,
        password: (0, _sha2.default)(password),
        role: 'user',
        token
      });
      user = yield user.save();
      return res.send(user);
    } catch (err) {
      next(err);
    }
  });

  return function (_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
})());
exports.default = router;