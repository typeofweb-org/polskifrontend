import React from 'react';
import Feedback from './Feedback';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/zglos-uwagi',
  async action() {
    return {
      title: 'Zgłoś uwagi | Polski Front-End',
      description: 'Jeśli masz jakiekolwiek uwagi dotyczące działania tego serwisu - zgłoś je tutaj!',
      component: <Layout><Feedback /></Layout>
    };
  }
};
