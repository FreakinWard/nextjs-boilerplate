import { renderHook, waitFor } from '@testing-library/react';

import seedPosts from '../../core/msw/seed/seedPosts';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import usePosts from '../usePosts';

describe('usePosts', () => {
  mswMock();

  it('should do return seeded posts', async () => {
    // arrange
    // act
    const { result } = renderHook(() => usePosts(), { wrapper });

    // assert
    expect(result.current.data).toBeUndefined();
    await waitFor(() => {
      expect(result.current.data).toEqual(seedPosts.data);
    });
  });
});
