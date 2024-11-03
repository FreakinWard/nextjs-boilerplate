import { waitFor } from '@testing-library/react';

import useFetch, { Method } from '../../../hooks/useFetch';
import { Post } from '../../../pages/api/posts';
import { renderHookQuery } from '../../testMethods/hookMethods';
import {
  genericError,
  mockRestError,
  mockRestGet,
  mockRestPost,
} from '../mockRequests/mockRestRequests';
import mswSetupJest from '../mswSetupJest';
import { seedPostsEmpty, seedPostsSingle } from '../seed/seedPosts';
import { SeedRest } from '../types';

describe('msw', () => {
  mswSetupJest();

  const cacheKey = 'key';
  const url = 'https://jsonplaceholder.typicode.com/posts';

  const useTestHarness = (method: Method) => useFetch<Post[]>({ cacheKey, url, method });

  const useGetHook = () => useTestHarness('GET');

  const usePostHook = () => useTestHarness('POST');

  const methodTheories: { method: Method }[] = [{ method: 'GET' }, { method: 'POST' }];

  const executeHookMethod = async (method: string) => {
    switch (method) {
      case 'GET':
        return await renderHookQuery(useGetHook);
      case 'POST':
        return await renderHookQuery(usePostHook);
    }
  };

  describe.each(methodTheories)('when request is $method', methodTheory => {
    const mockTheories = [
      { when: 'by default', seed: null, expected: 3 },
      { when: 'with single item', seed: seedPostsSingle, expected: 1 },
      { when: 'with empty items', seed: seedPostsEmpty, expected: 0 },
    ];

    describe('when request succeeds', () => {
      const mockRestMethod = (method: string, seed: SeedRest<Post[]>) => {
        switch (method) {
          case 'GET':
            mockRestGet(seed);
            break;
          case 'POST':
            mockRestPost(seed);
            break;
        }
      };

      it.each(mockTheories)(
        'should return data with length of $expected when request is mocked $when',
        async ({ seed, expected }) => {
          // arrange
          if (seed) mockRestMethod(methodTheory.method, seed);

          // act
          const { result } = await executeHookMethod(methodTheory.method);

          // assert
          await waitFor(() => {
            const actualLength = result.current.data.length;
            expect(actualLength).toEqual(expected);
          });
        }
      );
    });

    describe('when request fails', () => {
      const customError = { message: 'custom error message' };
      const errorTheories = [
        { expected: 'generic error', when: 'by default', error: genericError },
        { expected: 'custom error', when: 'custom error is provided', error: customError },
      ];

      it.each(errorTheories)('should return $expected when $when', async errorTheory => {
        // arrange
        const errorOptions = {
          method: methodTheory.method,
          error: errorTheory.error,
        };

        mockRestError(url, errorOptions);

        // act
        const { result } = await executeHookMethod(methodTheory.method);

        // assert
        await waitFor(() => {
          expect(result.current.error).toBeDefined();
        });
      });
    });
  });
});
