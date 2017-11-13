import _ from 'lodash';
import slug from 'slug';
import mongoose from 'mongoose';
import RssHandler from '../rss/rssHandler';

const { Schema } = mongoose;
const ArticleSchema = new Schema({
  title: String,
  href: String,
  description: String,
  summary: String,
  date: Date,
  slug: String,
  _blog: { type: String, ref: 'blog' }
});

ArticleSchema.options.toJSON = ArticleSchema.options.toJSON || {};
ArticleSchema.options.toJSON.transform = (doc, ret) => ret;

const Article = mongoose.model('article', ArticleSchema);

export async function updateSlug() {
  const articles = await Article.find();
  articles.forEach((article) => {
    article.slug = slug(article.title, { lower: true });
    article.save();
  });
}

export async function getAllArticles(limit = 0) {
  const articles = await Article.find().populate('_blog').sort({ date: -1 }).limit(limit);
  return articles;
}

export async function getArticles(page) {
  const perPage = 20;
  const count = await Article.count();
  const nextPage = count <= (page + 1) * perPage ? -1 : page + 2;
  const articles = await Article
    .find()
    .populate('_blog')
    .sort({ date: -1 })
    .skip(perPage * page)
    .limit(perPage);

  return {
    articles,
    nextPage
  };
}

export async function getArticlesByBlogId(blogId) {
  const articles = await Article.find({ _blog: blogId }).sort({ date: -1 }).limit(5);
  return articles;
}

export async function getBySlug(slug) {
  const article = await Article.findOne({ slug }).populate('_blog');
  return article;
}

export async function removeByBlogId(blogId) {
  const result = await Article.remove({ _blog: blogId });
  return result;
}

export async function getArticlesForBlog(blog) {
  const rssHandler = new RssHandler(blog.rss);
  const data = await rssHandler.getParsedData();

  _.orderBy(data, 'article.pubDate', 'asc').forEach((item) => {
    const pubDate = new Date(item.article.pubDate);

    if (pubDate > blog.publishedDate) {
      let description = item.article.summary || item.article.description;
      if (!description && item.article['media:group'] && item.article['media:group']['media:description']) {
        description = item.article['media:group']['media:description']['#'];
      }

      const article = new Article({
        title: item.article.title,
        href: item.article.link,
        description,
        date: pubDate,
        slug: slug(item.article.title, { lower: true }),
        _blog: blog._id
      });

      article.save((error) => {
        if (error) {
          console.log(error);
        }
      });

      blog.publishedDate = pubDate;
      blog.save();
    }
  });
}

export default Article;
