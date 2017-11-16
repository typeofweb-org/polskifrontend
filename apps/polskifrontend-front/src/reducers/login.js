import * as constants from '../constants';

const initialState = {
  userName: '',
  password: '',
  buttonDisabled: true,
  inputsDisabled: false,
  loginError: false
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_USER_CHANGED_VALID:
      return { ...state, userName: action.payload.newValue, buttonDisabled: !action.payload.formFilled };
    case constants.LOGIN_PASSWORD_CHANGED_VALID:
      return { ...state, password: action.payload.password, buttonDisabled: !action.payload.formFilled };

    case constants.LOGIN_INVOKE:
      return { ...state, buttonDisabled: true, inputsDisabled: true, loginError: false };
    case constants.LOGIN_INVOKE_SUCCESS:
      return { ...state, userName: '', password: '', buttonDisabled: true, inputsDisabled: false };
    case constants.LOGIN_INVOKE_ERROR:
      return { ...state,  buttonDisabled: false, inputsDisabled: false, loginError: true };
    default:
      return { ...state };
  }
}
