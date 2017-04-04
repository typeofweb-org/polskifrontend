import * as constants from '../constants';

const initialState = {
  blogList: [],
  blogListLoading: false,
  blogListError: false
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADMIN_GET_BLOG_LIST:
      return { ...state, blogListLoading: true };
    case constants.ADMIN_GET_BLOG_LIST_SUCCESS:
      return { ...state, blogListLoading: false, blogList: action.payload };
    case constants.ADMIN_GET_BLOG_LIST_ERROR:
      return { ...state, blogListLoading: false, blogListError: true };
  }

  return state;
}
