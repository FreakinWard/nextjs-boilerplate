/* istanbul ignore file */ // TODO: determine a way to test

import '../../styles/globals.css';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';

import AppHead from '../components/AppHead/AppHead';
import Layout from '../components/Layout';
import AppState from '../context/AppState';

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  title: string;
  requireAuth: boolean;
};

type Props<P = {}> = AppProps<P> & {
  Component: Page<P>;
};

interface CustomPageProps {
  session: Session;
}

export default function App({ Component, pageProps, router }: Props<CustomPageProps>) {
  return (
    <AppState
      pageTitle={Component.title}
      requireAuth={Component.requireAuth}
      router={router}
      session={pageProps.session}
    >
      <Layout>
        <AppHead title={Component.title} />
        <Component {...pageProps} />
      </Layout>
    </AppState>
  );
}
