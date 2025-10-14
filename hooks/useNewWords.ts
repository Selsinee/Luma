// hooks/useNewWords.ts
import { UsersService } from '../api'; // 1. Import UsersService instead of GeneralService
import { useApiQuery } from './useApiQuery';

/**
 * @hook useNewWords
 *
 * Fetches a list of new words for the currently authenticated user from
 * their own decks that they have not yet studied.
 */
export const useNewWords = () => {
  return useApiQuery(
    ['words', 'new-for-user'],
    () => UsersService.getUsersMeNewWords(),
    {
      staleTime: 1000 * 60 * 60, // Cache for 1 hour
    },
  );
};
