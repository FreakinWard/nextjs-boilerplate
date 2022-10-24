import { render, screen } from '@testing-library/react';
import * as nextAuth from 'next-auth/react';

import Layout from '../index';

describe('Layout', () => {
  beforeEach(() => {
    const useSessionMock = {
      status: 'authenticated1',
      data: { user: { name: 'nameValue', image: 'imageUrl' } },
    };

    // @ts-ignore
    jest.spyOn(nextAuth, 'useSession').mockImplementation(() => useSessionMock);
  });

  it('should render Header logo, title, and sign-in', () => {
    // arrange
    const Component = () => <>child-component</>;
    const tree = (
      <Layout>
        <Component />
      </Layout>
    );

    // act
    render(tree);

    // assert
    screen.getByText('LOGO');
    screen.getByText('NextJs');
    screen.getByText('Sign In');
  });

  it('should render Footer', () => {
    // arrange
    const Component = () => <>child-component</>;
    const tree = (
      <Layout>
        <Component />
      </Layout>
    );

    // act
    render(tree);

    // assert
    screen.getByText('Powered by');
  });
});
