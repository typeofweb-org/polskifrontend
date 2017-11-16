import React from 'react';
import isNode from 'detect-node';
import Articles from './Articles';
import Layout from '../../components/Layout/Layout';
import getArticlesInitialState from '../../store/serverSideInitializers/articlesInitializer';
import * as actions from '../../actions/articlesActions';

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
      context.store.dispatch(actions.articlesGetArticle(slug));
    }

    return {
      component: <Layout><Articles context={context} /></Layout>
    };
  }
};
