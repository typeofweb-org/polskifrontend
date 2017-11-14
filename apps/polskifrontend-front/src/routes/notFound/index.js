/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout/Layout';
import NotFound from './NotFound';

const title = 'Nie znaleziono strony';
const description = 'Błąd 404 - strony, której szukasz nie znaleziono.';

export default {

  path: '(.*)',

  action(context) {
    return {
      component: <Layout><NotFound context={context} description={description} title={title} /></Layout>,
      status: 404
    };
  }

};
