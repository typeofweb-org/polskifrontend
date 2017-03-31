import React from 'react';
import Home from './Home';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

export default {

  path: '/',

  async action() {

    const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);

    return {
      title: 'Polski Front-End',
      component: <Layout><ConnectedHome /></Layout>
    };
  }
};
