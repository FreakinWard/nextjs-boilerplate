import { useAuth } from '../../../../context/AuthProvider/AuthProvider';

export default function useFetch(url) {
  const { instance, acquireTokenSilent } = useAuth();

  const callMsGraph = async () => {
    const account = instance.getActiveAccount();
    if (!account) {
      throw Error(
        'No active account! Verify a user has been signed in and setActiveAccount has been called.'
      );
    }

    const response = await acquireTokenSilent();

    const headers = new Headers();
    const bearer = `Bearer ${response.accessToken}`;

    headers.append('Authorization', bearer);

    const options = {
      method: 'GET',
      headers: headers,
    };

    return fetch(url, options)
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  return {
    callMsGraph,
  };
}
