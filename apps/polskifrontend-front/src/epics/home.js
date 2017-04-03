import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';

export const getBlogListEpic = action$ => {
  return action$.ofType(constants.HOME_GET_BLOG_LIST)
    .mergeMap(action =>
      ajax.getJSON(`${apiUrl}/blogs`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' })
        .flatMap(response => {
          const blogs = response.blogs;
          const actions = [{
            type: constants.HOME_GET_BLOG_LIST_SUCCESS,
            payload: blogs
          }];

          blogs.map(item => {
            actions.push({
              type: constants.HOME_GET_ARTICLES_FOR_BLOG,
              payload: item._id
            });
          });

          return actions;
        })
        .catch(error => ({
          type: constants.HOME_GET_BLOG_LIST_ERROR,
          payload: error
        }))
    );
};

export const getArticleListForBlog = action$ => {
  return action$.ofType(constants.HOME_GET_ARTICLES_FOR_BLOG)
    .mergeMap(action =>
      ajax.getJSON(`${apiUrl}/articles/${action.payload}`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' })
        .map(response => ({
          type: constants.HOME_GET_ARTICLES_FOR_BLOG_SUCCESS,
          payload: {
            articles: response.articles,
            blogId: action.payload
          }
        }))
        .catch(error => ({
          type: constants.HOME_GET_ARTICLES_FOR_BLOG_ERROR,
          payload: error
        }))
    );
};
