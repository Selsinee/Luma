// hooks/useDecks.ts
import { DecksService } from '../api';
import { useApiQuery } from './useApiQuery'; // 1. Import the reusable hook

/**
 * @hook useDecks
 *
 * This hook fetches the list of all decks for the currently authenticated user.
 * It uses the generic useApiQuery hook to handle the API call, caching,
 * and error formatting.
 */
export const useDecks = () => {
  return useApiQuery(['decks'], () => DecksService.getDecksByUser());
};
