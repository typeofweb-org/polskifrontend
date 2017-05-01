import * as constants from '../constants';

export const initialState = {
  newsList: [],
  newsListNextPage: 1,
  newsListListLoading: false,
  newsListError: false,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.NEWS_GET_NEWS_PAGE:
      return {...state};
    case constants.NEWS_GET_NEWS_PAGE_SUCCESS:
      return { ...state };
    case constants.NEWS_GET_NEWS_PAGE_ERROR:
      return { ...state };
    default:
      return state;
  }
}
