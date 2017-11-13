import schedule from 'node-schedule';
import { Blogs, Articles } from '../models';
import log from '../log';

export function initRssParsingSchedule() {
  schedule.scheduleJob('*/15 * * * *', async () => {
    log.info('running scheduled job [RSS update]...');
    try {
      const blogs = await Blogs.getAllBlogs();
      blogs.forEach(async (blog) => {
        try {
          await Articles.getArticlesForBlog(blog);
        } catch (error) {
          // TODO: send email that the blog may be dead
          log.error(`Getting articles for blog "${blog.name}" failed`);
        }
      });
    } catch (error) {
      log.error('Error getting all blogs');
    }
  });
}
