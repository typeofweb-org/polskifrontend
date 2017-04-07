import * as constants from '../constants';
import * as validators from '../core/helpers/validators';

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
    case constants.SUBMIT_URL_CHANGED:
      const newUrl = action.payload;
      console.log(validators.isUrlValid(newUrl));
      const isUrlValid = validators.isRequired(newUrl) && validators.isUrlValid(newUrl);
      return { ...state, url: newUrl, urlDirty: true, urlValid: isUrlValid, shouldCleanUp: false };
    case constants.SUBMIT_EMAIL_CHANGED:
      const newEmail = action.payload;
      const isEmailValid = newEmail === '' || validators.isEmailValid(newEmail);
      return { ...state, email: newEmail, emailDirty: true, emailValid: isEmailValid, shouldCleanUp: false };
    case constants.SUBMIT_CAPTCHA_CHANGED:
      return { ...state, captcha: action.payload, shouldCleanUp: false };

    case constants.SUBMIT_BLOG_SEND:
      return { ...state, sending: true, sendError: false, shouldCleanUp: false };
    case constants.SUBMIT_BLOG_SEND_SUCCESS:
      return { ...state, sending: false, sendError: false, sent: true, shouldCleanUp: false };
    case constants.SUBMIT_BLOG_SEND_ERROR:
      return { ...state, sending: false, sendError: true, sent: false, shouldCleanUp: false };

    case constants.SUBMIT_RESET_STATE:
      return { ...initialState, shouldCleanUp: true };
  }

  return state;
}
