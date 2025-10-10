// hooks/useDecks.ts
import { keepPreviousData } from '@tanstack/react-query';
import { DecksService } from '../api';
import { useApiQuery } from './useApiQuery';

interface DeckFilters {
  category?: string;
  query?: string;
}

/**
 * @hook useDecks
 *
 * This hook fetches the list of all decks for the currently authenticated user.
 * It can be filtered by category and a search query.
 *
 * @param filters - An object containing optional 'category' and 'query' strings.
 */
export const useDecks = (filters: DeckFilters = {}) => {
  const { category, query } = filters;

  // If the category is 'All', don't send a filter to the API
  const filterCategory = category === 'All' ? undefined : category;

  return useApiQuery(
    ['decks', filterCategory, query],

    // The queryFn passes both filters to the API service function
    () => DecksService.getDecksByUser(filterCategory, query),
    {
      placeholderData: keepPreviousData,
    },
  );
};
