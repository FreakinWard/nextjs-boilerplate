import { useQuery } from 'react-query';

const fetchPosts = async () => {
  const response = await fetch('/api/posts');

  return await response.json();
};

export default function usePosts() {
  const queryObject = {
    queryKey: 'posts',
    queryFn: fetchPosts,
  };
  return useQuery(queryObject);
}
