import * as constants from '../constants';

export const initialState = {
  newsList: [],
  newsListLoading: true,
  newsListError: false,

  newTitle: '',
  newTitleValid: false,
  newTitleDirty: false,
  newMessage: '',
  newMessageValid: false,
  newMessageDirty: false,

  addNewsLoading: false,
  addNewsError: false
};

export default function adminNewsReducer(state = initialState, action) {
  switch (action.type){
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
      return { ...state, addNewsLoading: false, addNewsError: false, newsList: action.payload.newsList };
    case constants.ADMIN_NEWS_ADD_NEWS_ERROR:
      return { ...state, addNewsLoading: false, addNewsError: true };

    default:
      return state;
  }
}
