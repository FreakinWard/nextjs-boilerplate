import { render } from '@testing-library/react';

import AppHead from '../index';

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }: { children: Array<JSX.Element> }) => {
      return <>{children}</>;
    },
  };
});

describe('AppHead', () => {
  it('should render expected title', () => {
    // arrange
    const title = 'titleValue';
    const tree = <AppHead title={title} />;

    // act
    render(tree);

    // assert
    expect(document.title).toBe(title);
  });
});
