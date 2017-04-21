'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initRssParsingSchedule = initRssParsingSchedule;

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function initRssParsingSchedule() {
  _nodeSchedule2.default.scheduleJob('*/15 * * * *', _asyncToGenerator(function* () {
    console.log('running scheduled job [RSS update]...');
    const blogs = yield _models.Blogs.getAllBlogs();
    blogs.forEach((() => {
      var _ref2 = _asyncToGenerator(function* (blog) {
        return yield _models.Articles.getArticlesForBlog(blog);
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    })());
  }));
}