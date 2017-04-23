import React from 'react';
import News from './News';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/aktualnosci',
  async action() {
    return {
      title: 'Aktualności | Polski Front-End',
      description: 'Akrualności dotyczące serwisu Polski Front-End - dowiedz się, co nowego!',
      component: <Layout><News /></Layout>
    };
  }
};
