import useFetch from './useFetch';

export default function usePosts() {
  return useFetch({ cacheKey: 'posts', url: '/api/posts' });
}
