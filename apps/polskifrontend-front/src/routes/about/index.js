import React from 'react';
import Layout from '../../components/Layout/Layout';
import About from './About';

export default {
  path: '/o-serwisie',
  async action(context) {
    const title = 'O serwisie | Polski Front-End';
    const description = 'Zastanawiasz się czym jest serwis Polski Front-End? Na tej stronie znajdziesz odpowiedź.';

    return {
      component: (
        <Layout>
          <About title={title} description={description} context={context} />
        </Layout>
      )
    };
  }
};
