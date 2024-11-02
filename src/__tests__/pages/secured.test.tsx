import { render } from '@testing-library/react';

import mswSetupJest from '../../core/msw/mswSetupJest';
import { AppWrapper as wrapper, getByTextContent } from '../../core/test.utils';
import Secured from '../../pages/secured';

describe('index', () => {
  mswSetupJest();

  const tree = <Secured />;

  it('should render username', () => {
    // arrange
    // act
    render(tree, { wrapper });

    // assert
    expect(getByTextContent(`Welcome, userNameValue`)).toBeInTheDocument();
  });
});
