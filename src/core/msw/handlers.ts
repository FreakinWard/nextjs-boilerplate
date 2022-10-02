import { rest } from 'msw';

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
  mockRequestGet('*/api/posts', seedPosts),
  mockRequestGet('*/api/health', seedHealth),
  mockRequestGet('https://my-json-server.typicode.com/typicode/demo/posts', seedPosts),
];
