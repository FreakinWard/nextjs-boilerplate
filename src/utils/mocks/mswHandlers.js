import { rest } from 'msw';

import seedPromotions from './seed/seedPosts';

const postsHandler = (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(seedPromotions));
};

export default [rest.get('*/api/posts', postsHandler)];
