import { combineEpics } from 'redux-observable';
import { getBlogListEpic, getArticleListForBlog } from './home';

const rootEpic = combineEpics(
  getBlogListEpic,
  getArticleListForBlog
);

export default rootEpic;
