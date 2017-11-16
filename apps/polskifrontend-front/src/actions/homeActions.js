import * as constants from '../constants';

export function getBlogList(page) {
  return {
    type: constants.HOME_GET_BLOG_LIST,
    payload: {
      page
    }
  };
}

export function switchToListView(page) {
  return {
    type: constants.HOME_SWITCH_TO_LIST_VIEW,
    payload: {
      page
    }
  };
}

export function addLinkToClicked(url) {
  return {
    type: constants.HOME_ADD_LINK_TO_CLICKED,
    payload: {
      url
    }
  };
}
