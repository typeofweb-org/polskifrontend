import schedule from 'node-schedule';
import { Blogs, Articles } from '../models';

export function initRssParsingSchedule() {
  schedule.scheduleJob('*/15 * * * *', async () => {
    console.log('running scheduled job [RSS update]...');
    const blogs = await Blogs.getAllBlogs();
    blogs.forEach(async blog => await Articles.getArticlesForBlog(blog));
  });
}
