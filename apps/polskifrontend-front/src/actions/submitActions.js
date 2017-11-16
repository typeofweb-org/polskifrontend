import * as constants from '../constants';

export function urlChanged(value) {
  return {
    type: constants.SUBMIT_URL_CHANGED,
    payload: {
      newUrl: value
    }
  };
}

export function emailChanged(value) {
  return {
    type: constants.SUBMIT_EMAIL_CHANGED,
    payload: {
      newEmail: value
    }
  };
}

export function captchaChanged(value) {
  return {
    type: constants.SUBMIT_CAPTCHA_CHANGED,
    payload: {
      captcha: value
    }
  };
}

export function sendBlogRequest(blogName, email) {
  return {
    type: constants.SUBMIT_BLOG_SEND,
    payload: {
      blogName,
      email
    }
  };
}

export function resetSubmitState() {
  return {
    type: constants.SUBMIT_RESET_STATE
  };
}
