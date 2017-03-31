import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';

export const getBlogListEpic = action$ => {
  return action$.ofType(constants.HOME_GET_BLOG_LIST)
    .mergeMap(action =>
      ajax.getJSON('http://localhost:8880/blogs')
        .map(response => ({
          type: constants.HOME_GET_BLOG_LIST_SUCCESS,
          payload: response.blogs
        }))
        .catch(error => ({
          type: constants.HOME_GET_BLOG_LIST_ERROR,
          payload: error
        }))
    );
};
