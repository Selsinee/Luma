// hooks/useDeleteWord.ts
import errorGenerator from '@/utils/errorGenerator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { WordsService } from '../api';

interface DeleteWordVariables {
  deckId: string;
  wordId: string;
}

/**
 * @hook useDeleteWord
 *
 * This hook provides a function to delete a word from a deck.
 * On success, it automatically invalidates the query for the specific deck,
 * causing the word list on the deck details screen to refetch and update.
 */
export const useDeleteWord = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteWord,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: ({ deckId, wordId }: DeleteWordVariables) =>
      WordsService.deleteWord(deckId, wordId),
    onSuccess: (data, variables) => {
      // After a word is deleted, invalidate the specific deck detail query
      // to trigger a refetch on the deck details screen.
      queryClient.invalidateQueries({ queryKey: ['deck', variables.deckId] });
    },
    onError: err => {
      Alert.alert('Deletion Failed', errorGenerator(err));
    },
  });

  return {
    deleteWord,
    isLoading,
    error: error ? errorGenerator(error) : null,
  };
};
