import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import _ from 'lodash';
import * as settingsHelper from '../core/helpers/settingsHelper';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const getBlogListEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_GET_BLOG_LIST)
    .mergeMap((action) => {
      const { page } = action.payload;
      const state = getState().homeState;

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.HOME_GET_BLOG_LIST_REQUEST,
        payload: {
          page,
          blogList: page === 1 ? [] : state.blogList
        }
      });
    });
};

export const getBlogListRequestEpic = (action$, { getState }) => {
  return action$.ofType(constants.HOME_GET_BLOG_LIST_REQUEST)
    .mergeMap(action =>
      ajax.get(`${apiUrl}/blogs/all/${action.payload.page}`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' })
        .map(responseData => {
          const { blogs, nextPage, success, message } = responseData.response;
          if (success === false) {
            return {
              type: constants.HOME_GET_BLOG_LIST_ERROR,
              payload: {
                message
              }
            };
          }

          const state = getState().homeState;
          const newBlogList = _.cloneDeep(state.blogList);
          newBlogList.push(...blogs);

          // store this setting in cookie
          const tilesSettings = settingsHelper.getSettings();
          tilesSettings.tiles = true;
          settingsHelper.saveSettings(tilesSettings);

          return {
            type: constants.HOME_GET_BLOG_LIST_SUCCESS,
            payload: {
              blogs,
              nextPage
            }
          };
        })
        .catch(error => ({
          type: constants.HOME_GET_BLOG_LIST_ERROR,
          payload: {
            error
          }
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
          };
        })
        .catch(error => ({
          type: constants.HOME_SWITCH_TO_LIST_VIEW_ERROR,
          payload: error
        }));
};
