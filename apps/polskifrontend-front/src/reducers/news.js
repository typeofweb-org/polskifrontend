import * as constants from '../constants';

export const initialState = {
  newsList: [],
  newsListNextPage: 1,
  newsListLoading: false,
  newsListError: false,
};

export default function newsReducer(state = initialState, action) {
  switch (action.type) {
    case constants.NEWS_GET_NEWS_PAGE:
      return {...state, newsListLoading: true, newsListError: false };
    case constants.NEWS_GET_NEWS_PAGE_SUCCESS:
      return {
        ...state,
        newsListLoading: false,
        newsListError: false,
        newsList: action.payload.newsList,
        newsListNextPage: action.payload.nextPage
      };
    case constants.NEWS_GET_NEWS_PAGE_ERROR:
      return { ...state, newsListLoading: false, newsListError: true };
    default:
      return state;
  }
}
