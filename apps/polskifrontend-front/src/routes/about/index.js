import React from 'react';
import Layout from '../../components/Layout/Layout';
import About from './About';

export default {
  path: '/o-serwisie',
  async action() {
    return {
      title: 'O serwisie | Polski Front-End',
      description: 'Zastanawiasz się czym jest serwis Polski Front-End? Na tej stronie znajdziesz odpowiedź.',
      component: <Layout><About /></Layout>
    };
  }
};
