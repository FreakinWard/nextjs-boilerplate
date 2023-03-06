import Router from 'next/router';
import { Session } from 'next-auth';

import AppState from '../context/AppState';
import { resetMswHandlers, setupMsw } from './msw';

jest.mock('next/router', () => require('next-router-mock'));

const sessionMock = {
  error: null,
  expires: 'expiresValues',
  idToken: 'idTokenValue',
  user: {
    email: 'emailValue',
    name: 'nameValue',
    username: 'usernameValue',
  },
  signOutUrl: 'signOutUrlValue',
};

export const AppWrapper = ({
  children,
  session = sessionMock,
}: {
  children: JSX.Element;
  session: Session;
}) => {
  const pageTitle = 'pageTitleValue';
  const requireAuth = false;

  return (
    <AppState pageTitle={pageTitle} requireAuth={requireAuth} session={session} router={Router}>
      {children}
    </AppState>
  );
};

export const mswMock = () => {
  let mswCleanup;

  beforeAll(async () => {
    mswCleanup = await setupMsw();
  });

  afterEach(() => resetMswHandlers());

  afterAll(() => {
    mswCleanup();
  });
};
