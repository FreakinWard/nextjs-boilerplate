import '../../styles/globals.css';

import type { AppProps } from 'next/app';

import TelemetryProvider from '../components/AppTelemetry/TelemetryProvider';
import AppState from '../context/AppState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TelemetryProvider>
      <AppState>
        <Component {...pageProps} />
      </AppState>
    </TelemetryProvider>
  );
}

export default MyApp;
