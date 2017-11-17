import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import * as loginHelper from '../core/helpers/loginHelper';
import * as validators from '../core/helpers/validators';
import _ from 'lodash';
import 'rxjs/add/observable/of';
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
          const { success, reason, blogs } = responseData.response;
          if (success === false && reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          return {
            type: constants.ADMIN_GET_BLOG_LIST_SUCCESS,
            payload: {
              blogs
            }
          };
        })
        .catch(error => ({
          type: constants.ADMIN_GET_BLOG_LIST_ERROR,
          payload: {
            error
          }
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

      return ajax.delete(`${apiUrl}/admin/blogs/${action.payload.blogId}`, headers)
        .map(responseData => {
          const { success, reason, message, blogs } = responseData.response;
          if (success === false && reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          if (success === false) {
            return {
              type: constants.ADMIN_DELETE_BLOG_ERROR,
              payload: {
                message
              }
            };
          }

          return {
            type: constants.ADMIN_DELETE_BLOG_SUCCESS,
            payload: {
              blogs
            }
          };
        })
        .catch(error => ({
          type: constants.ADMIN_DELETE_BLOG_ERROR,
          payload: {
            error
          }
        }));
    });
};

export const newBlogNameChangedEpic = (action$) => {
  return action$.ofType(constants.ADMIN_NEW_BLOG_NAME_CHANGED)
    .mergeMap((action) => {
      const { newName } = action.payload;
      const isValid = validators.isRequired(newName);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.ADMIN_NEW_BLOG_NAME_CHANGED_VALID,
        payload: {
          newName,
          isValid
        }
      });
    });
};

export const newBlogUrlChangedEpic = (action$) => {
  return action$.ofType(constants.ADMIN_NEW_BLOG_URL_CHANGED)
    .mergeMap((action) => {
      const { newUrl } = action.payload;
      const isValid = validators.isUrlValidWithProtocol(newUrl);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.ADMIN_NEW_BLOG_URL_CHANGED_VALID,
        payload: {
          newUrl,
          isValid
        }
      });
    });
};

export const newBlogRssChangedEpic = (action$) => {
  return action$.ofType(constants.ADMIN_NEW_BLOG_RSS_CHANGED)
    .mergeMap((action) => {
      const { newRss } = action.payload;
      const isValid = validators.isUrlValidWithProtocol(newRss);

      return Observable.of({ // eslint-disable-line no-undef
        type: constants.ADMIN_NEW_BLOG_RSS_CHANGED_VALID,
        payload: {
          newRss,
          isValid
        }
      });
    });
};

export const addBlogEpic = (action$, { getState }) => {
  return action$.ofType(constants.ADMIN_ADD_BLOG)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax({
          url: `${apiUrl}/admin/blogs`,
          body: action.payload.data,
          headers: headers,
          method: 'POST',
          responseType: 'json'
        })
        .map(responseData => {
          const { success, reason, blog } = responseData.response;
          if (success === false && reason === 'bad-token') {
            return {
              type: constants.ADMIN_TOKEN_EXPIRED
            };
          }

          if (responseData.response.success === false) {
            let message;
            switch (reason) {
              case 'rss-invalid':
                message = 'Podany adres RSS jest nie prawidłowy';
                break;
              case 'cant-add':
                message = 'Próba dodania bloga zakończona niepowodzeniem';
                break;
              case 'slug-exists':
                message = 'Blog o tej nazwie już istnieje';
                break;
              default:
                message = 'Nieokreślony błąd...';
                break;
            }

            return {
              type: constants.ADMIN_ADD_BLOG_ERROR,
              payload: {
                message
              }
            };
          }

          const state = getState().adminBlogsState;
          const currentBlogList = _.cloneDeep(state.blogList);
          currentBlogList.push(blog);

          return {
            type: constants.ADMIN_ADD_BLOG_SUCCESS,
            payload: {
              blogs: currentBlogList
            }
          };
        })
        .catch(error => ({
          type: constants.ADMIN_ADD_BLOG_ERROR,
          payload: {
            error
          }
        }));
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
          url: `${apiUrl}/admin/blogs/${action.payload.blogId}/refresh`,
          headers: headers,
          method: 'POST',
          responseType: 'json'
        })
        .map(responseData => ({
          type: constants.ADMIN_BLOG_REFRESH_SUCCESS
        }))
        .catch(error => ({
          type: constants.ADMIN_BLOG_REFRESH_ERROR,
          payload: { error }
        }));
    });
};

export const slugRefreshEpic = action$ => {
  return action$.ofType(constants.ADMIN_SLUG_REFRESH)
    .mergeMap(() => {
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
        .catch((error) => ({
          type: constants.ADMIN_SLUG_REFRESH_ERROR,
          payload: { error }
        }));
    });
};

export const faviconRefreshEpic = action$ => {
  return action$.ofType(constants.ADMIN_FAVICON_REFRESH)
    .mergeMap(() => {
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
        .catch((error) => ({
          type: constants.ADMIN_FAVICON_REFRESH_ERROR,
          payload: { error }
        }));
    });
};
