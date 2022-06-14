import { rest } from 'msw';

import seedHealth from './seed/seedHealth';
import seedPosts from './seed/seedPosts';

const handler = (seedData = null) => {
  if (!seedData) return (req, res, ctx) => res(ctx.status(200));

  return (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(seedData));
  };
};

const uploadHandler = (req, res, ctx) => {
  return res(ctx.status(200));
};

export const browserHandlers = [rest.post('*/api/upload', uploadHandler)];

export const serverHandlers = [
  rest.get('*/api/health', handler(seedHealth)),
  rest.get('*/api/posts', handler(seedPosts)),
  rest.get('http://my-json-server.typicode.com/typicode/demo/posts', handler(seedPosts)),
];
