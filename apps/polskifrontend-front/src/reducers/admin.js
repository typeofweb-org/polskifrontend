import * as constants from '../constants';

const initialState = {
  blogList: [],
  blogListLoading: false,
  blogListError: false,
  blogDeleteLoading: false,
  blogDeleteSuccess: false,
  blogDeleteError: false
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADMIN_GET_BLOG_LIST:
      return { ...state, blogListLoading: true, blogListError: false };
    case constants.ADMIN_GET_BLOG_LIST_SUCCESS:
      return { ...state, blogListLoading: false, blogList: action.payload };
    case constants.ADMIN_GET_BLOG_LIST_ERROR:
      return { ...state, blogListLoading: false, blogListError: true };

    case constants.ADMIN_DELETE_BLOG:
      return { ...state, blogDeleteLoading: true, blogDeleteSuccess: false, blogDeleteError: false };
    case constants.ADMIN_DELETE_BLOG_SUCCESS:
      return { ...state, blogDeleteLoading: false, blogDeleteSuccess: true, blogDeleteError: false, blogList: action.payload };
    case constants.ADMIN_DELETE_BLOG_ERROR:
      return { ...state, blogDeleteLoading: false, blogDeleteSuccess: false, blogDeleteError: true };
  }

  return state;
}
