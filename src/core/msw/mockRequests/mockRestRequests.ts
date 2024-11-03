import { handleRestError, handleRestGet, handleRestPost } from '../handlers/util/restHandlers';
import { server } from '../server';
import { HandleErrorOptions, SeedRest } from '../types';

export const genericError = {
  message: '400: Bad Request - mockGraphqlError',
  extensions: {
    response: {
      body: {
        detail: 'Mocked error message - mockGraphqlError',
      },
    },
  },
};

/**
 * Use within your tests to mock a graphql query
 *
 * @param seed The seed data for the request
 *
 * @example
 *  mockRestGet(seedEntity);
 *
 * @example Within a test
 * it('should return expected data when Entity is in good standing', () => {
 *    // arrange
 *    const data = { isGoodStanding: true };
 *    const seedWhenGoodStanding = {
 *      ...seedEntity,
 *      data,
 *    };
 *
 *    mockRestGet(seedWhenGoodStanding);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.data).toEqual(data);
 *  });
 *
 */
export const mockRestGet = (seed: SeedRest<unknown>) => {
  server.use(handleRestGet(seed));
};

/**
 * Use within your tests to mock a graphql mutation
 *
 * @param seed The seed data for the request
 *
 * @example
 *  mockRestPost(seedEntity);
 *
 * @example Within a test
 * it('should return expected data when Entity is in good standing', () => {
 *    // arrange
 *    const data = { isGoodStanding: true };
 *    const seedWhenGoodStanding = {
 *      ...seedEntity,
 *      data,
 *    };
 *
 *    mockRestPost(seedWhenGoodStanding);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.data).toEqual(data);
 *  });
 *
 */
export const mockRestPost = (seed: SeedRest<unknown>) => {
  server.use(handleRestPost(seed));
};

/**
 * This method is used to mock rest request errors within tests.
 *
 * @param url
 * @param options
 *
 * @example With generic error
 *  mockRestError(url);
 *
 * @example With custom error
 * const customError = { message: 'custom error message' };
 *
 * const errorOptions = {
 *    method: 'POST',
 *    error: customError,
 * };
 *
 * mockRestError(url, errorOptions);
 *
 * @example Within a test
 * it('should return expected error when request fails', () => {
 *    // arrange
 *    const customError = { message: 'custom error message' };
 *
 *    const errorOptions = {
 *      method: 'POST',
 *      error: customError,
 *    };
 *
 *    mockRestError(url, errorOptions);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.error).toEqual(customError);
 *  });
 *
 */
export const mockRestError = (url: string, options: HandleErrorOptions) => {
  // hide the expected console error when the http request fails
  jest.spyOn(console, 'error').mockImplementation();

  const mockErrors = [options.error ?? genericError];
  const method = options.method ?? 'GET';
  const statusCode = options.statusCode ?? 400;

  const errorOptions = {
    method,
    statusCode,
  };

  server.use(handleRestError(url, mockErrors, errorOptions));
};
