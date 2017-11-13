import _ from 'lodash';
import mongoose from 'mongoose';
import Article from './article';
import { getFaviconUrl } from '../utils/faviconHelper';
import imageUpload from '../helpers/imageUploader';

const { Schema } = mongoose;
const BlogSchema = new Schema({
  id: String,
  name: String,
  href: String,
  rss: String,
  favicon: { type: String, default: '' },
  slug: String,
  publishedDate: { type: Date, default: new Date('01/01/1900') },
});
BlogSchema.virtual('articles', {
  ref: 'article',
  localField: '_id',
  foreignField: '_blog'
});

BlogSchema.options.toJSON = BlogSchema.options.toJSON || {};
BlogSchema.options.toJSON.virtuals = true;
BlogSchema.options.toJSON.transform = (doc, ret) => ret;

BlogSchema.pre('remove', function (next) {
  // 'this' is the blog being removed
  Article.remove({ _blog: this._id }).exec();
  next();
});

const Blog = mongoose.model('blog', BlogSchema);

export async function getById(blogId) {
  const blog = await Blog.findById(blogId).exec();
  return blog;
}

export async function getBySlug(slug) {
  const blog = await Blog.findOne({ slug });
  return blog;
}

export async function getBlogs(page) {
  const perPage = 4;
  const count = await Blog.count();
  const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
  const blogs = await Blog
    .find()
    .populate({ path: 'articles' })
    .sort({ publishedDate: -1 })
    .skip(perPage * page)
    .limit(perPage);

  // because of bug in mongoose, sort and limit populated data manually
  blogs.forEach((blog) => {
    blog.articles = _.orderBy(blog.articles, ['date'], 'desc');
    blog.articles = _.take(blog.articles, 5);
  });

  return {
    blogs,
    nextPage
  };
}

export async function getAllBlogs() {
  const blog = await Blog.find();
  return blog;
}

export async function remove(blog) {
  const result = await blog.remove();
  return result;
}

export async function add(params) {
  const blog = new Blog(params);
  const result = await blog.save();
  return result;
}

export async function updateFavicon() {
  const blogs = await Blog.find();
  blogs.forEach(async (blog) => {
    const faviconUrl = await getFaviconUrl(blog.href);
    let faviconUploadResult = { secure_url: '' };
    try {
      faviconUploadResult = await imageUpload(faviconUrl);
    } catch (error) {
      faviconUploadResult.secure_url = '';
    }

    blog.favicon = faviconUploadResult.secure_url;
    blog.save();
  });
}

export default Blog;
