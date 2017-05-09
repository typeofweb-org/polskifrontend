import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const sendBlogRequestEpic = action$ => {
  return action$.ofType(constants.SUBMIT_BLOG_SEND)
    .mergeMap(action =>
      ajax({
        url: `${apiUrl}/blogs/submit`,
        body: action.payload,
        headers: { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' },
        method: 'POST',
        responseType: 'json'
      }).map(responseData => {
        if (responseData.response.success === false) {
          return {
            type: constants.SUBMIT_BLOG_SEND_ERROR,
            payload: responseData.response.message
          };
        }

        return {
          type: constants.SUBMIT_BLOG_SEND_SUCCESS,
          payload: responseData.message
        };
      })
        .catch(error => ({
          type: constants.SUBMIT_BLOG_SEND_ERROR,
          payload: error
        }))
    );
};
