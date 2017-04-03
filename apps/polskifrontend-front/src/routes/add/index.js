import React from 'react';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

export default {

  path: '/add',

  async action() {
    if (!cookie.get('pl_front_user')) {
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
