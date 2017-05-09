import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const getBlogListEpic = action$ => {
  return action$.ofType(constants.HOME_GET_BLOG_LIST)
    .mergeMap(action =>
      ajax.get(`${apiUrl}/blogs/all/${action.payload}`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' })
        .flatMap(responseData => {
          const blogs = responseData.response.blogs;
          if (responseData.response.success === false) {
            return [{
              type: constants.HOME_GET_BLOG_LIST_ERROR,
              payload: responseData.response.message
            }];
          }

          const actions = [{
            type: constants.HOME_GET_BLOG_LIST_SUCCESS,
            payload: {
              blogs,
              nextPage: responseData.response.nextPage
            }
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
      ajax.get(`${apiUrl}/blogs/${action.payload}/articles`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' })
        .map(responseData => {
          if (responseData.response.success === false) {
            return {
              type: constants.HOME_GET_ARTICLES_FOR_BLOG_ERROR,
              payload: responseData.response.message
            };
          }

          return {
            type: constants.HOME_GET_ARTICLES_FOR_BLOG_SUCCESS,
            payload: {
              articles: responseData.response.articles,
              blogId: action.payload
            }
          }
        })
        .catch(error => ({
          type: constants.HOME_GET_ARTICLES_FOR_BLOG_ERROR,
          payload: error
        }))
    );
};

export const switchToListViewEpic = action$ => {
  return action$.ofType(constants.HOME_SWITCH_TO_LIST_VIEW)
    .mergeMap(action =>
      ajax.get(`${apiUrl}/articles/all/${action.payload}`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' }))
        .map(responseData => {
          if (responseData.response.success === false) {
            return {
              type: constants.HOME_SWITCH_TO_LIST_VIEW_ERROR,
              payload: responseData.response.message
            };
          }

          return {
            type: constants.HOME_SWITCH_TO_LIST_VIEW_SUCCESS,
            payload: {
              articles: responseData.response.articles,
              nextPage: responseData.response.nextPage
            }
          }
        })
        .catch(error => ({
          type: constants.HOME_SWITCH_TO_LIST_VIEW_ERROR,
          payload: error
        }));
};
