/* istanbul ignore file */ // TODO: determine a way to test

import '../../styles/globals.css';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';

import AppHead from '../components/AppHead/AppHead';
import Layout from '../components/Layout';
import AppState from '../context/AppState';

interface CustomPageProps {
  title: string;
  requireAuth: boolean;
  session: Session;
}

interface Props extends AppProps {
  Component: NextPage & CustomPageProps;
}

export default function App({ Component, pageProps, router }: Props) {
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
