import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog } from './home';
import { loginEpic } from './login';
import { getAdminBlogListEpic, deleteBlogEpic } from './admin';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog,
  loginEpic,
  getAdminBlogListEpic,
  deleteBlogEpic
);

export default rootEpic;
