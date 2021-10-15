import { useCallback, useEffect, useState } from 'react';

import { useMsal, useMsalBrowser } from '../../../../context/AuthProvider';
import { graphConfig } from '../../../../services/authConfig';
import useFetch from './useFetch';

export default function useUserProfile() {
  const { callMsGraph } = useFetch(graphConfig.graphMeEndpoint);
  const [data, setData] = useState();
  const { inProgress } = useMsal();
  const { InteractionStatus } = useMsalBrowser();

  const fetchUserProfileData = useCallback(async () => {
    const data = await callMsGraph();
    setData(data);
  }, [callMsGraph]);

  useEffect(() => {
    if (!data && inProgress === InteractionStatus.None) {
      fetchUserProfileData();
    }
  }, [data, fetchUserProfileData, inProgress]);

  return {
    data,
  };
}
