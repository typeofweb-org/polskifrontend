import type Hapi from '@hapi/hapi';

import { updateFeeds } from './functions';

export const FeedPlugin: Hapi.Plugin<never> = {
  multiple: false,
  name: 'feed',
  version: '1.0.0',
  register(server) {
    server.route({
      method: 'PATCH',
      path: '/update',
      options: {
        tags: ['api', 'feed'],
        auth: false,
      },
      async handler() {
        await updateFeeds();
        return null;
      },
    });
  },
};
