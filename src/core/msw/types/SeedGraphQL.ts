import { SeedData } from './SeedData';

export interface SeedGraphQL<T extends SeedData, U extends SeedData> {
  queryName: string;
  graphQLResponse: T;
  data: U;
}

export interface SeedGraphQLDynamic<ResponseType extends SeedData, AdaptedType extends SeedData>
  extends SeedGraphQL<ResponseType, AdaptedType> {
  createSeedData: (
    graphQLRequestVariables: unknown,
    ...args: unknown[]
  ) => SeedGraphQL<ResponseType, AdaptedType>;
}

export interface SeedGraphQLNoAdapter<T extends SeedData> extends SeedGraphQL<T, T> {
  data: T;
}
