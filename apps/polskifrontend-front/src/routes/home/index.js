import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout/Layout';

export default {
  path: '/',
  async action(context) {
    const title = 'Polski Front-End';
    const description = 'Polski Front-End to serwisy i blogi na temat front-endu w jednym miejscu, tylko po polsku. Coś dla każdego web developera!';

    return {
      component: <Layout><Home description={description} title={title} context={context} /></Layout>
    };
  }
};
