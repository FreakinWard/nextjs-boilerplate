import { render, screen } from '@testing-library/react';

import AppState from '../AppState';

describe('AppState', () => {
  const Child = () => <>child-component</>;
  const tree = (
    <AppState>
      <Child />
    </AppState>
  );

  it('should render with child component', () => {
    // arrange
    process.env.NEXT_PUBLIC_API_MOCKING = 'disabled';

    // act
    render(tree);

    // assert
    expect(screen.getByText('child-component')).toBeInTheDocument();
  });
});
