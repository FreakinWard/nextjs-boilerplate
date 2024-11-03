import { useQuery } from 'react-query';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
interface Props {
  cacheKey: string;
  url: string;
  method?: Method;
}

export default function useFetch<T>({ cacheKey, url, method = 'GET' }: Props) {
  async function fetchRequest() {
    const response = await fetch(url, { method });
    // TODO: this is covered with e2e tests - consider merging coverage results
    /* istanbul ignore next */
    if (!response.ok) {
      throw new Error(`${response.statusText} - ${response.url}`);
    }
    return response.json();
  }

  const queryObject = {
    queryKey: [cacheKey],
    queryFn: fetchRequest,
  };
  return useQuery<T>(queryObject);
}
