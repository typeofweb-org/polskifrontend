import * as constants from '../constants';

export function getAdminBlogList() {
  return {
    type: constants.ADMIN_GET_BLOG_LIST
  };
}
