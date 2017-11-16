import * as constants from '../constants';

const initialState = {
  url: '',
  urlValid: false,
  urlDirty: false,
  email: '',
  emailValid: false,
  emailDirty: false,
  captcha: null,
  sending: false,
  sent: false,
  sendError: false,
  shouldCleanUp: false
};

export default function submitReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SUBMIT_URL_CHANGED_VALID:
      const { newUrl, isUrlValid } = action.payload;
      return { ...state, url: newUrl, urlDirty: true, urlValid: isUrlValid, shouldCleanUp: false };
    case constants.SUBMIT_EMAIL_CHANGED_VALID:
      const { newEmail, isEmailValid } = action.payload;
      return { ...state, email: newEmail, emailDirty: true, emailValid: isEmailValid, shouldCleanUp: false };
    case constants.SUBMIT_CAPTCHA_CHANGED:
      return { ...state, captcha: action.payload.captcha, shouldCleanUp: false };

    case constants.SUBMIT_BLOG_SEND:
      return { ...state, sending: true, sendError: false, shouldCleanUp: false };
    case constants.SUBMIT_BLOG_SEND_SUCCESS:
      return { ...state, sending: false, sendError: false, sent: true, shouldCleanUp: false };
    case constants.SUBMIT_BLOG_SEND_ERROR:
      return { ...state, sending: false, sendError: true, sent: false, shouldCleanUp: false };

    case constants.SUBMIT_RESET_STATE:
      return { ...initialState, shouldCleanUp: true };
    default:
      return { ...state };
  }
}
