import {
  InteractionRequiredAuthError,
  InteractionStatus,
  InteractionType,
} from '@azure/msal-browser';
import { MsalAuthenticationTemplate, useMsal } from '@azure/msal-react';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';

import { loginRequest } from '../../../services/authConfig';
import ErrorComponent from './components/ErrorComponent';
import LoadingComponent from './components/LoadingComponent';
import ProfileData from './components/ProfileData';
import useMsGraph from './hooks/useMsGraph';

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const { callMsGraph } = useMsGraph();

  useEffect(() => {
    if (!graphData && inProgress === InteractionStatus.None) {
      callMsGraph()
        .then(response => setGraphData(response))
        .catch(e => {
          if (e instanceof InteractionRequiredAuthError) {
            instance.acquireTokenRedirect({
              ...loginRequest,
              account: instance.getActiveAccount(),
            });
          }
        });
    }
  }, [inProgress, graphData, instance, callMsGraph]);

  return <Paper>{graphData ? <ProfileData graphData={graphData} /> : null}</Paper>;
};

export default function Profile() {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Popup}
      authenticationRequest={authRequest}
      errorComponent={ErrorComponent}
      loadingComponent={LoadingComponent}>
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}
