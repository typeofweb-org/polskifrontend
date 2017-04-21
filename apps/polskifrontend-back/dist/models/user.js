'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUser = undefined;

let getUser = exports.getUser = (() => {
  var _ref = _asyncToGenerator(function* (user) {
    return yield User.findOne({ user });
  });

  return function getUser(_x) {
    return _ref.apply(this, arguments);
  };
})();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Schema = _mongoose2.default.Schema;
const UserSchema = new Schema({
  user: String,
  password: String
});

UserSchema.options.toJSON = UserSchema.options.toJSON || {};
UserSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const User = _mongoose2.default.model('user', UserSchema);