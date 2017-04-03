import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import * as loginHelper from '../../core/helpers/loginHelper';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

export default {
  path: '/add',
  async action() {
    if (!loginHelper.getLoginToken()) {
      return { redirect: '/login' };
    }

    const Add = await require.ensure([], require => require('./Add').default, 'add');
    const ConnectedAdd = connect(mapStateToProps, mapDispatchToProps)(Add);

    return {
      title: 'Dodaj stronę | Polski Front-End',
      component: <Layout><ConnectedAdd /></Layout>
    };
  }
};
