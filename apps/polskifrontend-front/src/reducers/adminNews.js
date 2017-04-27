import * as constants from '../constants';
import * as validators from '../core/helpers/validators';

export const initialState = {
  newsList: [],
  newsListLoading: true,
  newsListError: false
};

export default function adminNewsReducer(state = initialState, action) {
  switch (action.type){
    case constants.ADMIN_NEWS_GET_NEWS:
      return { ...state, newsListLoading: true, newsListError: false };
    case constants.ADMIN_NEWS_GET_NEWS_SUCCESS:
      return { ...state, newsList: action.payload.newsList, newsListLoading: false, newsListError: false };
    case constants.ADMIN_NEWS_GET_NEWS_ERROR:
      return { ...state, newsListLoading: false, newsListError: true };
    default:
      return state;
  }
}
