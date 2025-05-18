import { useMutation, useQueryClient } from 'react-query';

interface Props {
  cacheKey: string;
  url: string;
  onSuccess?: () => void;
  invalidateQueries?: string[];
}

export default function usePut<TData, TResponse>({
  cacheKey,
  url,
  onSuccess,
  invalidateQueries = [],
}: Props) {
  const queryClient = useQueryClient();

  async function putRequest(data: TData) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const body = await response.json();
      const message = body?.message;
      throw new Error(message);
    }

    return (await response.json()) as Promise<TResponse>;
  }

  const { mutate, mutateAsync, isLoading, isError, error, isSuccess, data, reset } = useMutation<
    TResponse,
    Error,
    TData
  >((data: TData) => putRequest(data), {
    mutationKey: [cacheKey],
    onSuccess: () => {
      // Invalidate the specified queries to refresh data
      if (invalidateQueries.length > 0) {
        invalidateQueries.forEach(query => {
          queryClient.invalidateQueries([query]);
        });
      }

      if (onSuccess) onSuccess();
    },
  });

  return {
    update: mutate, // Simple mutate function for most use cases
    updateAsync: mutateAsync, // Promise-based version for when you need to chain operations
    isUpdating: isLoading,
    isError,
    error,
    isSuccess,
    data,
    reset,
  };
}
