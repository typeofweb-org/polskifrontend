import { combineEpics } from 'redux-observable';
import { getBlogListEpic } from './home';

const rootEpic = combineEpics(
  getBlogListEpic
);

export default rootEpic;
