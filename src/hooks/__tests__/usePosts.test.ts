// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { renderHook } from '@testing-library/react-hooks';

import { queryWrapper as wrapper } from '../../utils/test.utils';
import usePosts from '../usePosts';

describe('usePosts', () => {
  it('should do something', () => {
    // arrange
    // act
    const { result } = renderHook(() => usePosts(), { wrapper });

    // assert
    expect(result.current.data).toEqual('');
  });
});
