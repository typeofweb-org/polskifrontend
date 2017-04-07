import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog, switchToListViewEpic } from './home';
import { loginEpic } from './login';
import { getAdminBlogListEpic, deleteBlogEpic, addBlogEpic, blogRefreshEpic } from './admin';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog,
  switchToListViewEpic,
  loginEpic,
  getAdminBlogListEpic,
  deleteBlogEpic,
  addBlogEpic,
  blogRefreshEpic
);

export default rootEpic;
