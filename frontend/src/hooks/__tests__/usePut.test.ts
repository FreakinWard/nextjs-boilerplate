import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { mockHttpPutError } from '../../core/msw/mswMock';
import seedUserUpdate, { seedUserUpdateError } from '../../core/msw/seed/seedUserUpdate';
import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import usePut from '../usePut';

describe('usePut', () => {
  mswMock();

  interface UserUpdateData {
    name: string;
    email: string;
  }

  interface UserResponse {
    id: number;
    name: string;
    email: string;
    updatedAt: string;
  }

  it('should update user data and return the response', async () => {
    // arrange
    const invalidateQueriesMock = ['users', `user-1`];
    const onSuccessMock = jest.fn();

    // act
    const { result } = renderHook(
      () =>
        usePut<UserUpdateData, UserResponse>({
          cacheKey: 'updateUser',
          url: seedUserUpdate.clientUrl,
          onSuccess: onSuccessMock,
          invalidateQueries: invalidateQueriesMock,
        }),
      { wrapper }
    );

    // assert - initial state check
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();

    // act - execute the update
    act(() => result.current.update(seedUserUpdate.requestData));

    // assert - Wait for completion
    await waitFor(() => {
      expect(result.current.isUpdating).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });

    // assert
    expect(result.current.data).toEqual(seedUserUpdate.responseData);
    expect(onSuccessMock).toHaveBeenCalledTimes(1);
  });

  it('should return an error when the update fails', async () => {
    // arrange
    mockHttpPutError(seedUserUpdateError.clientUrl);

    // act
    const { result } = renderHook(
      () =>
        usePut<UserUpdateData, UserResponse>({
          cacheKey: 'updateUserError',
          url: seedUserUpdateError.clientUrl,
        }),
      { wrapper }
    );

    // assert - initial state check
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.isError).toBe(false);

    // act
    await act(async () => {
      try {
        await result.current.updateAsync(seedUserUpdateError.requestData);
        // If we get here, the test should fail
        expect('No error thrown').toBe('Error should have been thrown');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    // assert
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error.message).toBe(seedUserUpdateError.expectedError.message);
  });

  it('should return expected error from message body when the update fails', async () => {
    // arrange
    mockHttpPutError(seedUserUpdateError.clientUrl);

    // act
    const { result } = renderHook(
      () =>
        usePut<UserUpdateData, UserResponse>({
          cacheKey: 'updateUserError',
          url: seedUserUpdateError.clientUrl,
        }),
      { wrapper }
    );

    // assert - initial state check
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.isError).toBe(false);

    // act
    await act(async () => {
      try {
        await result.current.updateAsync(seedUserUpdateError.requestData);
        // If we get here, the test should fail
        expect('No error thrown').toBe('Error should have been thrown');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    // assert - Error state
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.isSuccess).toBe(false);
    expect(result.current.error.message).toBe(seedUserUpdateError.expectedError.message);
  });

  it('should provide an async update method for promise chains', async () => {
    // arrange
    let chainedValue = null;

    // act
    const { result } = renderHook(
      () =>
        usePut<UserUpdateData, UserResponse>({
          cacheKey: 'updateUserAsync',
          url: seedUserUpdate.clientUrl,
        }),
      { wrapper }
    );

    await act(async () => {
      try {
        const response = await result.current.updateAsync(seedUserUpdate.requestData);
        chainedValue = response.id;
      } catch (err) {
        // Handle error in real code
      }
    });

    // assert - wait for completion
    await waitFor(() => {
      expect(result.current.isUpdating).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });

    // assert
    expect(chainedValue).toBe(seedUserUpdate.responseData.id);
    expect(result.current.data).toEqual(seedUserUpdate.responseData);
  });

  it('should reset the mutation state', async () => {
    // arrange
    const { result } = renderHook(
      () =>
        usePut<UserUpdateData, UserResponse>({
          cacheKey: 'updateUserReset',
          url: seedUserUpdate.clientUrl,
        }),
      { wrapper }
    );

    // act - execute the update
    act(() => result.current.update(seedUserUpdate.requestData));

    // assert - wait for completion
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(seedUserUpdate.responseData);
    });

    // act - reset the state
    act(() => result.current.reset());

    // assert
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });
});
