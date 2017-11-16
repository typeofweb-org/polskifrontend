import * as constants from '../constants';

export function articlesGetArticle(slug) {
  return {
    type: constants.ARTICLES_GET_ARTICLE,
    payload: {
      slug
    }
  };
}

export function articlesClearDataLoaded() {
  return {
    type: constants.ARTICLES_CLEAR_DATA_LOADED
  };
}
