import { useCallback, useEffect, useState } from 'react';

import { msalBrowser, useAuth } from '../../../../context/AuthProvider/AuthProvider';
import { graphConfig } from '../../../../services/authConfig';
import useFetch from './useFetch';

export default function useUserProfile() {
  const { callMsGraph } = useFetch(graphConfig.graphMeEndpoint);
  const [data, setData] = useState();
  const { inProgress } = useAuth();
  const { InteractionStatus } = msalBrowser;

  const fetchUserProfileData = useCallback(async () => {
    const data = await callMsGraph();
    setData(data);
  }, [callMsGraph]);

  useEffect(() => {
    if (!data && inProgress === InteractionStatus.None) {
      fetchUserProfileData();
    }
  }, [InteractionStatus.None, data, fetchUserProfileData, inProgress]);

  return {
    data,
  };
}
