import * as constants from '../constants';
import _ from 'lodash';

const initialState = {
  blogList: [],
  blogListLoading: false,
  blogListError: false,
  articlesLoading: false,
  articlesError: false
};

export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case constants.HOME_GET_BLOG_LIST:
      return { ...state, blogListLoading: true };
    case constants.HOME_GET_BLOG_LIST_SUCCESS:
      return { ...state, blogList: action.payload, blogListLoading: false };
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
      return { ...state, articlesLoading: false, articlesError: true }
  }

  return state
}
