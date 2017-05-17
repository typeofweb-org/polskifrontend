import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import * as loginHelper from '../core/helpers/loginHelper';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export const getAdminBlogListEpic = action$ => {
  return action$.ofType(constants.ADMIN_GET_BLOG_LIST)
    .mergeMap(() => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax.get(`${apiUrl}/admin/blogs`, headers)
        .map(responseData => {
          if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          return {
            type: constants.ADMIN_GET_BLOG_LIST_SUCCESS,
            payload: responseData.response.blogs
          };
        })
        .catch(error => ({
          type: constants.ADMIN_GET_BLOG_LIST_ERROR,
          payload: error
        }));
    });
};

export const deleteBlogEpic = action$ => {
  return action$.ofType(constants.ADMIN_DELETE_BLOG)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax.delete(`${apiUrl}/admin/blogs/${action.payload}`, headers)
        .map(responseData => {
          if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          if (responseData.response.success === false) {
            return {
              type: constants.ADMIN_DELETE_BLOG_ERROR,
              payload: responseData.response.message
            };
          }

          return {
            type: constants.ADMIN_DELETE_BLOG_SUCCESS,
            payload: responseData.response.blogs
          };
        })
        .catch(error => ({
          type: constants.ADMIN_DELETE_BLOG_ERROR,
          payload: error
        }))
    });
};

export const addBlogEpic = action$ => {
  return action$.ofType(constants.ADMIN_ADD_BLOG)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax({
          url: `${apiUrl}/admin/blogs`,
          body: action.payload,
          headers: headers,
          method: 'POST',
          responseType: 'json'
        })
        .map(responseData => {
          if (responseData.response.success === false && responseData.response.reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          if (responseData.response.success === false) {
            return {
              type: constants.ADMIN_ADD_BLOG_ERROR,
              payload: responseData.response.reason
            };
          }

          return {
            type: constants.ADMIN_ADD_BLOG_SUCCESS,
            payload: responseData.response.blog
          };
        })
        .catch(error => ({
          type: constants.ADMIN_ADD_BLOG_ERROR,
          payload: error
        }))
    });
};

export const blogRefreshEpic = action$ => {
  return action$.ofType(constants.ADMIN_BLOG_REFRESH)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax({
          url: `${apiUrl}/admin/blogs/${action.payload}/refresh`,
          headers: headers,
          method: 'POST',
          responseType: 'json'
        })
        .map(responseData => ({
          type: constants.ADMIN_BLOG_REFRESH_SUCCESS
        }))
        .catch(error => ({
          type: constants.ADMIN_BLOG_REFRESH_ERROR,
          payload: error
        }))
    });
};

export const slugRefreshEpic = action$ => {
  return action$.ofType(constants.ADMIN_SLUG_REFRESH)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax({
          url: `${apiUrl}/admin/articles/refresh`,
          headers: headers,
          method: 'POST',
          responseType: 'json'
        })
        .map(responseData => ({
          type: constants.ADMIN_SLUG_REFRESH_SUCCESS
        }))
        .catch(error => ({
          type: constants.ADMIN_SLUG_REFRESH_ERROR
        }))
    });
};

export const faviconRefreshEpic = action$ => {
  return action$.ofType(constants.ADMIN_FAVICON_REFRESH)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax({
          url: `${apiUrl}/admin/blogs/refresh`,
          headers: headers,
          method: 'POST',
          responseType: 'json'
        })
        .map(responseData => ({
          type: constants.ADMIN_FAVICON_REFRESH_SUCCESS
        }))
        .catch(error => ({
          type: constants.ADMIN_FAVICON_REFRESH_ERROR
        }))
    });
};
