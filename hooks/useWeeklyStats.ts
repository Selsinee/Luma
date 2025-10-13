// hooks/useWeeklyStats.ts
import { UsersService } from '../api';
import { useApiQuery } from './useApiQuery';

/**
 * @hook useWeeklyStats
 *
 * This hook fetches the user's study statistics for the last 7 days.
 */
export const useWeeklyStats = () => {
  return useApiQuery(
    ['stats', 'weekly'],
    () => UsersService.getWeeklyStats(),
    { staleTime: 1000 * 60 * 5 }, // Cache for 5 minutes
  );
};
