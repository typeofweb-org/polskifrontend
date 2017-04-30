import * as constants from '../constants';

const initialFormState = {
  newTitle: '',
  newTitleValid: false,
  newTitleDirty: false,
  newMessage: '',
  newMessageValid: false,
  newMessageDirty: false,
};

export const initialState = {
  newsList: [],
  newsListLoading: true,
  newsListError: false,

  ...initialFormState,

  addNewsLoading: false,
  addNewsError: false,

  deleteNewsRequested: false,
  deleteNewsLoading: false,
  deleteNewsError: false,
  deleteNewsId: ''
};

export default function adminNewsReducer(state = initialState, action) {
  switch (action.type) {

    // news list loading
    case constants.ADMIN_NEWS_GET_NEWS:
      return { ...state, newsListLoading: true, newsListError: false };
    case constants.ADMIN_NEWS_GET_NEWS_SUCCESS:
      return { ...state, newsList: action.payload.newsList, newsListLoading: false, newsListError: false };
    case constants.ADMIN_NEWS_GET_NEWS_ERROR:
      return { ...state, newsListLoading: false, newsListError: true };

    // adding new news
    case constants.ADMIN_NEWS_TITLE_CHANGED:
      return { ...state, newTitle: action.payload.value, newTitleValid: action.payload.isValid, newTitleDirty: true };
    case constants.ADMIN_NEWS_MESSAGE_CHANGED:
      return { ...state, newMessage: action.payload.value, newMessageValid: action.payload.isValid, newMessageDirty: true };
    case constants.ADMIN_NEWS_ADD_NEWS:
      return { ...state, addNewsLoading: true, addNewsError: false };
    case constants.ADMIN_NEWS_ADD_NEWS_SUCCESS:
      return { ...state, ...initialFormState, addNewsLoading: false, addNewsError: false, newsList: action.payload.newsList };
    case constants.ADMIN_NEWS_ADD_NEWS_ERROR:
      return { ...state, addNewsLoading: false, addNewsError: true };

    // deleting news
    case constants.ADMIN_NEWS_DELETE_NEWS_REQUEST:
      return { ...state, deleteNewsRequested: true, deleteNewsId: action.payload.newsId };
    case constants.ADMIN_NEWS_DELETE_NEWS_CANCEL:
      return { ...state, deleteNewsRequested: false, deleteNewsId: '' };
    case constants.ADMIN_NEWS_DELETE_NEWS:
      return { ...state, deleteNewsLoading: true, deleteNewsError: false };
    case constants.ADMIN_NEWS_DELETE_NEWS_SUCCESS:
      return { ...state, newsList: action.payload.newsList, deleteNewsRequested: false, deleteNewsLoading: false, deleteNewsError: false, deleteNewsId: '' };
    case constants.ADMIN_NEWS_DELETE_NEWS_ERROR:
      return { ...state, deleteNewsLoading: false, deleteNewsError: true };

    default:
      return state;
  }
}
