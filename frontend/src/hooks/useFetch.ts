import { useQuery } from 'react-query';

interface Props {
  cacheKey: string;
  url: string;
}

export default function useFetch({ cacheKey, url }: Props) {
  async function fetchRequest() {
    const response = await fetch(url);
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
  return useQuery(queryObject);
}
