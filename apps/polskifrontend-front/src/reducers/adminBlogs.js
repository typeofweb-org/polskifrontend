import * as constants from '../constants';

const initialFormState = {
  newBlogName: '',
  newBlogNameValid: false,
  newBlogNameDirty: false,
  newBlogUrl: '',
  newBlogUrlValid: false,
  newBlogUrlDirty: false,
  newBlogRss: '',
  newBlogRssValid: false,
  newBlogRssDirty: false
};

export const initialState = {
  blogList: [],
  blogListLoading: true,
  blogListError: false,
  blogDeleteLoading: false,
  blogDeleteSuccess: false,
  blogDeleteError: false,

  ...initialFormState,

  deleteBlogRequested: false,
  deleteBlogId: '',

  addBlogLoading: false,
  addBlogError: false,
  addBlogErrorMessage: '',

  refreshBlogLoading: false,
  refreshBlogError: false,

  refreshSlugLoading: false,
  refreshSlugError: false,

  refreshFaviconLoading: false,
  refreshFaviconError: false
};

export default function adminBlogsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ADMIN_RESET_STATE:
      return { ...initialState };

    case constants.ADMIN_GET_BLOG_LIST:
      return { ...state, blogListLoading: true, blogListError: false };
    case constants.ADMIN_GET_BLOG_LIST_SUCCESS:
      return { ...state, blogListLoading: false, blogList: action.payload.blogs };
    case constants.ADMIN_GET_BLOG_LIST_ERROR:
      return { ...state, blogListLoading: false, blogListError: true };

    case constants.ADMIN_DELETE_BLOG_REQUEST:
      return { ...state, deleteBlogRequested: true, deleteBlogId: action.payload.blogId };
    case constants.ADMIN_DELETE_BLOG_REQUEST_CANCEL:
      return { ...state, deleteBlogRequested: false, deleteBlogId: '' };
    case constants.ADMIN_DELETE_BLOG:
      return { ...state, deleteBlogRequested: false, deleteBlogId: '', blogDeleteLoading: true, blogDeleteSuccess: false, blogDeleteError: false };
    case constants.ADMIN_DELETE_BLOG_SUCCESS:
      return { ...state, blogDeleteLoading: false, blogDeleteSuccess: true, blogDeleteError: false, blogList: action.payload.blogs };
    case constants.ADMIN_DELETE_BLOG_ERROR:
      return { ...state, blogDeleteLoading: false, blogDeleteSuccess: false, blogDeleteError: true };

    case constants.ADMIN_NEW_BLOG_NAME_CHANGED_VALID:
      return { ...state, newBlogName: action.payload.newName, newBlogNameValid: action.payload.isValid, newBlogNameDirty: true };
    case constants.ADMIN_NEW_BLOG_URL_CHANGED_VALID:
      return { ...state, newBlogUrl: action.payload.newUrl, newBlogUrlValid: action.payload.isValid, newBlogUrlDirty: true };
    case constants.ADMIN_NEW_BLOG_RSS_CHANGED_VALID:
      return { ...state, newBlogRss: action.payload.newRss, newBlogRssValid: action.payload.isValid, newBlogRssDirty: true };

    case constants.ADMIN_ADD_BLOG:
      return { ...state, addBlogLoading: true, addBlogError: false, addBlogErrorMessage: '' };
    case constants.ADMIN_ADD_BLOG_SUCCESS:
      return { ...state, ...initialFormState, addBlogLoading: false, addBlogError: false, blogList: action.payload.blogs };
    case constants.ADMIN_ADD_BLOG_ERROR:
      return { ...state, addBlogLoading: false, addBlogError: true, addBlogErrorMessage: action.payload.message };

    case constants.ADMIN_BLOG_REFRESH:
      return { ...state, refreshBlogLoading: true, refreshBlogError: false };
    case constants.ADMIN_BLOG_REFRESH_SUCCESS:
      return { ...state, refreshBlogLoading: false, refreshBlogError: false };
    case constants.ADMIN_BLOG_REFRESH_ERROR:
      return { ...state, refreshBlogLoading: false, refreshBlogError: true };

    case constants.ADMIN_SLUG_REFRESH:
      return { ...state, refreshSlugLoading: true, refreshSlugError: false };
    case constants.ADMIN_SLUG_REFRESH_SUCCESS:
      return { ...state, refreshSlugLoading: false, refreshSlugError: false };
    case constants.ADMIN_SLUG_REFRESH_ERROR:
      return { ...state, refreshSlugLoading: false, refreshSlugError: true };

    case constants.ADMIN_FAVICON_REFRESH:
      return { ...state, refreshFaviconLoading: true, refreshFaviconError: false };
    case constants.ADMIN_FAVICON_REFRESH_SUCCESS:
      return { ...state, refreshFaviconLoading: false, refreshFaviconError: false };
    case constants.ADMIN_FAVICON_REFRESH_ERROR:
      return { ...state, refreshFaviconLoading: false, refreshFaviconError: true };
    default:
      return { ...state };
  }
}
