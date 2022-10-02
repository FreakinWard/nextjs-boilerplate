/* istanbul ignore file */ // TODO: determine a way to test

import '../../styles/globals.css';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { TelemetryProvider } from '../components/AppTelemetry/TelemetryProvider';
import AppHead from '../components/Features/Home/components/AppHead';
import LayoutContainer from '../components/Features/Home/components/LayoutContainer';
import AppState from '../context/AppState';

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  title: string;
};

type Props<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

function App({ Component, pageProps, router }: Props) {
  return (
    <TelemetryProvider component={Component} router={router}>
      <AppState>
        <LayoutContainer>
          <AppHead title={Component.title} />
          <Component {...pageProps} />
        </LayoutContainer>
      </AppState>
    </TelemetryProvider>
  );
}

export default App;
