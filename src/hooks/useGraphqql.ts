import { Variables } from 'graphql-request';
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import graphQLRequest from '../core/utils/graphqlRequest';
import useEnvVar from './useEnvVar';

interface Props<T> extends UseQueryOptions {
  queryKey: QueryKey;
  url?: string;
  graphQuery: string;
  enabled?: boolean;
  variables?: Variables;
  select?: (data: T) => unknown;
}

export default function useGraphQl<T>({
  queryKey,
  graphQuery,
  enabled = true,
  select,
  variables,
  ...rest
}: Props<T>) {
  const { spaceXUrl } = useEnvVar();
  const url = `${spaceXUrl}/graphql`;

  const queryObject = {
    queryKey,
    enabled,
    select,
    queryFn: () => graphQLRequest(url, graphQuery, variables),
    // queryFn: () => graphqlRequestFetch<T>(spaceXUrl, graphQuery, variables),
    ...rest,
  };

  return useQuery(queryObject) as UseQueryResult<T>;

  // return { ...query, data: query.data as T } as UseQueryResult<T, unknown>;
}
