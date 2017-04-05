import * as constants from '../constants';

export function resetAdminState() {
  return {
    type: constants.ADMIN_RESET_STATE
  }
}

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

export function newBlogNameChanged(newName) {
  return {
    type: constants.ADMIN_NEW_BLOG_NAME_CHANGED,
    payload: newName
  }
}

export function newBlogUrlChanged(newUrl) {
  return {
    type: constants.ADMIN_NEW_BLOG_URL_CHANGED,
    payload: newUrl
  }
}

export function newBlogRssChanged(newRss) {
  return {
    type: constants.ADMIN_NEW_BLOG_RSS_CHANGED,
    payload: newRss
  }
}

export function addBlog(data) {
  return {
    type: constants.ADMIN_ADD_BLOG,
    payload: data
  };
}
