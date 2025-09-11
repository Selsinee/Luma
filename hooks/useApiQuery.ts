// hooks/useApiQuery.ts
import errorGenerator from '@/utils/errorGenerator';
import { QueryKey, useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

/**
 * @hook useApiQuery
 *
 * A reusable custom hook that wraps TanStack Query's `useQuery`.
 * It provides a consistent way to fetch data from the API and automatically
 * formats any potential API errors into a user-friendly string.
 *
 * @param queryKey - The unique key for the query, used for caching.
 * @param queryFn - The asynchronous function that fetches the data.
 * @param options - Optional TanStack Query options (e.g., staleTime).
 * @returns The result of the `useQuery` hook with the error pre-formatted.
 */
export const useApiQuery = <TData>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: object,
): Omit<UseQueryResult<TData, unknown>, 'error'> & { error: string | null } => {
  const queryResult = useQuery<TData, unknown>({
    queryKey,
    queryFn,
    ...options,
  });

  // Format the error only when it changes
  const error = useMemo(() => {
    if (queryResult.error) {
      return errorGenerator(queryResult.error);
    }
    return null;
  }, [queryResult.error]);

  return {
    ...queryResult,
    error,
  };
};
