// hooks/useUpdateDeck.ts
import errorGenerator from '@/utils/errorGenerator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { DecksService, DeckUpdate } from '../api';

interface UpdateDeckVariables {
  deckId: string;
  deckData: DeckUpdate;
}

/**
 * @hook useUpdateDeck
 *
 * This hook provides a function to update a deck's details.
 * On success, it invalidates the queries for the deck list and the specific
 * deck detail to ensure the UI is updated with fresh data.
 */
export const useUpdateDeck = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateDeck,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ deckId, deckData }: UpdateDeckVariables) =>
      DecksService.updateDeck(deckId, deckData),
    onSuccess: (data, variables) => {
      // After updating, invalidate both the main deck list and the specific deck detail
      queryClient.invalidateQueries({ queryKey: ['decks'] });
      queryClient.invalidateQueries({ queryKey: ['deck', variables.deckId] });
    },
    onError: err => {
      Alert.alert('Update Failed', errorGenerator(err));
    },
  });

  return {
    updateDeck,
    isLoading,
    error: error ? errorGenerator(error) : null,
  };
};
