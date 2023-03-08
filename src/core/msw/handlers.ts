import { rest } from 'msw';

import seedAuth from './seed/seedAuth';
import seedHealth from './seed/seedHealth';
import seedPosts from './seed/seedPosts';

const mockHandler = (statusText = null, statusCode = 200) => {
  return async (req, res, ctx) => {
    return res(ctx.status(statusCode, statusText), ctx.json(statusText));
  };
};

const mockRequestGet = (url, responseData, statusCode = 200) => {
  return rest.get(url, mockHandler(responseData, statusCode));
};

export default [
  // auth
  mockRequestGet('*/api/auth/session', seedAuth.session),
  mockRequestGet('*/api/auth/providers', seedAuth.providers),

  // app
  mockRequestGet(seedPosts.clientUrl, seedPosts.data),
  mockRequestGet(seedPosts.serverUrl, seedPosts.data),
  mockRequestGet(seedHealth.clientUrl, seedHealth.data),
];
