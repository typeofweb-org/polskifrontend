import * as constants from '../constants';
import * as validators from '../core/helpers/validators';

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
    case constants.FEEDBACK_TEXT_CHANGED:
      const newFeedback = action.payload;
      const isFeedbackValid = validators.isRequired(newFeedback);
      return { ...state, feedback: newFeedback, feedbackDirty: true, feedbackValid: isFeedbackValid, shouldCleanUp: false };
    case constants.FEEDBACK_EMAIL_CHANGED:
      const newEmail = action.payload;
      const isEmailValid = newEmail === '' || validators.isEmailValid(newEmail);
      return { ...state, email: newEmail, emailDirty: true, emailValid: isEmailValid, shouldCleanUp: false };
    case constants.FEEDBACK_CAPTCHA_CHANGED:
      return { ...state, captcha: action.payload, shouldCleanUp: false };

    case constants.FEEDBACK_SEND:
      return { ...state, sending: true, sendError: false, shouldCleanUp: false };
    case constants.FEEDBACK_SEND_SUCCESS:
      return { ...state, sending: false, sendError: false, sent: true, shouldCleanUp: false };
    case constants.FEEDBACK_SEND_ERROR:
      return { ...state, sending: false, sendError: true, sent: false, shouldCleanUp: false };

    case constants.FEEDBACK_RESET_STATE:
      return { ...initialState, shouldCleanUp: true };
  }

  return state;
}
