import { screen } from '@testing-library/react';
import Router from 'next/router';
import { Session } from 'next-auth';
import * as nextAuth from 'next-auth/react';

import AppState from '../context/AppState';
import { resetMswHandlers, setupMsw } from './msw';

jest.mock('next/router', () => require('next-router-mock'));

const sessionMock = {
  error: null,
  expires: 'expiresValues',
  idToken: 'idTokenValue',
  user: {
    email: 'emailValue',
    name: 'userNameValue',
  },
  signOutUrl: 'signOutUrlValue',
};

export const AppWrapper = ({
  children,
  requireAuth = false,
  session = sessionMock,
  sessionStatus = 'authenticated',
}: {
  children: JSX.Element;
  requireAuth?: boolean;
  sessionStatus?: string;
  session?: Session;
}) => {
  const pageTitle = 'pageTitleValue';
  const useSessionMock = {
    ...jest.requireActual('next-auth/react'),
    data: session,
    status: sessionStatus,
  };
  jest.spyOn(nextAuth, 'useSession').mockImplementation(() => useSessionMock);

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

export const getByTextContent = text => {
  // Passing function to `getByText`
  return screen.getByText((content, node) => {
    const hasText = node => node.textContent === text;
    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(child => !hasText(child));

    return nodeHasText && childrenDontHaveText;
  });
};
