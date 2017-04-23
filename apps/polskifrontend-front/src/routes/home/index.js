import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/',
  async action() {
    return {
      title: 'Polski Front-End',
      description: 'Polski Front-End to serwisy i blogi na temat front-endu w jednym miejscu, tylko po polsku. Coś dla każdego web developera!',
      component: <Layout><Home /></Layout>
    };
  }
};
