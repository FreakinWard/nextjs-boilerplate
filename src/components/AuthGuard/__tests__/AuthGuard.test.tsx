import { render, screen } from '@testing-library/react';
import * as nextAuth from 'next-auth/react';

import AuthGuard from '../index';

jest.mock('next-auth/react');

describe('AuthGuard', () => {
  const Component = () => <>child-component</>;

  const mockComponent = (requireAuth, status = 'loading', data = null) => {
    const useSessionMock = {
      status,
      data,
    };

    // @ts-ignore
    jest.spyOn(nextAuth, 'useSession').mockImplementation(() => useSessionMock);
    jest.spyOn(nextAuth, 'signIn');

    return (
      <AuthGuard requireAuth={requireAuth}>
        <Component />
      </AuthGuard>
    );
  };

  it('should render', () => {
    // arrange
    const useSessionMock = {
      useSession: jest.fn(),
      signIn: jest.fn(),
    };

    // @ts-ignore
    jest.spyOn(nextAuth, 'useSession').mockImplementation(() => useSessionMock);

    const requireAuth = false;
    const tree = mockComponent(requireAuth);

    // act
    render(tree);

    // assert
  });

  it('should render render child component given auth is not required', () => {
    // arrange
    const requireAuth = false;
    const tree = mockComponent(requireAuth);

    // act
    render(tree);

    // assert
    expect(screen.getByText('child-component')).toBeInTheDocument();
  });

  it('should not render render child component given auth is required and user is not authenticated', () => {
    // arrange
    const requireAuth = true;
    const tree = mockComponent(requireAuth);

    // act
    render(tree);

    // assert
    expect(screen.queryByText('child-component')).not.toBeInTheDocument();
  });

  it('should call signIn given user auth is required and user is not authenticated', () => {
    // arrange
    const requireAuth = true;
    const status = 'unauthenticated';
    const tree = mockComponent(requireAuth, status);

    // act
    render(tree);

    // assert
    expect(screen.queryByText('child-component')).not.toBeInTheDocument();
    expect(nextAuth.signIn).toHaveBeenCalled();
  });

  it('should call signOut given user auth is required and there is an error', () => {
    // arrange
    const requireAuth = true;
    const status = 'authenticated';
    const tree = mockComponent(requireAuth, status, { error: true });

    // act
    render(tree);

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
        const tree = mockComponent(requireAuth, theory.status);

        // act
        render(tree);

        // assert
        expect(nextAuth.signIn).not.toHaveBeenCalled();
      }
    );
  });
});
