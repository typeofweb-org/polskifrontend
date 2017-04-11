import * as constants from '../constants';
import _ from 'lodash';
import * as settingsHelper from '../core/helpers/settingsHelper';

export const initialState = {
  blogList: [],
  blogListNextPage: 1,
  blogListLoading: false,
  blogListError: false,
  articlesLoading: false,
  articlesError: false,
  blogProposalUrl: '',
  blogProposalUrlValid: true,

  allArticlesList: [],
  allArticlesNextPage: 1,
  allArticlesListLoading: false,
  allArticlesListError: false,

  isListOptionSelected: false,
  isTilesOptionSelected: true,

  clickedLinks: []
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.HOME_GET_BLOG_LIST:
      return { ...state, blogListLoading: true, blogList: action.payload === 1 ? [] : state.blogList, blogListError: false };
    case constants.HOME_GET_BLOG_LIST_SUCCESS:
      const newBlogList = _.cloneDeep(state.blogList);
      newBlogList.push(...action.payload.blogs);

      // store this setting in cookie
      const tilesSettings = settingsHelper.getSettings();
      tilesSettings.tiles = true;
      settingsHelper.saveSettings(tilesSettings);

      return { ...state, blogList: newBlogList, blogListNextPage: action.payload.nextPage, blogListLoading: false, isTilesOptionSelected: true, isListOptionSelected: false };
    case constants.HOME_GET_BLOG_LIST_ERROR:
      return { ...state, blogListLoading: false, blogListError: true };
    case constants.HOME_GET_ARTICLES_FOR_BLOG:
      return { ...state, articlesLoading: true, articlesError: false };
    case constants.HOME_GET_ARTICLES_FOR_BLOG_SUCCESS:
      const blogListCopy = _.cloneDeep(state.blogList);
      const filteredList = _.filter(blogListCopy, item => item._id === action.payload.blogId);
      _.map(filteredList, item => item.articles = action.payload.articles || []);

      return { ...state, articlesLoading: false, blogList: blogListCopy };
    case constants.HOME_GET_ARTICLES_FOR_BLOG_ERROR:
      return { ...state, articlesLoading: false, articlesError: true };

    case constants.HOME_SWITCH_TO_LIST_VIEW:
      return { ...state, allArticlesListLoading: true, allArticlesList: action.payload === 1 ? [] : state.allArticlesList, allArticlesListError: false };
    case constants.HOME_SWITCH_TO_LIST_VIEW_SUCCESS:
      const newArticlesList = _.cloneDeep(state.allArticlesList);
      newArticlesList.push(...action.payload.articles);

      // store this setting in cookie
      const listSettings = settingsHelper.getSettings();
      listSettings.tiles = false;
      settingsHelper.saveSettings(listSettings);

      return { ...state, allArticlesList: newArticlesList, allArticlesNextPage: action.payload.nextPage, allArticlesListLoading: false, isTilesOptionSelected: false, isListOptionSelected: true };
    case constants.HOME_SWITCH_TO_LIST_VIEW_ERROR:
      return { ...state, allArticlesListLoading: false, allArticlesListError: true };

    case constants.HOME_ADD_LINK_TO_CLICKED:
      const links = _.cloneDeep(state.clickedLinks);
      links.push(action.payload);
      return { ...state, clickedLinks: links };
  }

  return state
}
