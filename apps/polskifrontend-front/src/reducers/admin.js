import * as constants from '../constants';
import * as validators from '../core/helpers/validators';

const initialState = {
  blogList: [],
  blogListLoading: false,
  blogListError: false,
  blogDeleteLoading: false,
  blogDeleteSuccess: false,
  blogDeleteError: false,

  newBlogName: '',
  newBlogNameValid: false,
  newBlogNameDirty: false,
  newBlogUrl: '',
  newBlogUrlValid: false,
  newBlogUrlDirty: false,
  newBlogRss: '',
  newBlogRssValid: false,
  newBlogRssDirty: false,

  addBlogLoading: false,
  addBlogError: false
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

    case constants.ADMIN_NEW_BLOG_NAME_CHANGED:
      return { ...state, newBlogName: action.payload, newBlogNameValid: validators.isRequired(action.payload), newBlogNameDirty: true };
    case constants.ADMIN_NEW_BLOG_URL_CHANGED:
      return { ...state, newBlogUrl: action.payload, newBlogUrlValid: validators.isUrlValid(action.payload), newBlogUrlDirty: true };
    case constants.ADMIN_NEW_BLOG_RSS_CHANGED:
      return { ...state, newBlogRss: action.payload, newBlogRssValid: validators.isUrlValid(action.payload), newBlogRssDirty: true };

    case constants.ADMIN_ADD_BLOG:
      return { ...state, addBlogLoading: true, addBlogError: false };
    case constants.ADMIN_ADD_BLOG_SUCCESS:
      const currentBlogList = state.blogList;
      currentBlogList.push(action.payload);
      return { ...state, addBlogLoading: false, addBlogError: false, blogList: currentBlogList };
    case constants.ADMIN_ADD_BLOG_ERROR:
      return { ...state, addBlogLoading: false, addBlogError: true };
  }

  return state;
}
