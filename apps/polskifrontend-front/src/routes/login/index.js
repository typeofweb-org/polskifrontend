import React from 'react';
import Login from './Login';
import Layout from '../../components/Layout/Layout';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/login',
  async action(context) {
    context.store.getState().adminState.tokenExpired = false;
    loginHelper.clearLoginToken();

    return {
      title: 'Zaloguj | Polski Front-End',
      component: <Layout><Login routing={context} /></Layout>
    };
  }
};
