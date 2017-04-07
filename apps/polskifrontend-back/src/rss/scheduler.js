import schedule from 'node-schedule';
import RssHandler from './rssHandler';
import { Blog, Article } from '../models';

export function initRssParsingSchedule() {
  schedule.scheduleJob('*/15 * * * *', async () => {
    console.log('running scheduled job [RSS update]...');
    const blogs = await Blog.find();
    blogs.forEach(blog => {
      const rssHandler = new RssHandler(blog.rss);
      rssHandler.getParsedData(data => {
        const pubDate = new Date(data.article.pubDate);
        if (pubDate > blog.publishedDate) {
          const article = new Article({
            title: data.article.title,
            href: data.article.link,
            description: data.article.summary || data.article.description,
            date: pubDate,
            _blog: blog._id
          });

          article.save(error => {
            if (error) {
              console.log(error);
            }
          });

          blog.publishedDate = pubDate;
          blog.save(error => {
            if (error) {
              console.log(error);
            }
          });
        }
      }, error => {
        if (error) {
          console.log(error);
        }
      });
    });
  });
}
