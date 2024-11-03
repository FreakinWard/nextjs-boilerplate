import {
  handleGraphqlMutationError,
  handleGraphqlQuery,
  handleGraphqlQueryError,
} from '../handlers/util/graphqlHandlers';
import { server } from '../server';
import { SeedGraphQL } from '../types';

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
 *  mockGraphqlRequest(seedEntity);
 *
 * @example Within a test
 * it('should return error when request fails', () => {
 *    // arrange
 *    const data = { isGoodStanding: false };
 *    const seedData = {
 *      ...seedEntity,
 *      graphQLResponse: { Entity: data },
 *    };
 *
 *    mockGraphqlRequest(seedData);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.data).toEqual(data);
 *  });
 *
 */
export const mockGraphqlQuery = (seed: SeedGraphQL<unknown, unknown>) => {
  server.use(handleGraphqlQuery(seed));
};

/**
 * Use within your tests to mock a graphql mutation
 *
 * @param seed The seed data for the request
 *
 * @example
 *  mockGraphqlMutation(seedEntity);
 *
 * @example Within a test
 * it('should return error when request fails', () => {
 *    // arrange
 *    const data = { isGoodStanding: false };
 *    const seedData = {
 *      ...seedEntity,
 *      graphQLResponse: { Entity: data },
 *    };
 *
 *    mockGraphqlMutation(seedData);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.data).toEqual(data);
 *  });
 *
 */
export const mockGraphqlMutation = (seed: SeedGraphQL<unknown, unknown>) => {
  server.use(handleGraphqlQuery(seed));
};

/**
 * This method is used to mock graphql query errors within tests.
 *
 * @param queryName
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
 * it('should return error when request fails', () => {
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
export const mockGraphqlQueryError = (queryName: string, error?: object) => {
  // hide the expected console error when the http request fails
  jest.spyOn(console, 'error').mockImplementation();

  const mockErrors = [error ?? genericError];

  server.use(handleGraphqlQueryError(queryName, mockErrors));
};

/**
 * Use within your tests to mock graphql mutation errors
 * @param mutationName
 * @param error
 * @example With generic error
 *  mockGraphqlMutationError(seedEntity.queryName);
 *
 * @example With custom error
 *  const customError = { message: custom error message' };
 *
 *  mockGraphqlMutationError(seedEntity.queryName, customError);
 *
 * @example Within a test
 * it('should return error when request fails', () => {
 *    // arrange
 *    const customError = { message: 'custom error message' };
 *    mockGraphqlMutationError(seedEntity.mutationName, customError);
 *
 *    // act
 *    const result = renderHook(() => useMyEntity());
 *
 *    // assert
 *    expect(result.error).toEqual(customError);
 *  });
 *
 */
export const mockGraphqlMutationError = (mutationName: string, error?: object) => {
  // hide the expected console error when the http request fails
  jest.spyOn(console, 'error').mockImplementation();

  const mockErrors = [error ?? genericError];

  server.use(handleGraphqlMutationError(mutationName, mockErrors));
};
