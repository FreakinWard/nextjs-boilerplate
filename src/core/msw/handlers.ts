import { rest } from 'msw';

import { PostType } from '../../app/api/posts/route';
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

const mockPassThrough = (url: string) => {
  return rest.get(url, req => req.passthrough());
};

export default [
  // auth
  mockRequestGet('*/api/auth/session', seedAuth.session),
  mockRequestGet('*/api/auth/providers', seedAuth.providers),

  // app
  mockRequestGet(seedHealth.clientUrl, seedHealth.data),
  mockRequestGet(seedPosts.clientUrl, seedPosts.data),
  mockRequestGet(seedPosts.serverUrl, seedPosts.data),

  // rest.get<string[]>(`${host}/api/keywords`, (_req, res, ctx) => {
  //   return res(ctx.json<string[]>(['mock', 'keywords', 'IE', 'not real']));
  // }),

  // rest.get<string[]>(seedPosts.clientUrl, (_req, res, ctx) => {
  //   return res(ctx.json<PostType[]>(seedPosts.data));
  // }),
  // rest.get<string[]>(seedPosts.serverUrl, (_req, res, ctx) => {
  //   return res(ctx.json<PostType[]>(seedPosts.data));
  // }),

  // mockPassThrough('*/'),
];
