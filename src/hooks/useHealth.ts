import { useQuery } from 'react-query';

const fetchHealth = async () => {
  const response = await fetch('/api/health');

  return await response.json();
};

export default function useHealth() {
  const queryObject = {
    queryKey: 'health',
    queryFn: fetchHealth,
    staleTime: 0,
  };
  return useQuery(queryObject);
}
