import { renderHook } from '@testing-library/react-hooks';

import seedHealth from '../../core/mocks/seed/seedHealth';
import { queryWrapper as wrapper } from '../../core/test.utils';
import useHealth from '../useHealth';

describe('useHealth', () => {
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
