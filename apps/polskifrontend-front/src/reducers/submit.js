import * as constants from '../constants';
import * as validators from '../core/helpers/validators';

const initialState = {
  url: '',
  urlValid: false,
  urlDirty: false,
  email: '',
  emailValid: false,
  emailDirty: false,
  captcha: null
};

export default function submitReducer(state = initialState, action) {
  switch (action.type) {
    case constants.SUBMIT_URL_CHANGED:
      const newUrl = action.payload;
      console.log(validators.isUrlValid(newUrl));
      const isUrlValid = validators.isRequired(newUrl) && validators.isUrlValid(newUrl);
      return { ...state, url: newUrl, urlDirty: true, urlValid: isUrlValid };
    case constants.SUBMIT_EMAIL_CHANGED:
      const newEmail = action.payload;
      const isEmailValid = newEmail === '' || validators.isEmailValid(newEmail);
      return { ...state, email: newEmail, emailDirty: true, emailValid: isEmailValid };
    case constants.SUBMIT_CAPTCHA_CHANGED:
      return { ...state, captcha: action.payload };
  }

  return state;
}
