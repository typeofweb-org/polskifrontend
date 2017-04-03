import * as constants from '../constants';
import { ajax } from 'rxjs/observable/dom/ajax';
import { apiUrl } from '../config';
import * as loginHelper from '../core/helpers/loginHelper';

export const getAdminBlogListEpic = action$ => {
  return action$.ofType(constants.ADMIN_GET_BLOG_LIST)
    .mergeMap(action => {
      const headers = {
        'authorization': 'Basic YnVyY3p1OmFiY2RmcmJrMzQwMzQxZmRzZnZkcw==',
        'x-access-token': loginHelper.getLoginToken()
      };

      return ajax.getJSON(`${apiUrl}/admin/blogs`, headers)
        .map(response => ({
          type: constants.ADMIN_GET_BLOG_LIST_SUCCESS,
          payload: response.blogs
        }))
        .catch(error => ({
          type: constants.ADMIN_GET_BLOG_LIST_ERROR,
          payload: error
        }))
    });
};
