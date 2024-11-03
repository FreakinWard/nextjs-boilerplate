import { renderHook, waitFor } from '@testing-library/react';

import { AppWrapper as wrapper } from '../../../core/test.utils';
import useFetch from '../../../hooks/useFetch';
import { mockRestGet, mockRestGetError } from '../mockRequests/mockRestRequests';
import mswSetupJest from '../mswSetupJest';
import { seedPostsEmpty, seedPostsSingle } from '../seed/seedPosts';

describe('msw', () => {
  mswSetupJest();

  const cacheKey = 'key';
  const url = 'https://jsonplaceholder.typicode.com/posts';

  describe('GET', () => {
    const theories = [
      { when: 'by default', seed: null, expected: 3 },
      { when: 'with single item', seed: seedPostsSingle, expected: 1 },
      { when: 'with empty items', seed: seedPostsEmpty, expected: 0 },
    ];

    it.each(theories)(
      'should return $expected items when request is mocked $when',
      async ({ seed, expected }) => {
        // arrange
        if (seed) mockRestGet(seed);

        // act
        const { result } = renderHook(() => useFetch({ cacheKey, url }), { wrapper });

        // assert
        await waitFor(() => {
          const actualLength = result.current.data.length;
          expect(actualLength).toEqual(expected);
        });
      }
    );

    it('should return expected error when request fails', async () => {
      // arrange
      mockRestGetError(url);

      // act
      const { result } = renderHook(() => useFetch({ cacheKey, url }), { wrapper });

      // assert
      await waitFor(() => {
        expect(result.current.error).toBeDefined();
      });
    });
  });
});
