import { SeedData } from './SeedData';

export interface SeedRest<T extends SeedData> {
  url: string;
  data: T;
  statusCode?: number;
}
