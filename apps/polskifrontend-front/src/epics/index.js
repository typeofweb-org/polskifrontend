import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog } from './home';
import { loginEpic } from './login';
import { getAdminBlogListEpic, deleteBlogEpic, addBlogEpic } from './admin';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog,
  loginEpic,
  getAdminBlogListEpic,
  deleteBlogEpic,
  addBlogEpic
);

export default rootEpic;
