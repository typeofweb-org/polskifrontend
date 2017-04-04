import * as constants from '../constants';

export function getAdminBlogList() {
  return {
    type: constants.ADMIN_GET_BLOG_LIST
  };
}

export function deleteBlog(blogId) {
  return {
    type: constants.ADMIN_DELETE_BLOG,
    payload: blogId
  };
}
