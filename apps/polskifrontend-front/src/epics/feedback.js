import * as constants from '../constants';
import * as validators from '../core/helpers/validators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const feedbackTextChangedEpic = (action$) => {
  return action$.ofType(constants.FEEDBACK_TEXT_CHANGED)
    .mergeMap((action) => {
      const { value } = action.payload;
      const isValid = validators.isRequired(value);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.FEEDBACK_TEXT_CHANGED_VALID,
        payload: {
          value,
          isValid
        }
      });
    });
};

export const feedbackEmailChangedEpic = (action$) => {
  return action$.ofType(constants.FEEDBACK_EMAIL_CHANGED)
    .mergeMap((action) => {
      const { value } = action.payload;
      const isValid = value === '' || validators.isEmailValid(value);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.FEEDBACK_EMAIL_CHANGED_VALID,
        payload: {
          value,
          isValid
        }
      });
    });
};

export const sendFeedbackEpic = (action$) => {
  return action$.ofType(constants.FEEDBACK_SEND)
    .mergeMap(action =>
      ajax({
        url: `${apiUrl}/feedback`,
        body: action.payload,
        headers: { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' },
        method: 'POST',
        responseType: 'json'
      }).map(responseData => {
        const { success, message, newses } = responseData.response;
        if (success === false) {
          return {
            type: constants.FEEDBACK_SEND_ERROR,
            payload: message
          };
        }

        return {
          type: constants.FEEDBACK_SEND_SUCCESS,
          payload: {
            newsList: newses
          }
        };
      })
      .catch(error => ({
        type: constants.FEEDBACK_SEND_ERROR,
        payload: {
          error
        }
      }))
    );
};
