import { useQuery } from 'react-query';

interface RequestProps {
  cacheKey: string;
  url: string;
  body?: Record<string, unknown>;
}

export default function usePost({ cacheKey, url, body }: RequestProps) {
  async function fetchRequest() {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
