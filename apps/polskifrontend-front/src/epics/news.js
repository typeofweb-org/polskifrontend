import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const getNewsPageEpic = (action$, store) => {
  return action$.ofType(constants.NEWS_GET_NEWS_PAGE)
    .mergeMap(action =>
      ajax.get(`${apiUrl}/news/${action.payload.page}`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' }))
        .map(responseData => {
          if (responseData.response.success === false) {
            return {
              type: constants.NEWS_GET_NEWS_PAGE_ERROR,
              payload: responseData.response.message
            };
          }

          const state = store.getState().newsState;
          const newsList = state.newsList;
          newsList.push(...responseData.response.newses);

          return {
            type: constants.NEWS_GET_NEWS_PAGE_SUCCESS,
            payload: {
              newsList,
              nextPage: responseData.response.nextPage
            }
          }
        })
        .catch(error => ({
          type: constants.NEWS_GET_NEWS_PAGE_ERROR,
          payload: error
        }));
};
