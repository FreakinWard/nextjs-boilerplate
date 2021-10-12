import * as msal from '@azure/msal-browser';
import { EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { msalConfig } from '../services/authConfig';

interface Props {
  children: ReactNode;
}

export default function AppState({ children }: Props) {
  const queryConfig = {
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  };
  const queryClient = new QueryClient(queryConfig);
  const msalInstance = new msal.PublicClientApplication(msalConfig);

  // Default to using the first account if no account is active on page load
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.addEventCallback(event => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
      const account = event.payload.account;
      msalInstance.setActiveAccount(account);
    }
  });

  return (
    <MsalProvider instance={msalInstance}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MsalProvider>
  );
}
