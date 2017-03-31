import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  name: String,
  href: String,
  articles: Array
});

BlogSchema.options.toJSON = BlogSchema.options.toJSON || {};
BlogSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const Blog = mongoose.model('blog', BlogSchema);

/**
 * @swagger
 * definitions:
 *   Blog:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         default: objectId
 *       name:
 *         type: string
 *         default: NAME
 *       href:
 *         type: string
 *         default: #
 */

export default Blog;
