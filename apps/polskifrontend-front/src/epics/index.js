import { combineEpics } from 'redux-observable';
import {
  getBlogListEpic,
  getBlogListRequestEpic,
  switchToListViewEpic,
  switchToListViewRequestEpic,
  addLinkToClickedEpic } from './home';
import {
  userChangeEpic,
  passwordChangeEpic,
  loginEpic } from './login';
import {
  getAdminBlogListEpic,
  deleteBlogEpic,
  addBlogEpic,
  blogRefreshEpic,
  slugRefreshEpic,
  faviconRefreshEpic,
  newBlogNameChangedEpic,
  newBlogUrlChangedEpic,
  newBlogRssChangedEpic } from './adminBlogs';
import {
  getAdminNewsListEpic,
  addNewsEpic,
  deleteAdminNewsEpic } from './adminNews';
import {
  urlChangedEpic,
  emailChangedEpic,
  sendBlogRequestEpic } from './submit';
import {
  feedbackTextChangedEpic,
  feedbackEmailChangedEpic,
  sendFeedbackEpic } from './feedback';
import { getNewsPageEpic } from './news';
import { articlesGetArticleEpic } from './articles';

const rootEpic = combineEpics(
  getBlogListEpic,
  getBlogListRequestEpic,
  switchToListViewEpic,
  switchToListViewRequestEpic,
  addLinkToClickedEpic,
  userChangeEpic,
  passwordChangeEpic,
  loginEpic,
  getAdminBlogListEpic,
  deleteBlogEpic,
  addBlogEpic,
  blogRefreshEpic,
  slugRefreshEpic,
  faviconRefreshEpic,
  newBlogNameChangedEpic,
  newBlogUrlChangedEpic,
  newBlogRssChangedEpic,
  urlChangedEpic,
  emailChangedEpic,
  sendBlogRequestEpic,
  feedbackTextChangedEpic,
  feedbackEmailChangedEpic,
  sendFeedbackEpic,
  getAdminNewsListEpic,
  addNewsEpic,
  deleteAdminNewsEpic,
  getNewsPageEpic,
  articlesGetArticleEpic
);

export default rootEpic;
