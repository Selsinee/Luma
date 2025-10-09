// hooks/useRecentDecks.ts
import { DecksService } from '../api';
import { useApiQuery } from './useApiQuery';

/**
 * @hook useRecentDecks
 *
 * This hook fetches the list of the most recently studied decks.
 */
export const useRecentDecks = () => {
  return useApiQuery(
    ['decks', 'recent'],
    () => DecksService.getRecentlyStudiedDecks(),
    { staleTime: 1000 * 60 }, // Cache for 1 minute
  );
};
