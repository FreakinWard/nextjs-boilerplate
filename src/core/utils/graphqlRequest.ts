import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';

export default async function graphQLRequest<T = unknown>(
  url: string,
  document: RequestDocument,
  variables?: Variables
) {
  const headers = { 'Content-Type': 'application/json' };

  const requestConfig = { headers };

  const graphQLClient = new GraphQLClient(url, requestConfig);

  return graphQLClient.request<T>(document, variables);
}
