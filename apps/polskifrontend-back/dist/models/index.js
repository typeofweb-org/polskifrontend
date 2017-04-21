'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Articles = exports.Article = exports.Blogs = exports.Blog = exports.Users = undefined;

var _user = require('./user');

var Users = _interopRequireWildcard(_user);

var _blog = require('./blog');

var Blogs = _interopRequireWildcard(_blog);

var _article = require('./article');

var Articles = _interopRequireWildcard(_article);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Users = Users;
exports.Blog = Blogs.default;
exports.Blogs = Blogs;
exports.Article = Articles.default;
exports.Articles = Articles;