import React from 'react';
import ErrorPage from './ErrorPage';

export default {

  path: '/error',

  action(context) {
    const error = context.error;

    return {
      component: <ErrorPage error={error} title={error.name} description={error.message} context={context} />,
      status: error.status || 500
    };
  }
};
