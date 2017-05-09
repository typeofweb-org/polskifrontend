import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const sendFeedbackEpic = action$ => {
  return action$.ofType(constants.FEEDBACK_SEND)
    .mergeMap(action =>
      ajax({
        url: `${apiUrl}/feedback`,
        body: action.payload,
        headers: { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' },
        method: 'POST',
        responseType: 'json'
      }).map(responseData => {
        if (responseData.response.success === false) {
          return {
            type: constants.FEEDBACK_SEND_ERROR,
            payload: responseData.response.message
          };
        }

        return {
          type: constants.FEEDBACK_SEND_SUCCESS,
          payload: {
            newsList: responseData.response.newses
          }
        };
      })
      .catch(error => ({
        type: constants.FEEDBACK_SEND_ERROR,
        payload: error
      }))
    );
};
