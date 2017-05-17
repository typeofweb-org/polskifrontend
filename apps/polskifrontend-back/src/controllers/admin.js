import express from 'express';
import { Blogs, Articles, Newses } from '../models';
import RssHandler from '../rss/rssHandler';
import * as faviconHelper from '../utils/faviconHelper';
import slugify from '../utils/slugify';
import imageUpload from '../helpers/imageUploader';

const router = new express.Router();

router.post('/articles/refresh', async (req, res) => {
  try {
    await Articles.updateSlug();
    return res.send({ success: true });
  } catch (error) {
    return res.send({ success: false, message: error });
  }
});

router.get('/blogs', async (req, res) => {
  const blogs = await Blogs.getAllBlogs();
  return res.send({ blogs });
});

router.delete('/blogs/:blogId', async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await Blogs.getById(blogId);

    try {
      await Blogs.remove(blog);
    } catch (error) {
      return res.send({ success: false, reason: 'cant-remove', message: `Unable to delete blog with ID: ${blogId}` });
    }

    const blogs = await Blogs.getAllBlogs();
    return res.send({ success: true, blogs });
  } catch (error) {
    return res.send({ success: false, reason: 'cant-find', message: `Unable to delete blog with ID: ${blogId}` });
  }
});

router.post('/blogs/:blogId/refresh', async (req, res) => {
  try {
    const blog = await Blogs.getById(req.params.blogId);

    // remove all articles for this blog
    await Articles.removeByBlogId(blog._id);

    // reset blog last update date
    blog.publishedDate = new Date(1900, 1, 1);
    await blog.save();

    // load rss and fill articles for this blog
    await Articles.getArticlesForBlog(blog);

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.post('/blogs', async (req, res) => {
  const rssInstance = new RssHandler(req.body.rss);
  const faviconUrl = await faviconHelper.getFaviconUrl(req.body.href);
  let faviconUploadResult = { secure_url: '' };
  try {
    faviconUploadResult = await imageUpload(faviconUrl);
  } catch (error) {
    faviconUploadResult.secure_url = '';
  }

  let rssValid = false;
  try {
    rssValid = await rssInstance.isRssAddressValid();
  } catch (error) {
    return res.send({ success: false, reason: 'rss-invalid', message: 'Given rss address is not a valid RSS feed.' });
  }

  if (rssValid) {
    const slug = slugify(req.body.name);
    const existingBlog = await Blogs.getBySlug(slug);

    if (existingBlog) {
      // there is such blog in the database already
      return res.send({ success: false, reason: 'slug-exists', message: 'There is such blog in the database' });
    }

    try {
      const blog = await Blogs.add({ ...req.body, slug, favicon: faviconUploadResult.secure_url });

      // load rss and fill articles for this blog
      await Articles.getArticlesForBlog(blog);

      return res.send({ success: true, blog });
    } catch (error) {
      console.log(error);
      return res.send({ success: false, reason: 'cant-add', message: 'New blog entity adding failed' });
    }
  }
});

router.post('/blogs/refresh', async (req, res) => {
  try {
    await Blogs.updateFavicon();

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.get('/news', async (req, res) => {
  try {
    const newses = await Newses.getAll();
    res.send({ success: true, newses });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.post('/news', async (req, res) => {
  try {
    const news = await Newses.add(req.body);
    res.send({ success: true, news });
  } catch (error) {
    res.send({ success: false, message: error });
  }
});

router.delete('/news/:newsId', async (req, res) => {
  const newsId = req.params.newsId;
  try {
    const news = await Newses.getById(newsId);

    try {
      await Newses.remove(news);
    } catch (error) {
      return res.send({ success: false, reason: 'cant-remove', message: `Unable to delete news with ID: ${newsId}` });
    }

    const newses = await Newses.getAll();
    return res.send({ success: true, newses });
  } catch (error) {
    return res.send({ success: false, reason: 'cant-find', message: `Unable to delete news with ID: ${newsId}` });
  }
});

export default router;
