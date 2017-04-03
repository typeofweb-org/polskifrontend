import React from 'react';
import Login from './Login';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/login',
  async action(context) {
    return {
      title: 'Zaloguj | Polski Front-End',
      component: <Layout><Login routing={context} /></Layout>
    };
  }
};
