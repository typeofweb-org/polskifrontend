import { getPublicUrlFromRequest, mswMockServer } from './jest-utils';

beforeAll(() => {
  mswMockServer.listen({
    onUnhandledRequest: (request) => {
      const publicUrl = getPublicUrlFromRequest(request);
      const message = `captured a ${
        request.method
      } ${request.url.toString()} request without a corresponding request handler.
If you wish to intercept this request, consider creating a request handler for it:
rest.${request.method.toLowerCase()}('${publicUrl}', (req, res, ctx) => {
  return res(ctx.text('body'))
})`;
      fail(message);
    },
  });
});

afterEach(() => {
  mswMockServer.resetHandlers();
});

afterAll(() => {
  mswMockServer.close();
});
