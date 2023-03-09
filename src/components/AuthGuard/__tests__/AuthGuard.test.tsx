import { render, screen } from '@testing-library/react';
import * as nextAuth from 'next-auth/react';

import AuthGuard from '../index';

jest.mock('next-auth/react');
jest.mock('next/router', () => require('next-router-mock'));

describe('AuthGuard', () => {
  const Component = () => <>child-component</>;

  const mockComponent = (requireAuth, status = 'loading', data = null) => {
    const useSessionMock = {
      ...jest.requireActual('next-auth/react'),
      status,
      data,
    };

    jest.spyOn(nextAuth, 'useSession').mockReturnValue(useSessionMock);

    const tree = (
      <AuthGuard requireAuth={requireAuth}>
        <Component />
      </AuthGuard>
    );

    render(tree);
  };

  it('should render render child component given auth is not required', () => {
    // arrange
    const requireAuth = false;

    // act
    mockComponent(requireAuth);

    // assert
    expect(screen.getByText('child-component')).toBeInTheDocument();
  });

  it('should not render render child component given auth is required and user is unauthenticated', () => {
    // arrange
    const requireAuth = true;

    // act
    mockComponent(requireAuth);

    // assert
    expect(screen.queryByText('child-component')).not.toBeInTheDocument();
  });

  it('should call signIn given user auth is required and user is unauthenticated', () => {
    // arrange
    const requireAuth = true;
    const status = 'unauthenticated';

    // act
    mockComponent(requireAuth, status);

    // assert
    expect(screen.queryByText('child-component')).not.toBeInTheDocument();
    expect(nextAuth.signIn).toHaveBeenCalled();
  });

  it('should call signOut given user auth is required and there is an error', () => {
    // arrange
    const requireAuth = true;
    const status = 'authenticated';

    // act
    mockComponent(requireAuth, status, { error: true });

    // assert
    expect(nextAuth.signOut).toHaveBeenCalled();
  });

  describe('signIn', () => {
    const theories = [{ status: 'loading' }, { status: 'authenticated' }];

    it.each(theories)(
      'should not call signIn given user auth is required and  status is $status',
      theory => {
        // arrange
        const requireAuth = true;

        // act
        mockComponent(requireAuth, theory.status);

        // assert
        expect(nextAuth.signIn).not.toHaveBeenCalled();
      }
    );
  });
});
