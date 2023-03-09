import { renderHook, waitFor } from '@testing-library/react';

import seedHealth from '../../core/msw/seed/seedHealth';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import useHealth from '../useHealth';

describe('useHealth', () => {
  mswMock();

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
