import mongoose from 'mongoose';
import Article from './article';

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  id: String,
  name: String,
  href: String,
  rss: String
});

BlogSchema.options.toJSON = BlogSchema.options.toJSON || {};
BlogSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

BlogSchema.pre('remove', function (next) {
  // 'this' is the blog being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  Article.remove({ blog_id: this._id }).exec();
  next();
});

const Blog = mongoose.model('blog', BlogSchema);

export default Blog;
