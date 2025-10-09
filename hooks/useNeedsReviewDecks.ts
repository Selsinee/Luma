// hooks/useNeedsReviewDecks.ts
import { DecksService } from '../api';
import { useApiQuery } from './useApiQuery';

/**
 * @hook useNeedsReviewDecks
 *
 * This hook fetches the list of decks that require review
 * (i.e., have not been studied recently).
 */
export const useNeedsReviewDecks = () => {
  return useApiQuery(
    ['decks', 'needs-review'],
    // The function that fetches the data from the new endpoint
    () => DecksService.getDecksNeedingReview(),
    { staleTime: 1000 * 60 * 5 }, // Data is fresh for 5 minutes
  );
};
