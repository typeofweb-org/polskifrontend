import React from 'react';
import BlogSubmit from './BlogSubmit';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/zglos-serwis',
  async action() {
    return {
      title: 'Zgłoś serwis | Polski Front-End',
      description: 'Jeśli znasz polski serwis, stronę lub blog o front-endzie - zgłoś go tutaj!',
      component: <Layout><BlogSubmit /></Layout>
    };
  }
};
