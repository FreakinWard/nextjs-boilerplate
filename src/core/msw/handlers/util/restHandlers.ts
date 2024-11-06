import { rest } from 'msw';

import { HandleErrorOptions, SeedData, SeedRest } from '../../types';

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
 * Returns a msw handler for an expected pass through request
 *
 * Use this when msw should not intercept a request
 *
 * [msw docs: Pass Through](https://v1.mswjs.io/docs/basics/response-resolver#conditional-response)
 *
 * @example
 *  handlePassThroughGet('*.svg')
 *  handlePassThroughGet('/_next/*')
 *
 * @returns A msw handler to allow a request to resolve without mocking.
 *
 */
export const handlePassThroughGet = (url: string) => rest.get(url, req => req.passthrough());

/**
 * Returns a msw handler for an expected pass through request
 *
 * Use this when msw should not intercept a request
 *
 * [msw docs: Pass Through](https://v1.mswjs.io/docs/basics/response-resolver#conditional-response)
 *
 * @example
 *  handlePassThroughPost('/track/*')
 *
 * @returns A msw handler to allow a request to resolve without mocking.
 *
 */
export const handlePassThroughPost = (url: string) => rest.post(url, req => req.passthrough());

/**
 * Returns a msw handler for a REST error request.
 *
 * NOTE: Use `mockRestError` to mock errors within tests.
 *
 *
 * [msw docs: Response Resolver](https://v1.mswjs.io/docs/basics/response-resolver#examples)
 *
 *
 * @param url - A seed containing the url and data for the failed request.
 * @param mockErrors - The errors to mock for the failed request.
 * @param options - Options to configure the request.
 *
 * @returns A msw handler to mock a GET error request.
 *
 */
export const handleRestError = (
  url: string,
  mockErrors: object[],
  options?: HandleErrorOptions
) => {
  const statusCode = options?.statusCode ?? 400;

  const resolver = createErrorResolver(mockErrors, statusCode);

  switch (options?.method) {
    case 'GET':
      return rest.get(url, resolver);
    case 'POST':
      return rest.post(url, resolver);
    case 'PUT':
      return rest.put(url, resolver);
    case 'PATCH':
      return rest.patch(url, resolver);
    default:
      return rest.get(url, resolver);
  }
};
