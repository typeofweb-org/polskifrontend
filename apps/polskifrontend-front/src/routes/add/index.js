import React from 'react';
import Add from './Add';
import Layout from '../../components/Layout/Layout';
import { connect } from 'react-redux';
import mapStateToProps from '../../core/redux/mapStateToProps';
import mapDispatchToProps from '../../core/redux/mapDispatchToProps';

export default {

  path: '/add',

  async action() {

    const ConnectedAdd = connect(mapStateToProps, mapDispatchToProps)(Add);

    return {
      title: 'Dodaj stronę | Polski Front-End',
      component: <Layout><ConnectedAdd /></Layout>
    };
  }
};
