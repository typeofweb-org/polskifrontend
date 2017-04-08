/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: 'UA-35451047-5', // UA-XXXXX-X
  },
};

const api = {
  dev: {
    url: 'http://localhost:8880'
  },
  prod: {
    url: 'https://polskifrontend-back.herokuapp.com'
  }
};

export const apiUrl = __DEV__ ? api.dev.url : api.prod.url;
