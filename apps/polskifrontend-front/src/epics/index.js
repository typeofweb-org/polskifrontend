import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog, switchToListViewEpic } from './home';
import { loginEpic } from './login';
import { getAdminBlogListEpic, deleteBlogEpic, addBlogEpic, blogRefreshEpic } from './admin';
import { getAdminNewsListEpic, addNewsEpic } from './adminNews';
import { sendBlogRequestEpic } from './submit';
import { sendFeedbackEpic } from './feedback';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog,
  switchToListViewEpic,
  loginEpic,
  getAdminBlogListEpic,
  deleteBlogEpic,
  addBlogEpic,
  blogRefreshEpic,
  sendBlogRequestEpic,
  sendFeedbackEpic,
  getAdminNewsListEpic,
  addNewsEpic
);

export default rootEpic;
