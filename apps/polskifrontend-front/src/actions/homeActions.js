import * as constants from '../constants';

export function getBlogList() {
  return {
    type: constants.HOME_GET_BLOG_LIST
  };
}

export function blogProposalChange(value) {
  return {
    type: constants.HOME_BLOG_PROPOSAL_URL_CHANGE,
    payload: value
  };
}

export function switchToListView() {
  return {
    type: constants.HOME_SWITCH_TO_LIST_VIEW
  };
}
