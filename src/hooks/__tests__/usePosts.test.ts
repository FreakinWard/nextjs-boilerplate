import { renderHook } from '@testing-library/react-hooks';

import seedPosts from '../../core/mocks/seed/seedPosts';
import { queryWrapper as wrapper } from '../../core/test.utils';
import usePosts from '../usePosts';

describe('usePosts', () => {
  it('should do return seeded posts', async () => {
    // arrange
    // act
    const { result, waitForNextUpdate } = renderHook(() => usePosts(), { wrapper });

    // assert
    expect(result.current.data).toBeUndefined();

    //act
    await waitForNextUpdate();

    // assert
    expect(result.current.data).toEqual(seedPosts);
  });
});
