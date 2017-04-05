import mongoose from 'mongoose';
import Article from './article';
import RssHandler from '../rss/rssHandler';

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

BlogSchema.post('save', function (blog) {
  const rssHandler = new RssHandler(blog.rss);
  rssHandler.getParsedData(data => {
    const article = new Article({
      title: data.article.title,
      href: data.article.link,
      description: data.article.summary || data.article.description,
      date: new Date(data.article.date),
      blog_id: blog._id
    });

    article.save(error => {
      console.log(error);
    });
  });
});

const Blog = mongoose.model('blog', BlogSchema);

export default Blog;
