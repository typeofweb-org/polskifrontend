import React from 'react';
import BlogSubmit from './BlogSubmit';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/blog-submit',
  async action() {
    return {
      title: 'Zgłoś serwis | Polski Front-End',
      description: 'Jeśli znasz polski serwis lub blog o front-endzie - zgłoś go tutaj!',
      component: <Layout><BlogSubmit /></Layout>
    };
  }
};
