import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';

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
          payload: responseData.message
        };
      })
        .catch(error => ({
          type: constants.FEEDBACK_SEND_ERROR,
          payload: error
        }))
    );
};
