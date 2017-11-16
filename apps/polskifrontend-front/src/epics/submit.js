import * as constants from '../constants';
import * as validators from '../core/helpers/validators';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const urlChangedEpic = action$ => {
  return action$.ofType(constants.SUBMIT_URL_CHANGED)
    .mergeMap((action) => {
      const { newUrl } = action.payload;
      const isUrlValid = validators.isRequired(newUrl) && validators.isUrlValid(newUrl);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.SUBMIT_URL_CHANGED_VALID,
        payload: {
          newUrl,
          isUrlValid
        }
      });
    });
};

export const emailChangedEpic = action$ => {
  return action$.ofType(constants.SUBMIT_EMAIL_CHANGED)
    .mergeMap((action) => {
      const { newEmail } = action.payload;
      const isEmailValid = newEmail === '' || validators.isEmailValid(newEmail);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.SUBMIT_EMAIL_CHANGED_VALID,
        payload: {
          newEmail,
          isEmailValid
        }
      });
    });
};

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
