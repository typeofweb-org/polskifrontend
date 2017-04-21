import express from 'express';
import { Blog, Article } from '../models';
import RssHandler from '../rss/rssHandler';
import * as faviconHelper from '../utils/faviconHelper';
import slugify from '../utils/slugify';

const router = new express.Router();

router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  return res.send({ blogs });
});

router.delete('/blogs/:blogId', async (req, res) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId, (error, blog) => {
    if (error) {
      return res.send({ success: false, reason: 'cant-find', message: `Unable to delete blog with ID: ${blogId}` });
    }

    // hack to call pre middleware
    blog.remove(err => {
      if (err) {
        return res.send({ success: false, reason: 'cant-remove', message: `Unable to delete blog with ID: ${blogId}` });
      }

      Blog.find((error, blogs) => res.send({ success: true, blogs }));
    });
  });
});

router.post('/blogs/:blogId/refresh', async (req, res) => {
  const blogId = req.params.blogId;
  Blog.findById(blogId, async (error, blog) => {
    await Article.remove({ _blog: blog._id });

    // reset blog last update date
    blog.publishedDate = new Date(1900, 1, 1);
    await blog.save();

    const rssHandler = new RssHandler(blog.rss);
    rssHandler.getParsedData(data => {
      const pubDate = new Date(data.article.pubDate);
      let description = data.article.summary || data.article.description;
      if (!description && data.article['media:group'] && data.article['media:group']['media:description']) {
        description = data.article['media:group']['media:description']['#'];
      }
      const article = new Article({
        title: data.article.title,
        href: data.article.link,
        description,
        date: pubDate,
        _blog: blog._id
      });

      article.save(error => {
        if (error) {
          console.log(error);
        }
      });

      if (pubDate > blog.publishedDate) {
        blog.publishedDate = pubDate;
        blog.save();
      }
    });

    res.send({ success: true });
  });
});

router.post('/blogs', async (req, res) => {
  const rssInstance = new RssHandler(req.body.rss);
  faviconHelper.getFaviconUrl(req.body.href).then(faviconUrl => {
    rssInstance.isRssAddressValid().then(async () => {
      const slug = slugify(req.body.name);
      const existingBlog = await Blog.findOne({ slug });

      if (existingBlog) {
        // there is such blog in the database already
        return res.send({ success: false, reason: 'slug-exists', message: 'There is such blog in the database' });
      }

      const blog = new Blog({ ...req.body, slug, favicon: faviconUrl });
      blog.save((error, createdBlog) => {
        if (error) {
          return res.send({ success: false, reason: 'cant-add', message: 'New blog entity adding failed' });
        }

        const rssHandler = new RssHandler(createdBlog.rss);
        rssHandler.getParsedData(data => {
          const pubDate = new Date(data.article.pubDate);
          let description = data.article.summary || data.article.description;
          if (!description && data.article['media:group'] && data.article['media:group']['media:description']) {
            description = data.article['media:group']['media:description']['#'];
          }
          const article = new Article({
            title: data.article.title,
            href: data.article.link,
            description,
            date: pubDate,
            _blog: blog._id
          });

          article.save(error => {
            if (error) {
              console.log(error);
            }
          });

          if (pubDate > createdBlog.publishedDate) {
            createdBlog.publishedDate = pubDate;
            createdBlog.save();
          }
        });

        return res.send({ success: true, blog: createdBlog });
      });
    }).catch(() => {
      return res.send({ success: false, reason: 'rss-invalid', message: 'Given rss address is not a valid RSS feed.' });
    });
  });
});

export default router;
