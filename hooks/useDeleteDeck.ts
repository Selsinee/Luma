// hooks/useDeleteDeck.ts
import errorGenerator from '@/utils/errorGenerator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { DecksService } from '../api';

/**
 * @hook useDeleteDeck
 *
 * This hook provides a function to delete a deck.
 * On success, it automatically invalidates the 'decks' query,
 * causing the deck list to refetch and update.
 */
export const useDeleteDeck = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteDeck,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (deckId: string) => DecksService.deleteDeck(deckId),
    onSuccess: () => {
      // After a deck is deleted, invalidate the main decks query
      // to trigger a refetch on the deck list screen.
      queryClient.invalidateQueries({ queryKey: ['decks'] });
    },
    onError: err => {
      Alert.alert('Deletion Failed', errorGenerator(err));
    },
  });

  return {
    deleteDeck,
    isLoading,
    error: error ? errorGenerator(error) : null,
  };
};
