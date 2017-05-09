import React from 'react';
import BlogSubmit from './BlogSubmit';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/zglos-serwis',
  async action(context) {
    const title = 'Zgłoś serwis | Polski Front-End';
    const description = 'Jeśli znasz polski serwis, stronę lub blog o front-endzie - zgłoś go tutaj!';

    return {
      component: (
        <Layout>
          <BlogSubmit title={title} description={description} context={context} />
        </Layout>
      )
    };
  }
};
