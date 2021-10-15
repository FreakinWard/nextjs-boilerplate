import * as msal from '@azure/msal-browser';
import * as msalBrowser from '@azure/msal-browser';
import { MsalProvider, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { createContext, useContext } from 'react';

import { msalConfig } from '../services/authConfig';

const AuthProviderContext = createContext(undefined);

interface Props {
  children: JSX.Element;
}

function AuthProvider({ children }: Props) {
  const msalInstance = new msal.PublicClientApplication(msalConfig);

  // Default to using the first account if no account is active on page load
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.addEventCallback(event => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (event.eventType === msalBrowser.EventType.LOGIN_SUCCESS && event.payload.account) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  const contextValue = {
    msalInstance,
  };

  return (
    <AuthProviderContext.Provider value={contextValue}>
      <MsalProvider instance={msalInstance}>{children}</MsalProvider>
    </AuthProviderContext.Provider>
  );
}

function useMsalBrowser() {
  const context = useContext(AuthProviderContext);
  if (context === undefined) {
    throw new Error('useMsalBrowser must be used within an AuthProvider');
  }
  return {
    ...msalBrowser,
    // InteractionType,
    // InteractionStatus,
  };
}

export { AuthProvider, useIsAuthenticated, useMsal, useMsalBrowser };
