import React from 'react';
import Login from './Login';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/login',
  async action(context) {
    context.store.getState().adminState.tokenExpired = false;
    loginHelper.clearLoginToken();

    return {
      title: 'Zaloguj | Polski Front-End',
      component: <LayoutAdmin><Login routing={context} /></LayoutAdmin>
    };
  }
};
