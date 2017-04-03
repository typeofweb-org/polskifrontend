import React from 'react';
import Layout from '../../components/Layout/Layout';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/admin',
  async action() {
    if (!loginHelper.getLoginToken()) {
      return { redirect: '/login' };
    }

    const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

    return {
      title: 'Panel kontrolny | Polski Front-End',
      component: <Layout><Admin /></Layout>
    };
  }
};
