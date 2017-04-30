import * as constants from '../constants';

export function resetToken() {
  return {
    type: constants.ADMIN_RESET_TOKEN
  }
}
