import React from 'react';
import Feedback from './Feedback';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/zglos-uwagi',
  async action(context) {
    const title = 'Zgłoś uwagi | Polski Front-End';
    const description = 'Jeśli masz jakiekolwiek uwagi dotyczące działania tego serwisu - zgłoś je tutaj!';

    return {
      component: <Layout><Feedback context={context} description={description} title={title} /></Layout>
    };
  }
};
