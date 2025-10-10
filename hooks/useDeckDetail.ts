// hooks/useDeckDetail.ts
import { DecksService } from '../api';
import { useApiQuery } from './useApiQuery';

/**
 * @hook useDeckDetail
 *
 * This hook fetches the detailed information for a single deck,
 * including its words and calculated stats.
 *
 * @param deckId - The ID of the deck to fetch.
 */
export const useDeckDetail = (deckId: string) => {
  return useApiQuery(
    // The queryKey includes the deckId to ensure each deck is cached individually.
    ['deck', deckId],
    // The queryFn calls the specific API endpoint for getting a deck by its ID.
    () => DecksService.getDeckById(deckId),
    {
      // This option prevents the query from running if the deckId is not yet available.
      enabled: !!deckId,
    },
  );
};
