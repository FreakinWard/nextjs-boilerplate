import { renderHook, waitFor } from '@testing-library/react';
import { UseQueryResult } from 'react-query';

import { AppWrapper as wrapper } from '../test.utils';

/**
 * Renders a hook that returns queried data that is enabled
 * Wraps the hook in AppWrapper and expects the hook to execute expected states
 *
 * @param hookMethod
 * @example const { result } = renderHook(useMyData);
 *
 * @example const { result } = renderHook(() => useMyData(myParam));
 *
 */
// eslint-disable-next-line import/prefer-default-export
export const renderHookQuery = async (hookMethod: () => UseQueryResult) => {
  // arrange
  // act
  const renderHookResult = renderHook(() => hookMethod(), {
    wrapper,
  });

  // assert
  expect(renderHookResult.result.current.isFetching).toBe(true);
  expect(renderHookResult.result.current.data).toBeUndefined();
  expect(renderHookResult.result.current.status).toEqual('loading');

  await waitFor(() => expect(renderHookResult.result.current.isFetched).toBe(true));

  return renderHookResult;
};
