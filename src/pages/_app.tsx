import '../../styles/globals.css';

import type { AppProps } from 'next/app';
import getConfig from 'next/config';

import TelemetryProvider from '../components/AppTelemetry/TelemetryProvider';
import AppState from '../context/AppState';

function MyApp({ Component, pageProps }: AppProps) {
  const { publicRuntimeConfig } = getConfig();
  const appInsightsKey = publicRuntimeConfig.appInsightsKey;

  return (
    <TelemetryProvider>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </TelemetryProvider>
  );
}

export default MyApp;
