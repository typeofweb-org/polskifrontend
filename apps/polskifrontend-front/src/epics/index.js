import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog } from './home';
import { loginEpic } from './login';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog,
  loginEpic
);

export default rootEpic;
