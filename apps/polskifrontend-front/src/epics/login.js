import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import * as loginHelper from '../core/helpers/loginHelper';
import { apiUrl } from '../config';
import sha1 from 'sha1';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const userChangeEpic = (action$, { getState }) => {
  return action$.ofType(constants.LOGIN_USER_CHANGED)
    .mergeMap((action) => {
      const { newValue } = action.payload;
      const state = getState().loginState;
      const formFilled = newValue !== '' && state.password !== '';

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.LOGIN_USER_CHANGED_VALID,
        payload: {
          newValue,
          formFilled
        }
      });
    });
};

export const passwordChangeEpic = (action$, { getState }) => {
  return action$.ofType(constants.LOGIN_PASSWORD_CHANGED)
    .mergeMap((action) => {
      const { newValue } = action.payload;
      const state = getState().loginState;
      const formFilled = state.userName !== '' && newValue !== '';

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.LOGIN_PASSWORD_CHANGED_VALID,
        payload: {
          password: sha1(newValue),
          formFilled
        }
      });
    });
};

export const loginEpic = (action$) => {
  return action$.ofType(constants.LOGIN_INVOKE)
    .mergeMap(action =>
      ajax({
        url: `${apiUrl}/users/authenticate`,
        body: { user: action.payload.user, password: action.payload.password },
        headers: { authorization: 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==' },
        method: 'POST',
        responseType: 'json'
      }).map(data => {
        if (data.response.success) {
          // set cookie for later use
          loginHelper.saveLoginToken(data.response.token);

          return {
            type: constants.LOGIN_INVOKE_SUCCESS
          };
        }

        return {
          type: constants.LOGIN_INVOKE_ERROR,
          payload: data.message
        };
      })
      .catch(error => ({
        type: constants.LOGIN_INVOKE_ERROR,
        payload: error
      }))
    );
};
