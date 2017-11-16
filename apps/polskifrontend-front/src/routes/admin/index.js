import React from 'react';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/admin',
  children: [
    {
      path: '',
      async action(context) {
        const state = context.store.getState().adminState;
        const token = loginHelper.getLoginToken();
        if ((state.tokenExpired === false && token && token.length > 0) === false) {
          return { redirect: '/login' };
        }

        const Admin = await require.ensure([], require => require('./Admin').default, 'admin');

        const title = 'Panel kontrolny | Polski Front-End';
        const description = 'Panel kontrolny serwisu Polski Front-End';

        return {
          component: <LayoutAdmin><Admin context={context} description={description} title={title} /></LayoutAdmin>
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

        const title = 'Panel kontrolny - aktualności | Polski Front-End';
        const description = 'Strona aktualności panelu kontrolnego serwisu Polski Front-End';

        return {
          component: <LayoutAdmin><News context={context} description={description} title={title} /></LayoutAdmin>
        };
      }
    }
  ]
};
