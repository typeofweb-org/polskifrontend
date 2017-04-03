import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/',
  async action() {
    return {
      title: 'Strona główna | Polski Front-End',
      component: <Layout><Home /></Layout>
    };
  }
};
