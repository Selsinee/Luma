// hooks/useAlmostMasteredDecks.ts
import { DecksService } from '../api';
import { useApiQuery } from './useApiQuery';

/**
 * @hook useAlmostMasteredDecks
 *
 * This hook fetches the list of decks that the user has almost mastered.
 */
export const useAlmostMasteredDecks = () => {
  return useApiQuery(
    ['decks', 'almost-mastered'],
    () => DecksService.getAlmostMasteredDecks(),
    { staleTime: 1000 * 60 * 5 }, // Cache for 5 minutes
  );
};
