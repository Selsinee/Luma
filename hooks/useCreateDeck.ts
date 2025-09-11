// hooks/useCreateDeck.ts
import errorGenerator from '@/utils/errorGenerator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeckCreate, DecksService } from '../api';

/**
 * @hook useCreateDeck
 *
 * This hook provides a function to create a new deck.
 * It uses TanStack Query's `useMutation` to handle the API call.
 * On success, it automatically invalidates the 'decks' query,
 * causing any component using `useDecks` to refetch and show the new deck.
 */
export const useCreateDeck = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createDeck,
    mutateAsync: createDeckAsync,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (deckData: DeckCreate) => DecksService.createDeck(deckData),
    onSuccess: () => {
      // When a new deck is created, invalidate the 'decks' query cache
      // This will automatically trigger a refetch in any component using useDecks
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
  });

  return {
    createDeck,
    createDeckAsync,
    isLoading,
    error: error ? errorGenerator(error) : null,
  };
};
