import { render, screen } from '@testing-library/react';

import Layout from '../index';

describe('Layout', () => {
  it('should render Header', () => {
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
    screen.getByText('Welcome to');
    screen.getByText('Next.js!');
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
