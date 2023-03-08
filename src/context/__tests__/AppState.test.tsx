import { render, screen } from '@testing-library/react';

import { AppWrapper as wrapper } from '../../core/test.utils';

describe('AppState', () => {
  const Child = () => <>child-component</>;
  const tree = <Child />;

  it('should render with child component', () => {
    // arrange
    process.env.NEXT_PUBLIC_API_MOCKING = 'disabled';

    // act
    render(tree, { wrapper });

    // assert
    expect(screen.getByText('child-component')).toBeInTheDocument();
  });
});
