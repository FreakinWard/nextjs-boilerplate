import { Variables } from 'graphql-request';
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import graphQLRequest from '../core/utils/graphqlRequest';
import useEnvVar from './useEnvVar';

interface Props extends UseQueryOptions {
  queryKey: QueryKey;
  url?: string;
  graphQuery: string;
  enabled?: boolean;
  variables?: Variables;
  select?: (data: unknown) => unknown;
}

export default function useGraphQl<T>({
  queryKey,
  graphQuery,
  enabled = true,
  select,
  variables,
  ...rest
}: Props) {
  const { spaceXUrl } = useEnvVar();

  const queryObject = {
    queryKey,
    enabled,
    select,
    queryFn: () => graphQLRequest(spaceXUrl, graphQuery, variables),
    ...rest,
  };

  return useQuery(queryObject) as UseQueryResult<T>;

  // return { ...query, data: query.data as T } as UseQueryResult<T, unknown>;
}
