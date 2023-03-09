import useFetch from './useFetch';

export default function useHealth() {
  return useFetch({ cacheKey: 'health', url: '/api/health' });
}
