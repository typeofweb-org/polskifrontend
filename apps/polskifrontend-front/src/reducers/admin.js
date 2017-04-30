import * as constants from '../constants';

export const initialState = {
  tokenExpired: false
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADMIN_TOKEN_EXPIRED:
      return { ...state, tokenExpired: true };
    case constants.ADMIN_RESET_TOKEN:
      return { ...state, tokenExpired: false };
    default:
      return state;
  }
}
