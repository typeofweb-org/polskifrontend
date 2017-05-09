import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog, switchToListViewEpic } from './home';
import { loginEpic } from './login';
import { getAdminBlogListEpic, deleteBlogEpic, addBlogEpic, blogRefreshEpic, slugRefreshEpic } from './adminBlogs';
import { getAdminNewsListEpic, addNewsEpic, deleteAdminNewsEpic } from './adminNews';
import { sendBlogRequestEpic } from './submit';
import { sendFeedbackEpic } from './feedback';
import { getNewsPageEpic } from './news';
import { articlesGetArticleEpic } from './articles';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog,
  switchToListViewEpic,
  loginEpic,
  getAdminBlogListEpic,
  deleteBlogEpic,
  addBlogEpic,
  blogRefreshEpic,
  slugRefreshEpic,
  sendBlogRequestEpic,
  sendFeedbackEpic,
  getAdminNewsListEpic,
  addNewsEpic,
  deleteAdminNewsEpic,
  getNewsPageEpic,
  articlesGetArticleEpic
);

export default rootEpic;
