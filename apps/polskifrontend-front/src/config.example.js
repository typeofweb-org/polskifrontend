/* eslint-disable max-len, no-undef */
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const analytics = {
  // https://analytics.google.com/
  google: {
    trackingId: 'UA-XXXXXXXX-X' // UA-XXXXX-X
  }
};

const api = {
  dev: {
    url: 'http://localhost:port'
  },
  prod: {
    url: 'http://example.remote.srv'
  }
};

export const apiUrl = __DEV__ ? api.dev.url : api.prod.url;
