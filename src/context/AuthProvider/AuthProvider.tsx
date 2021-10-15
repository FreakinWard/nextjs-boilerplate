import * as msalBrowser from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { createContext, useContext, useMemo } from 'react';

import { loginRequest } from '../../services/authConfig';
import MsalProvider from './MsalProvider';

const AuthProviderContext = createContext(undefined);

interface Props {
  children: JSX.Element;
  redirectOnAuth?: boolean;
}

export default function AuthContext({ children, redirectOnAuth }: Props) {
  const { instance: msalInstance } = useMsal();

  const userAccount = useMemo(() => {
    return msalInstance.getActiveAccount();
  }, [msalInstance]);

  const isAuthenticated = useIsAuthenticated();

  const login = async loginRequest => {
    redirectOnAuth
      ? await msalInstance.loginPopup(loginRequest)
      : await msalInstance.loginRedirect(loginRequest);
  };

  const logout = async () => {
    redirectOnAuth ? await msalInstance.logoutPopup() : await msalInstance.logoutRedirect();
  };

  const acquireTokenSilent = async () => {
    return msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: userAccount,
    });
  };

  const contextValue = {
    ...useMsal(),
    login,
    logout,
    acquireTokenSilent,
    isAuthenticated,
    userAccount,
  };
  return (
    <AuthProviderContext.Provider value={contextValue}>{children}</AuthProviderContext.Provider>
  );
}

function AuthProvider({ children, redirectOnAuth }: Props) {
  return (
    <MsalProvider>
      <AuthContext redirectOnAuth={redirectOnAuth}>{children}</AuthContext>
    </MsalProvider>
  );
}

function useAuth() {
  const context = useContext(AuthProviderContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, msalBrowser, useAuth };
