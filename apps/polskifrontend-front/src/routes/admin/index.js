import React from 'react';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/admin',
  children: [
    {
      path: '/',
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
    },
    {
      path: '/news',
      async action(context) {
        const state = context.store.getState().adminState;
        const token = loginHelper.getLoginToken();
        if ((state.tokenExpired === false && token && token.length > 0) === false) {
          return { redirect: '/login' };
        }

        const News = await require.ensure([], require => require('./News').default, 'news');

        return {
          title: 'Panel kontrolny - aktualności | Polski Front-End',
          component: <LayoutAdmin><News /></LayoutAdmin>
        };
      }
    }
  ]
};
