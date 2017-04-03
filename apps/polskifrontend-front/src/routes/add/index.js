import React from 'react';
import Layout from '../../components/Layout/Layout';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/add',
  async action() {
    if (!loginHelper.getLoginToken()) {
      return { redirect: '/login' };
    }

    const Add = await require.ensure([], require => require('./Add').default, 'add');

    return {
      title: 'Dodaj stronę | Polski Front-End',
      component: <Layout><Add /></Layout>
    };
  }
};
