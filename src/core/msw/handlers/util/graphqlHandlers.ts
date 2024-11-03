// @ts-nocheck
import { graphql, GraphQLHandler, GraphQLRequest, GraphQLVariables } from 'msw';

import { SeedGraphQL, SeedGraphQLDynamic, SeedGraphQLMutation } from '../../types';

type GraphqlHandler = GraphQLHandler<GraphQLRequest<GraphQLVariables>>;

// NOTE: This assumes we communicate with a single graphql resource.
export const graphqlUrl = '*/graphql';

const createGraphqlDataResolver = async (seed: SeedGraphQL) => {
  const responseData = seed.graphQLResponse;

  return (_req, res, ctx) => {
    return res(ctx.data(responseData));
  };
};

const createErrorResolver = async (mockedErrors: object[]) => {
  return (_req, res, ctx) => {
    return res(ctx.errors(mockedErrors));
  };
};

/**
 * Returns a msw handler for a graphql fetch request
 * @param seed seed data for the request
 * @param url the graphql resource url
 * @example
 *  handleGraphQL(seedMyEntityQuery),
 */
export const handleGraphqlQuery = (seed: SeedGraphQL, url = graphqlUrl) => {
  const resource = graphql.link(url);

  return resource.query(seed.queryName, createGraphqlDataResolver(seed));
};

/**
 * Returns a msw handler for a dynamic graphql fetch request
 *
 * Use this method when a request needs to return different data based on the request variables, like search queries.
 *
 * @param seed seed data for the request
 * @param url the graphql resource url.
 *
 * @example
 *  handleGraphQLDynamic(seedMyEntitySearchQuery),
 */
export const handleGraphQLDynamic = (seed: SeedGraphQLDynamic, url = graphqlUrl) => {
  const resource = graphql.link(url);

  const dynamicSeedData = seed.createSeedData(req.variables);

  return resource.query(seed.queryName, createGraphqlDataResolver(dynamicSeedData));
};

/**
 * Returns a msw handler for a graphql mutation request
 *
 * Use this method when a request needs to return different data based on the request variables, like search queries.
 *
 * @param seed seed data for the request
 * @param url the graphql resource url.
 *
 * @example
 *  handleGraphQLDynamic(seedMyEntityMutation),
 */
export const handleGraphQLMutation = (
  seed: SeedGraphQLMutation,
  url = graphqlUrl
): GraphqlHandler => {
  const resource = graphql.link(url);

  return resource.mutation(seed.mutationName, createGraphqlDataResolver(seed));
};

/**
 * Returns a msw handler for a graphql query error request
 *
 * NOTE: Use `mockGraphqlQueryError` to mock graphql mutation errors for tests.
 *
 * @param queryName name of the graphql mutation.
 * @param mockErrors the errors to mock for the graphql mutation.
 * @param url the graphql resource url
 *
 */
export const handleGraphqlQueryError = (
  queryName: string,
  mockErrors: object[],
  url = graphqlUrl
) => {
  const resource = graphql.link(url);

  return resource.query(queryName, createErrorResolver(mockErrors));
};

/**
 * Returns a msw handler for a graphql mutation error request.
 *
 * NOTE: Use `mockGraphqlMutationError` to mock graphql mutation errors for tests.
 *
 * @param mutationName name of the graphql mutation.
 * @param mockErrors the errors to mock for the graphql mutation.
 * @param url the graphql resource url
 *
 */
export const handleGraphqlMutationError = (
  mutationName: string,
  mockErrors: object[],
  url = graphqlUrl
) => {
  const resource = graphql.link(url);

  return resource.mutation(mutationName, createErrorResolver(mockErrors));
};
