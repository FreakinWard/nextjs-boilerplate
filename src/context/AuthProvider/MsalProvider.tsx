import * as msal from '@azure/msal-browser';
import * as msalBrowser from '@azure/msal-browser';
import { MsalProvider as AzureMsalProvider } from '@azure/msal-react';
import Router from 'next/router';

import { msalConfig } from '../../services/authConfig';

interface Props {
  children: JSX.Element;
}

export default function MsalProvider({ children }: Props) {
  const msalInstance = new msal.PublicClientApplication(msalConfig);

  // Default to using the first account if no account is active on page load
  if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
  }

  msalInstance.addEventCallback(({ eventType, payload }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (eventType === msalBrowser.EventType.LOGIN_SUCCESS && payload.account) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const account = payload.account;
      msalInstance.setActiveAccount(account);
    }
    if (eventType === msalBrowser.EventType.LOGOUT_SUCCESS) {
      Router.push(msalConfig.auth.postLogoutRedirectUri);
    }
  });

  return <AzureMsalProvider instance={msalInstance}>{children}</AzureMsalProvider>;
}
