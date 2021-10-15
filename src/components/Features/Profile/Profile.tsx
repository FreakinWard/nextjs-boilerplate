import { MsalAuthenticationTemplate } from '@azure/msal-react';
import Paper from '@material-ui/core/Paper';

import { useMsalBrowser } from '../../../context/AuthProvider';
import { loginRequest } from '../../../services/authConfig';
import ErrorComponent from './components/ErrorComponent';
import LoadingComponent from './components/LoadingComponent';
import ProfileData from './components/ProfileData';
import useUserProfile from './hooks/useUserProfile';

export default function Profile() {
  const { InteractionType } = useMsalBrowser();
  const authRequest = {
    ...loginRequest,
  };

  const ProfileContent = () => {
    const { data } = useUserProfile();

    if (!data) return null;

    return (
      <Paper>
        <ProfileData graphData={data} />
      </Paper>
    );
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
