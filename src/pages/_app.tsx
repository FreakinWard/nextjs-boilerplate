import '../../styles/globals.css';

import type { AppProps } from 'next/app';

import { TelemetryProvider } from '../components/AppTelemetry/TelemetryProvider';
import AppState from '../context/AppState';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <TelemetryProvider component={Component} router={router}>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </TelemetryProvider>
  );
}

export default MyApp;
