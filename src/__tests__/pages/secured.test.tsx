import { render } from '@testing-library/react';

import { AppWrapper as wrapper, getByTextContent, mswMock } from '../../core/test.utils';
import Secured from '../../pages/secured';

describe('index', () => {
  mswMock();

  const tree = <Secured />;

  it('should render username', () => {
    // arrange
    // act
    render(tree, { wrapper });

    // assert
    expect(getByTextContent(`Welcome, userNameValue`)).toBeInTheDocument();
  });
});
