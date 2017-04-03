import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog } from './home';
import { loginEpic } from './login';
import { getAdminBlogListEpic } from './admin';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog,
  loginEpic,
  getAdminBlogListEpic
);

export default rootEpic;
