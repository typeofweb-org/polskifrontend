import * as constants from '../constants';
import * as validators from '../core/helpers/validators';

export function getAdminNewsList() {
  return {
    type: constants.ADMIN_NEWS_GET_NEWS
  };
}

export function newNewsTitleChanged(value) {
  const isValid = validators.isRequired(value);
  return {
    type: constants.ADMIN_NEWS_TITLE_CHANGED,
    payload: {
      isValid,
      value
    }
  };
}

export function newNewsMessageChanged(value) {
  const isValid = validators.isRequired(value);
  return {
    type: constants.ADMIN_NEWS_MESSAGE_CHANGED,
    payload: {
      isValid,
      value
    }
  }
}

export function addNews(newsObject) {
  return {
    type: constants.ADMIN_NEWS_ADD_NEWS,
    payload: {
      title: newsObject.title,
      message: newsObject.message
    }
  }
}
