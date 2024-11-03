import { rest } from 'msw';

import { SeedData, SeedRest } from '../../types';

const createRestDataResolver = (data: SeedData, statusCode = 200) => {
  return async (_req, res, ctx) => {
    return res(ctx.status(statusCode, data), ctx.json(data));
  };
};

const createErrorResolver = (mockedErrors: object[], statusCode: number) => {
  return (_req, res, ctx) => {
    return res(ctx.status(statusCode), ctx.errors(mockedErrors));
  };
};

/**
 * Returns a msw handler for a REST GET request
 *
 * [msw docs: Response Resolver](https://v1.mswjs.io/docs/basics/response-resolver#examples)
 *
 * @param seed - A seed containing the url and data for the mocked request.
 * @param statusCode - The status code to return for the mocked request.
 *
 * @returns A msw handler to mock a GET request.
 *
 * @example
 * mockRestGet(seedEntity);
 */
export const handleRestGet = <T>({ url, data }: SeedRest<T>, statusCode = 200) => {
  return rest.get(url, createRestDataResolver(data, statusCode));
};

/**
 * Returns a msw handler for a REST Post request
 *
 * [msw docs: Response Resolver](https://v1.mswjs.io/docs/basics/response-resolver#examples)
 *
 * @param seed - A seed containing the url and data for the mocked request.
 * @param statusCode - The status code to return for the mocked request.
 *
 * @returns A msw handler to mock a Post request.
 *
 * @example
 * handleRestPost(seedEntity);
 *
 */
export const handleRestPost = <T>({ url, data }: SeedRest<T>, statusCode = 200) => {
  return rest.post(url, createRestDataResolver(data, statusCode));
};

/**
 * Returns a msw handler for a REST Put request
 *
 * [msw docs: Response Resolver](https://v1.mswjs.io/docs/basics/response-resolver#examples)
 *
 * @param seed - A seed containing the url and data for the mocked request.
 * @param statusCode - The status code to return for the mocked request.
 * @returns A msw handler to mock a Post request.
 *
 * @example
 * handleRestPut(seedEntity);
 *
 */
export const handleRestPut = <T>({ url, data }: SeedRest<T>, statusCode = 200) => {
  return rest.put(url, createRestDataResolver(data, statusCode));
};

/**
 * Returns a msw handler for a REST Patch request
 *
 * [msw docs: Response Resolver](https://v1.mswjs.io/docs/basics/response-resolver#examples)
 *
 * @param seed - A seed containing the url and data for the mocked request.
 * @param statusCode - The status code to return for the mocked request.
 * @returns A msw handler to mock a Post request.
 *
 * @example
 * handleRestPatch(seedEntity);
 *
 */
export const handleRestPatch = <T>({ url, data }: SeedRest<T>, statusCode = 200) => {
  return rest.put(url, createRestDataResolver(data, statusCode));
};

/**
 * Returns a msw handler for an expected pass through request
 *
 * Use this when msw should not intercept a request
 *
 * [msw docs: Pass Through](https://v1.mswjs.io/docs/basics/response-resolver#conditional-response)
 *
 * @example
 *  mockPassThroughPost('*.svg')
 *  mockPassThroughGet('/_next/*')
 *
 * @returns A msw handler to allow a request to resolve without mocking.
 *
 */
export const mockPassThroughPost = (url: string) => rest.post(url, req => req.passthrough());

/**
 * Returns a msw handler for a REST GET error request
 *
 * [msw docs: Response Resolver](https://v1.mswjs.io/docs/basics/response-resolver#examples)
 *
 * @param url - A seed containing the url and data for the failed request.
 * @param mockErrors - The errors to mock for the failed request.
 * @param statusCode - The status code to return for the failed request.
 *
 * @returns A msw handler to mock a GET error request.
 *
 * @example
 * handleRestGetError(seedEntity);
 */
export const handleRestGetError = (url: string, mockErrors: object[], statusCode = 400) => {
  return rest.get(url, createErrorResolver(mockErrors, statusCode));
};

/**
 * Returns a msw handler for a REST POST error request.
 *
 * NOTE: Use `mockRestPostError` to mock errors within tests.
 *
 *
 * [msw docs: Response Resolver](https://v1.mswjs.io/docs/basics/response-resolver#examples)
 *
 *
 * @param url - A seed containing the url and data for the failed request.
 * @param mockErrors - The errors to mock for the failed request.
 * @param statusCode - The status code to return for the failed request.
 *
 * @returns A msw handler to mock a GET error request.
 *
 */
export const handleRestPostError = (url: string, mockErrors: object[], statusCode = 400) => {
  return rest.post(url, createErrorResolver(mockErrors, statusCode));
};
