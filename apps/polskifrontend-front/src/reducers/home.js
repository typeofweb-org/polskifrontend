import * as constants from '../constants';
import _ from 'lodash';

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
  isTilesOptionSelected: true
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.HOME_GET_BLOG_LIST:
      return { ...state, blogListLoading: true, blogList: action.payload === 1 ? [] : state.blogList };
    case constants.HOME_GET_BLOG_LIST_SUCCESS:
      const newBlogList = _.cloneDeep(state.blogList);
      newBlogList.push(...action.payload.blogs);
      return { ...state, blogList: newBlogList, blogListNextPage: action.payload.nextPage, blogListLoading: false, isTilesOptionSelected: true, isListOptionSelected: false };
    case constants.HOME_GET_BLOG_LIST_ERROR:
      return { ...state, blogListLoading: false, blogListError: true };
    case constants.HOME_GET_ARTICLES_FOR_BLOG:
      return { ...state, articlesLoading: true };
    case constants.HOME_GET_ARTICLES_FOR_BLOG_SUCCESS:
      const blogListCopy = _.cloneDeep(state.blogList);
      const filteredList = _.filter(blogListCopy, item => item._id === action.payload.blogId);
      _.map(filteredList, item => item.articles = action.payload.articles || []);

      return { ...state, articlesLoading: false, blogList: blogListCopy };
    case constants.HOME_GET_ARTICLES_FOR_BLOG_ERROR:
      return { ...state, articlesLoading: false, articlesError: true };

    case constants.HOME_SWITCH_TO_LIST_VIEW:
      return { ...state, allArticlesListLoading: true, allArticlesList: action.payload === 1 ? [] : state.allArticlesList };
    case constants.HOME_SWITCH_TO_LIST_VIEW_SUCCESS:
      const newArticlesList = _.cloneDeep(state.allArticlesList);
      newArticlesList.push(...action.payload.articles);
      return { ...state, allArticlesList: newArticlesList, allArticlesNextPage: action.payload.nextPage, allArticlesListLoading: false, isTilesOptionSelected: false, isListOptionSelected: true };
    case constants.HOME_SWITCH_TO_LIST_VIEW_ERROR:
      return { ...state, allArticlesListLoading: false, allArticlesListError: true };
  }

  return state
}
