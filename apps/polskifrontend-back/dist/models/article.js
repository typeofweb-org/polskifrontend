'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const ArticleSchema = new Schema({
  title: String,
  href: String,
  description: String,
  summary: String,
  date: Date,
  _blog: { type: String, ref: 'blog' }
});

ArticleSchema.options.toJSON = ArticleSchema.options.toJSON || {};
ArticleSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const Article = _mongoose2.default.model('article', ArticleSchema);

exports.default = Article;