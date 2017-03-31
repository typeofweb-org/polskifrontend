import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ArticleSchema = new Schema({
  title: String,
  href: String,
  blog_id: String
});

ArticleSchema.options.toJSON = ArticleSchema.options.toJSON || {};
ArticleSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const Article = mongoose.model('article', ArticleSchema);

/**
 * @swagger
 * definitions:
 *   Blog:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         default: objectId
 *       title:
 *         type: string
 *         default: NAME
 *       href:
 *         type: string
 *         default: #
 */

export default Article;
