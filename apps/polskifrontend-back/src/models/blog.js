import mongoose from 'mongoose';
import Article from './article';

const Schema = mongoose.Schema;
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
  Article.remove({ _blog: this._id }).exec();
  next();
});

const Blog = mongoose.model('blog', BlogSchema);

export async function getById(blogId) {
  return await Blog.findById(blogId).exec();
}

export async function getBySlug(slug) {
  return await Blog.findOne({ slug });
}

export async function getBlogs(page) {
  const perPage = 6;
  const count = await Blog.count();
  const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
  const blogs = await Blog
    .find()
    .sort({ publishedDate: -1 })
    .skip(perPage * page)
    .limit(perPage);

  return {
    blogs,
    nextPage
  };
}

export async function getAllBlogs() {
  return await Blog.find();
}

export async function remove(blog) {
  return await blog.remove();
}

export async function add(params) {
  const blog = new Blog(params);
  return await blog.save();
}

export default Blog;
