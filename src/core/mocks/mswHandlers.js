import { rest } from 'msw';

import seedHealth from './seed/seedHealth';
import seedPromotions from './seed/seedPosts';

const postsHandler = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(seedPromotions));
};

const healthHandler = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(seedHealth));
};

export default [
  rest.get('*/api/posts', postsHandler),
  rest.get('*/api/health', healthHandler),
  rest.get('http://my-json-server.typicode.com/typicode/demo/posts', postsHandler),
];
