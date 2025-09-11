// hooks/useUserStats.ts
import { UsersService } from '../api';
import { useApiQuery } from './useApiQuery';

export const useUserStats = () => {
  return useApiQuery(['userStats'], () => UsersService.getStats());
};
