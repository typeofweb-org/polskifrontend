import * as constants from '../constants';
import * as settingsHelper from '../core/helpers/settingsHelper';
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

          // store this setting in cookie
          settingsHelper.saveSettings({ ...settingsHelper.getSettings(), tiles: true });

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

export const switchToListViewEpic = action$ => {
  return action$.ofType(constants.HOME_SWITCH_TO_LIST_VIEW)
    .mergeMap(action =>
      ajax.get(`${apiUrl}/articles/`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' }))
        .map(responseData => {
          if (responseData.response.success === false) {
            return {
              type: constants.HOME_SWITCH_TO_LIST_VIEW_ERROR,
              payload: 'get-articles-failed'
            };
          }

          // store this setting in cookie
          settingsHelper.saveSettings({ ...settingsHelper.getSettings(), tiles: false });

          return {
            type: constants.HOME_SWITCH_TO_LIST_VIEW_SUCCESS,
            payload: responseData.response.articles
          }
        })
        .catch(error => ({
          type: constants.HOME_SWITCH_TO_LIST_VIEW_ERROR,
          payload: error
        }));
};
