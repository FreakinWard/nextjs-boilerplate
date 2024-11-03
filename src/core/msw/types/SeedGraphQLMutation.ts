import { SeedData } from './SeedData';

export interface SeedGraphQLMutation<T extends SeedData = unknown> {
  url?: string;
  mutationName: string;
  graphQLResponse: T;
}
