import { rest } from 'msw';

import seedAsk from './seed/seedAsk';
import seedAuth from './seed/seedAuth';
import seedHealth from './seed/seedHealth';
import seedPosts from './seed/seedPosts';
import seedTranscribe from './seed/seedTranscribe';
import seedUserUpdate from './seed/seedUserUpdate';

const mockHandler = (statusText = null, statusCode = 200) => {
  return async (req, res, ctx) => {
    return res(ctx.status(statusCode, statusText), ctx.json(statusText));
  };
};

const mockRequestGet = (url, responseData, statusCode = 200) => {
  return rest.get(url, mockHandler(responseData, statusCode));
};

const mockRequestPost = (url, responseData, statusCode = 200) => {
  return rest.post(url, mockHandler(responseData, statusCode));
};

const mockRequestPut = (url, responseData, statusCode = 200) => {
  return rest.put(url, mockHandler(responseData, statusCode));
};

const mockPassThroughGet = url => rest.get(url, req => req.passthrough());
const mockPassThroughPost = url => rest.post(url, req => req.passthrough());

export default [
  // auth
  mockRequestGet('*/api/auth/session', seedAuth.session),
  mockRequestGet('*/api/auth/providers', seedAuth.providers),

  // app
  mockRequestGet(seedPosts.clientUrl, seedPosts.data),
  mockRequestGet(seedPosts.serverUrl, seedPosts.data),
  mockRequestGet(seedHealth.clientUrl, seedHealth.data),
  mockRequestPost(seedTranscribe.clientUrl, seedTranscribe.data),
  mockRequestPost(seedAsk.clientUrl, seedAsk.data),

  mockPassThroughPost('*/api/speechToText'),
  mockPassThroughPost('https://api.openai.com/v1/audio/transcriptions'),

  // user updates
  mockRequestPut(seedUserUpdate.serverUrl, seedUserUpdate.responseData),

  // nextjs dev
  mockPassThroughGet('/_next/static/*'),
  mockPassThroughGet('/favicon.ico'),
  mockPassThroughGet('/*.svg'),
];
