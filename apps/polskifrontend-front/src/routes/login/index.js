import React from 'react';
import Login from './Login';
import LayoutAdmin from '../../components/Layout/LayoutAdmin';
import * as loginHelper from '../../core/helpers/loginHelper';

export default {
  path: '/login',
  async action(context) {
    context.store.getState().adminState.tokenExpired = false;
    loginHelper.clearLoginToken();

    const title = 'Zaloguj | Polski Front-End';
    const description = 'Strona logowania do panelu administracyjnego serwisu Polski Front-End';

    return {
      component: <LayoutAdmin><Login context={context} description={description} title={title} /></LayoutAdmin>
    };
  }
};
