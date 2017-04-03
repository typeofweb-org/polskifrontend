import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  name: String,
  href: String,
  rss: String
});

BlogSchema.options.toJSON = BlogSchema.options.toJSON || {};
BlogSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

const Blog = mongoose.model('blog', BlogSchema);

export default Blog;
