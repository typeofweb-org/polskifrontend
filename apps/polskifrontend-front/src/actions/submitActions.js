import * as constants from '../constants';

export function urlChanged(value) {
  return {
    type: constants.SUBMIT_URL_CHANGED,
    payload: value
  };
}

export function emailChanged(value) {
  return {
    type: constants.SUBMIT_EMAIL_CHANGED,
    payload: value
  };
}

export function captchaChanged(value) {
  return {
    type: constants.SUBMIT_CAPTCHA_CHANGED,
    payload: value
  }
}
