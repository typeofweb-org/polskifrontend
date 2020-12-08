import type { MockedRequest } from 'msw';
import { setupServer } from 'msw/node';

export const getPublicUrlFromRequest = (request: MockedRequest) => {
  const { protocol, host, pathname, origin } = request.url;
  return request.referrer.startsWith(origin) ? pathname : `${protocol}://${host}${pathname}`;
};

export const mswMockServer = setupServer();
