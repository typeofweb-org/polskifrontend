import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/',
  async action() {
    return {
      title: 'Polski Front-End',
      description: 'Polskie serwisy i blogi na temat front-endu w jednym miejscu',
      component: <Layout><Home /></Layout>
    };
  }
};
