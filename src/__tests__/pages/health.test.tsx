import { render, screen } from '@testing-library/react';

import seedHealth from '../../core/msw/seed/seedHealth';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import Health from '../../pages/health';

describe('health', () => {
  mswMock();

  it('should render expected health values', async () => {
    // arrange
    const tree = <Health />;

    // act
    render(tree, { wrapper });

    // assert
    expect(await screen.findByText(`Status: ${seedHealth.data.status}`)).toBeInTheDocument();
    expect(await screen.findByText(`Version: ${seedHealth.data.version}`)).toBeInTheDocument();
  });
});
