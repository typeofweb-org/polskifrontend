import React from 'react';
import Login from './Login';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

export default {

  path: '/login',

  async action() {

    const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

    return {
      title: 'Zaloguj | Polski Front-End',
      component: <Layout><ConnectedLogin /></Layout>
    };
  }
};
