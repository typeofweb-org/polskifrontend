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
  };
}

export function addAdminNews(newsObject) {
  return {
    type: constants.ADMIN_NEWS_ADD_NEWS,
    payload: {
      title: newsObject.title,
      message: newsObject.message
    }
  };
}

export function deleteAdminNewsRequest(newsId) {
  return {
    type: constants.ADMIN_NEWS_DELETE_NEWS_REQUEST,
    payload: {
      newsId
    }
  };
}

export function deleteAdminNewsCancel() {
  return {
    type: constants.ADMIN_NEWS_DELETE_NEWS_CANCEL
  };
}

export function deleteAdminNews(newsId) {
  return {
    type: constants.ADMIN_NEWS_DELETE_NEWS,
    payload: {
      newsId
    }
  };
}
