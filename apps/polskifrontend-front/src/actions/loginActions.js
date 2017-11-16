import * as constants from '../constants';

export function userChange(newValue) {
  return {
    type: constants.LOGIN_USER_CHANGED,
    payload: {
      newValue
    }
  };
}

export function passwordChange(newValue) {
  return {
    type: constants.LOGIN_PASSWORD_CHANGED,
    payload: {
      newValue
    }
  };
}

export function login(user, password) {
  return {
    type: constants.LOGIN_INVOKE,
    payload: {
      user,
      password
    }
  };
}
