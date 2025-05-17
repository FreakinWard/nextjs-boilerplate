import { render, screen } from '@testing-library/react';
import { SessionProvider } from 'next-auth/react';

import Layout from '../index';

describe('Layout', () => {
  it('should render Header', () => {
    // arrange
    const Component = () => <>child-component</>;
    const tree = (
      <SessionProvider session={null}>
        <Layout>
          <Component />
        </Layout>
      </SessionProvider>
    );

    // act
    render(tree);

    // assert
    screen.getByText('NextJs');
  });

  it('should render Footer', () => {
    // arrange
    const Component = () => <>child-component</>;
    const tree = (
      <SessionProvider session={null}>
        <Layout>
          <Component />
        </Layout>
      </SessionProvider>
    );

    // act
    render(tree);

    // assert
    screen.getByText('Powered by');
  });
});
