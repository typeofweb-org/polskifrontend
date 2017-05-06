import React from 'react';
import isNode from 'detect-node';
import { decode } from 'he';
import Articles from './Articles';
import Layout from '../../components/Layout/Layout';
import getArticlesInitialState from '../../store/serverSideInitializers/articlesInitializer';
import * as constants from '../../constants';

export default {
  path: '/artykuly/:slug',
  async action(context) {
    const slug = context.params.slug;
    const state = context.store.getState().articlesState;

    if (state.articleLoaded === false && isNode) {
      // server side loading
      await getArticlesInitialState(slug, state);
    } else if (state.articleLoaded === false && isNode === false) {
      // client side loading
      context.store.dispatch({
        type: constants.ARTICLES_GET_ARTICLE
      });
    }

    return {
      title: `${state.article.title} | Polski Front-End`,
      description: state.article.description ? decode(state.article.description.replace(/(<([^>]+)>)/ig, '')) : '',
      component: <Layout><Articles /></Layout>
    };
  }
};
