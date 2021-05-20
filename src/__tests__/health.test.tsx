import { render, screen } from '@testing-library/react';

import seedHealth from '../core/mocks/seed/seedHealth';
import { queryWrapper as wrapper } from '../core/test.utils';
import Health from '../pages/health';

describe('health', () => {
  it('should render expected health values', async () => {
    // arrange
    const tree = <Health />;

    // act
    render(tree, { wrapper });

    // assert
    expect(await screen.findByText(`Status: ${seedHealth.status}`)).toBeInTheDocument();
    expect(await screen.findByText(`Version: ${seedHealth.version}`)).toBeInTheDocument();
  });
});
