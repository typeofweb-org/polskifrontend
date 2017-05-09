import * as constants from '../constants';

export const initialState = {
  article: {},
  articleLoaded: false,
  articleLoading: false,
  articleError: false
};

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case constants.ARTICLES_CLEAR_DATA_LOADED:
      return { ...state, articleLoaded: false };

    case constants.ARTICLES_GET_ARTICLE:
      return { ...state, articleLoading: true, articleError: false };
    case constants.ARTICLES_GET_ARTICLE_SUCCESS:
      return {
        ...state,
        articleLoaded: true,
        articleLoading: false,
        articleError: false,
        article: action.payload.article
      };
    case constants.ARTICLES_GET_ARTICLE_ERROR:
      return { ...state, articleLoaded: false, articleLoading: false, articleError: true };
    default:
      return { ...state };
  }
}
