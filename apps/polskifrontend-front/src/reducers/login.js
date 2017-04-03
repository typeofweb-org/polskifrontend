import * as constants from '../constants';
//import _ from 'lodash';

const initialState = {
  userName: '',
  password: '',
  buttonDisabled: true
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOGIN_USER_CHANGED:
      const usrEnabled = action.payload !== '' && state.password !== '';
      return { ...state,  userName: action.payload, buttonDisabled: !usrEnabled };
    case constants.LOGIN_PASSWORD_CHANGED:
      const pwdEnabled = state.userName !== '' && action.payload !== '';
      return { ...state,  password: action.payload, buttonDisabled: !pwdEnabled };
  }

  return state;
}
