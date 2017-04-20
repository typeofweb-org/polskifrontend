import React from 'react';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/admin',
  async action(context) {
    const state = context.store.getState().adminState;
    const token = loginHelper.getLoginToken();
    if ((state.tokenExpired === false && token && token.length > 0) === false) {
      return { redirect: '/login' };
    }

    const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

    return {
      title: 'Panel kontrolny | Polski Front-End',
      component: <LayoutAdmin><Admin /></LayoutAdmin>
    };
  }
};
