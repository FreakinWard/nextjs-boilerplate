import { Method } from '../../../hooks/useFetch';

export type HandleErrorOptions = {
  method: Method;
  error?: object;
  statusCode?: number;
};
