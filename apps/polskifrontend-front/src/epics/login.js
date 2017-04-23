import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import * as loginHelper from '../core/helpers/loginHelper';
import { apiUrl } from '../config';

export const loginEpic = action$ => {
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
