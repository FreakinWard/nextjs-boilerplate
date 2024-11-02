import { renderHook, waitFor } from '@testing-library/react';

import mswSetupJest from '../../core/msw/mswSetupJest';
import seedHealth from '../../core/msw/seed/seedHealth';
import { AppWrapper as wrapper } from '../../core/test.utils';
import useHealth from '../useHealth';

describe('useHealth', () => {
  mswSetupJest();

  it('should do return seeded posts', async () => {
    // arrange
    // act
    const { result } = renderHook(() => useHealth(), { wrapper });

    // assert
    expect(result.current.data).toBeUndefined();
    await waitFor(() => {
      expect(result.current.data).toEqual(seedHealth.data);
    });
  });
});
