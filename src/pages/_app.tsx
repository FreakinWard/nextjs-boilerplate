import '../../styles/globals.css';

import type { AppProps } from 'next/app';

import TelemetryProvider from '../components/AppTelemetry/TelemetryProvider';
import LayoutContainer from '../components/Features/Home/components/LayoutContainer';
import AppState from '../context/AppState';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TelemetryProvider>
      <AppState>
        <LayoutContainer hideLayout={pageProps.hideLayout}>
          <Component {...pageProps} />
        </LayoutContainer>
      </AppState>
    </TelemetryProvider>
  );
}

export default MyApp;
