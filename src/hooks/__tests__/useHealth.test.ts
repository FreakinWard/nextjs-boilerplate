import { renderHook } from '@testing-library/react-hooks';

import seedHealth from '../../core/msw/seed/seedHealth';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import useHealth from '../useHealth';

describe('useHealth', () => {
  mswMock();

  it('should do return seeded posts', async () => {
    // arrange
    // act
    const { result, waitForNextUpdate } = renderHook(() => useHealth(), { wrapper });

    // assert
    expect(result.current.data).toBeUndefined();

    //act
    await waitForNextUpdate();

    // assert
    expect(result.current.data).toEqual(seedHealth);
  });
});
