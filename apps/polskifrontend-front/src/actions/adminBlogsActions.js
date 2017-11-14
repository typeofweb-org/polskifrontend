import * as constants from '../constants';

export function getAdminBlogList() {
  return {
    type: constants.ADMIN_GET_BLOG_LIST
  };
}

export function deleteBlogRequest(blogId) {
  return {
    type: constants.ADMIN_DELETE_BLOG_REQUEST,
    payload: blogId
  };
}

export function deleteBlogRequestCancel() {
  return {
    type: constants.ADMIN_DELETE_BLOG_REQUEST_CANCEL
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
  };
}

export function newBlogUrlChanged(newUrl) {
  return {
    type: constants.ADMIN_NEW_BLOG_URL_CHANGED,
    payload: newUrl
  };
}

export function newBlogRssChanged(newRss) {
  return {
    type: constants.ADMIN_NEW_BLOG_RSS_CHANGED,
    payload: newRss
  };
}

export function addBlog(data) {
  return {
    type: constants.ADMIN_ADD_BLOG,
    payload: data
  };
}

export function refreshBlog(id) {
  return {
    type: constants.ADMIN_BLOG_REFRESH,
    payload: id
  };
}

export function refreshSlug() {
  return {
    type: constants.ADMIN_SLUG_REFRESH
  };
}

export function refreshFavicons() {
  return {
    type: constants.ADMIN_FAVICON_REFRESH
  };
}
