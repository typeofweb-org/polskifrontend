// https://github.com/vercel/next.js/blob/db329fe9b0e13a389a84cb98fd936e8a671ba8ec/examples/with-sentry/utils/sentry.js
import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';

export const initSentry = () => {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const integrations = [];
    if (process.env.NEXT_IS_SERVER === 'true' && process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR) {
      // For Node.js, rewrite Error.stack to use relative paths, so that source
      // maps starting with ~/_next map to files in Error.stack with path
      // app:///_next
      integrations.push(
        new RewriteFrames({
          iteratee: (frame) => {
            frame.filename = frame.filename?.replace(
              process.env.NEXT_PUBLIC_SENTRY_SERVER_ROOT_DIR!,
              'app:///',
            );
            frame.filename = frame.filename?.replace('.next', '_next');
            return frame;
          },
        }),
      );
      integrations.push(new Sentry.Integrations.Http({ tracing: true }));
    }
    if (process.env.NEXT_IS_SERVER !== 'true') {
      integrations.push(new Integrations.BrowserTracing());
    }

    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      integrations,
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      release: process.env.NEXT_PUBLIC_COMMIT_SHA,
      tracesSampleRate: 1.0,
    });
  }
};
