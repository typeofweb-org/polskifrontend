import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const articlesGetArticleEpic = (action$) => {
  return action$.ofType(constants.ARTICLES_GET_ARTICLE)
    .mergeMap(action =>
      ajax.get(`${apiUrl}/articles/${action.payload.slug}`, { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' }))
        .map(responseData => {
          const { success, message, article } = responseData.response;
          if (success === false) {
            return {
              type: constants.ARTICLES_GET_ARTICLE_ERROR,
              payload: message
            };
          }

          return {
            type: constants.ARTICLES_GET_ARTICLE_SUCCESS,
            payload: {
              article: article
            }
          };
        })
        .catch(error => ({
          type: constants.ARTICLES_GET_ARTICLE_ERROR,
          payload: {
            error
          }
        }));
};
