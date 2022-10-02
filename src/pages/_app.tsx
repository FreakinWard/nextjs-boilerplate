/* istanbul ignore file */ // TODO: determine a way to test

import '../../styles/globals.css';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import AppHead from '../components/AppHead/AppHead';
import { TelemetryProvider } from '../components/AppTelemetry/TelemetryProvider';
import Layout from '../components/Layout';
import AppState from '../context/AppState';

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  title: string;
};

type Props<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

export default function App({ Component, pageProps, router }: Props) {
  return (
    <TelemetryProvider component={Component} router={router}>
      <AppState>
        <Layout>
          <AppHead title={Component.title} />
          <Component {...pageProps} />
        </Layout>
      </AppState>
    </TelemetryProvider>
  );
}
