// hooks/useAchievements.ts
import { UsersService } from '../api';
import { useApiQuery } from './useApiQuery';

/**
 * @hook useAchievements
 *
 * This hook is responsible for fetching the list of all achievements,
 * including the user's unlock status for each one. It uses TanStack Query
 * to cache the data, preventing multiple fetches on the same screen.
 */
export const useAchievements = () => {
  return useApiQuery(
    ['achievements'],
    () => UsersService.getAchievements(),
    { staleTime: 1000 * 60 * 2 }, // Data is considered fresh for 2 minutes
  );
};
