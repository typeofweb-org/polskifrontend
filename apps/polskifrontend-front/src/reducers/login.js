import * as constants from '../constants';
import sha1 from 'sha1';

const initialState = {
  userName: '',
  password: '',
  buttonDisabled: true,
  inputsDisabled: false,
  loginError: false
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_USER_CHANGED:
      const usrEnabled = action.payload !== '' && state.password !== '';
      return { ...state, userName: action.payload, buttonDisabled: !usrEnabled };
    case constants.LOGIN_PASSWORD_CHANGED:
      const pwdEnabled = state.userName !== '' && action.payload !== '';
      return { ...state, password: sha1(action.payload), buttonDisabled: !pwdEnabled };

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
