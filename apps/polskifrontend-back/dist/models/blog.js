'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = exports.remove = exports.getAllBlogs = exports.getBlogs = exports.getBySlug = exports.getById = undefined;

let getById = exports.getById = (() => {
  var _ref = _asyncToGenerator(function* (blogId) {
    return yield Blog.findById(blogId).exec();
  });

  return function getById(_x) {
    return _ref.apply(this, arguments);
  };
})();

let getBySlug = exports.getBySlug = (() => {
  var _ref2 = _asyncToGenerator(function* (slug) {
    return yield Blog.findOne({ slug });
  });

  return function getBySlug(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

let getBlogs = exports.getBlogs = (() => {
  var _ref3 = _asyncToGenerator(function* (page) {
    const perPage = 6;
    const count = yield Blog.count();
    const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
    const blogs = yield Blog.find().sort({ publishedDate: -1 }).skip(perPage * page).limit(perPage);

    return {
      blogs,
      nextPage
    };
  });

  return function getBlogs(_x3) {
    return _ref3.apply(this, arguments);
  };
})();

let getAllBlogs = exports.getAllBlogs = (() => {
  var _ref4 = _asyncToGenerator(function* () {
    return yield Blog.find();
  });

  return function getAllBlogs() {
    return _ref4.apply(this, arguments);
  };
})();

let remove = exports.remove = (() => {
  var _ref5 = _asyncToGenerator(function* (blog) {
    return yield blog.remove();
  });

  return function remove(_x4) {
    return _ref5.apply(this, arguments);
  };
})();

let add = exports.add = (() => {
  var _ref6 = _asyncToGenerator(function* (params) {
    const blog = new Blog(params);
    return yield blog.save();
  });

  return function add(_x5) {
    return _ref6.apply(this, arguments);
  };
})();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _article = require('./article');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Schema = _mongoose2.default.Schema;
const BlogSchema = new Schema({
  id: String,
  name: String,
  href: String,
  rss: String,
  favicon: { type: String, default: '' },
  slug: String,
  publishedDate: { type: Date, default: new Date('01/01/1900') }
});

BlogSchema.options.toJSON = BlogSchema.options.toJSON || {};
BlogSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

BlogSchema.pre('remove', function (next) {
  // 'this' is the blog being removed
  _article2.default.remove({ _blog: this._id }).exec();
  next();
});

const Blog = _mongoose2.default.model('blog', BlogSchema);

exports.default = Blog;