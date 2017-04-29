import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import * as loginHelper from '../core/helpers/loginHelper';
import _ from 'lodash';

export const getAdminNewsListEpic = action$ => {
  return action$.ofType(constants.ADMIN_NEWS_GET_NEWS)
    .mergeMap(() => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax.get(`${apiUrl}/admin/news`, headers)
        .map(responseData => {
          if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          return {
            type: constants.ADMIN_NEWS_GET_NEWS_SUCCESS,
            payload: {
              newsList: responseData.response.newses
            }
          };
        })
        .catch(error => ({
          type: constants.ADMIN_NEWS_GET_NEWS_ERROR,
          payload: error
        }));
    });
};

export const addNewsEpic = (action$, store) => {
  return action$.ofType(constants.ADMIN_NEWS_ADD_NEWS)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax({
        url: `${apiUrl}/admin/news`,
        body: action.payload,
        headers: headers,
        method: 'POST',
        responseType: 'json'
      })
      .map(responseData => {
        if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
          return {
            type: constants.ADMIN_TOKEN_EXPIRED
          };
        }

        if (responseData.response.success === false) {
          return {
            type: constants.ADMIN_NEWS_ADD_NEWS_ERROR,
            payload: responseData.response.message
          };
        }

        const state = store.getState().adminNewsState;
        console.log(state);
        const newsList = _.cloneDeep(state.newsList);
        newsList.push(responseData.response.news);

        return {
          type: constants.ADMIN_NEWS_ADD_NEWS_SUCCESS,
          payload: {
            newsList
          }
        };
      })
      .catch(error => ({
        type: constants.ADMIN_ADD_BLOG_ERROR,
        payload: error
      }));
    });
};
