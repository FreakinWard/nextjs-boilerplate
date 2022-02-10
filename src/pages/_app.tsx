import '../../styles/globals.css';

import type { AppProps } from 'next/app';

import { TelemetryProvider } from '../components/AppTelemetry/TelemetryProvider';
import LayoutContainer from '../components/Features/Home/components/LayoutContainer';
import AppState from '../context/AppState';

function App({ Component, pageProps, router }: AppProps) {
  return (
    <TelemetryProvider component={Component} router={router}>
      <AppState>
        <LayoutContainer>
          <Component {...pageProps} />
        </LayoutContainer>
      </AppState>
    </TelemetryProvider>
  );
}

export default App;
