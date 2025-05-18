import { rest } from 'msw';

import { server } from './server';

// eslint-disable-next-line import/prefer-default-export
export const mockHttpPutError = (url: string, error?: { status?: number; message?: string }) => {
  // hide the expected console error when the http request fails
  jest.spyOn(console, 'error').mockImplementation();

  const status = error?.status || 500;
  const message = error?.message || 'Mocked Server Error';

  server.use(rest.put(url, (_req, res, ctx) => res(ctx.status(status), ctx.json({ message }))));
};
