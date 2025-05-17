import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { SessionProvider } from 'next-auth/react';
import * as nextAuth from 'next-auth/react';

import Header from '../Header';

describe('Header', () => {
  const mockUseSession = (status = 'authenticated') => {
    const userMock = {
      name: 'user-name-value',
      image: 'image-url-value',
    };

    const useSessionMock = {
      ...jest.requireActual('next-auth/react'),
      status,
      data: status === 'authenticated' ? { user: userMock } : null,
    };

    const signInMock = jest.fn();
    const signOutMock = jest.fn();

    jest.spyOn(nextAuth, 'useSession').mockImplementation(() => useSessionMock);
    jest.spyOn(nextAuth, 'signIn').mockImplementation(signInMock);
    jest.spyOn(nextAuth, 'signOut').mockImplementation(signOutMock);

    return { useSessionMock, userMock, signInMock, signOutMock };
  };

  const renderComponent = () => {
    // arrange
    const user = userEvent.setup();

    // act
    // assert
    render(
      <SessionProvider session={null}>
        <Header />
      </SessionProvider>
    );

    return { user };
  };

  const clickButton = async label => {
    // arrange
    const user = userEvent.setup();

    const buttonElement = screen.getByRole('button', { name: label });

    // act
    // assert
    await user.click(buttonElement);
  };

  const clickMenuItem = async label => {
    // arrange
    const user = userEvent.setup();

    const buttonElement = screen.getByRole('menuitem', { name: label });

    // act
    // assert
    await user.click(buttonElement);
  };

  it('should render', () => {
    // arrange
    // act
    // assert
    renderComponent();
  });

  it('should render AppLogo', () => {
    // arrange
    // act
    renderComponent();

    // assert
    screen.getByLabelText('application logo');
  });

  it('should render App Title', () => {
    // arrange
    const expected = 'NextJs';

    // act
    renderComponent();

    // assert
    screen.getByText(expected);
  });

  it('should render Login Button when user is unauthenticated', async () => {
    // arrange
    const status = 'unauthenticated';
    mockUseSession(status);

    // act
    const { user } = renderComponent();

    // assert
    const signInButton = screen.getByRole('button', { name: 'Sign In' });
    await user.click(signInButton);
  });

  it('should render User Avatar user is authenticated', async () => {
    // arrange
    const user = userEvent.setup();

    const { useSessionMock } = mockUseSession();

    // act
    renderComponent();

    // assert
    const avatarButton = screen.getByRole('button', { name: useSessionMock.data.user.name });
    await user.click(avatarButton);
    await user.click(screen.getByText('Logout'));
  });

  it('should call signIn when Sign In is selected', async () => {
    // arrange
    const status = 'unAuthenticated';
    const { signInMock } = mockUseSession(status);

    // act
    renderComponent();

    await clickButton('Sign In');

    // assert
    expect(signInMock).toHaveBeenCalled();
  });

  it('should call signOut when Logout is selected', async () => {
    // arrange
    const status = 'authenticated';
    const { signOutMock, userMock } = mockUseSession(status);

    // act
    renderComponent();

    await clickButton(userMock.name);
    await clickMenuItem('Logout');

    // assert
    expect(signOutMock).toHaveBeenCalled();
  });
});
