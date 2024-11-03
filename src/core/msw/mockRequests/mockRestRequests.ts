import { handleRestGet, handleRestGetError, handleRestPost } from '../handlers/util/restHandlers';
import { server } from '../server';
import { SeedRest } from '../types';

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
 * This method is used to mock graphql query errors within tests.
 *
 * @param url
 * @param error
 *
 * @example With generic error
 *  mockGraphqlQueryError(seedEntity.queryName);
 *
 * @example With custom error
 *  const customError = { message: 'custom error message' };
 *  mockGraphqlQueryError(seedEntity.queryName, customError);
 *
 * @example Within a test
 * it('should return expected error when request fails', () => {
 *    // arrange
 *    const customError = { message: 'custom error message' };
 *    mockGraphqlQueryError(seedEntity.queryName, customError);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.error).toEqual(customError);
 *  });
 *
 */
export const mockRestGetError = (url: string, error?: object) => {
  // hide the expected console error when the http request fails
  jest.spyOn(console, 'error').mockImplementation();

  const mockErrors = [error ?? genericError];

  server.use(handleRestGetError(url, mockErrors));
};
/**
 * This method is used to mock graphql query errors within tests.
 *
 * @param url
 * @param error
 *
 * @example With generic error
 *  mockGraphqlQueryError(seedEntity.queryName);
 *
 * @example With custom error
 *  const customError = { message: 'custom error message' };
 *  mockGraphqlQueryError(seedEntity.queryName, customError);
 *
 * @example Within a test
 * it('should return expected error when request fails', () => {
 *    // arrange
 *    const customError = { message: 'custom error message' };
 *    mockGraphqlQueryError(seedEntity.queryName, customError);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.error).toEqual(customError);
 *  });
 *
 */
export const mockRestPostError = (url: string, error?: object) => {
  // hide the expected console error when the http request fails
  jest.spyOn(console, 'error').mockImplementation();

  const mockErrors = [error ?? genericError];

  server.use(handleRestGetError(url, mockErrors));
};
