import * as constants from '../constants';

const initialState = {
  email: '',
  emailValid: false,
  emailDirty: false,
  feedback: '',
  feedbackValid: false,
  feedbackDirty: false,
  captcha: null,
  sending: false,
  sent: false,
  sendError: false,
  shouldCleanUp: false
};

export default function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case constants.FEEDBACK_TEXT_CHANGED_VALID:
      return {
        ...state,
        feedback: action.payload.value,
        feedbackDirty: true,
        feedbackValid: action.payload.isValid,
        shouldCleanUp: false
      };
    case constants.FEEDBACK_EMAIL_CHANGED_VALID:
      return {
        ...state,
        email: action.payload.value,
        emailDirty: true,
        emailValid: action.payload.isValid,
        shouldCleanUp: false
      };
    case constants.FEEDBACK_CAPTCHA_CHANGED:
      return { ...state, captcha: action.payload.value, shouldCleanUp: false };

    case constants.FEEDBACK_SEND:
      return { ...state, sending: true, sendError: false, shouldCleanUp: false };
    case constants.FEEDBACK_SEND_SUCCESS:
      return { ...state, sending: false, sendError: false, sent: true, shouldCleanUp: false };
    case constants.FEEDBACK_SEND_ERROR:
      return { ...state, sending: false, sendError: true, sent: false, shouldCleanUp: false };

    case constants.FEEDBACK_RESET_STATE:
      return { ...initialState, shouldCleanUp: true };
    default:
      return { ...state };
  }
}
