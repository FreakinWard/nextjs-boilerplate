import { useQuery } from 'react-query';

export const fetchAppConfig = async () => {
  const response = await fetch('/api/appConfig');

  return await response.json();
};

export default function useAppConfig() {
  const queryObject = {
    queryKey: 'appConfig',
    queryFn: fetchAppConfig,
  };
  return useQuery(queryObject);
}
