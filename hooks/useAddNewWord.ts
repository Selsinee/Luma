// hooks/useAddWord.ts
import errorGenerator from '@/utils/errorGenerator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { WordCreate, WordsService } from '../api';

/**
 * @hook useAddWord
 *
 * This hook provides a function to add a new word to a specific deck.
 * It uses TanStack Query's `useMutation` to handle the API call.
 * On success, it automatically invalidates the query for the specific deck,
 * causing the word list to refetch and update.
 *
 * @param deckId - The ID of the deck to which the word will be added.
 */
export const useAddWord = (deckId: string) => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: addWord,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (wordData: WordCreate) =>
      WordsService.createWord(deckId, wordData),
    onSuccess: () => {
      // After a word is added, invalidate the specific deck detail query
      queryClient.invalidateQueries({ queryKey: ['deck', deckId] });
    },
    onError: err => {
      Alert.alert('Error', errorGenerator(err));
    },
  });

  return {
    addWord,
    isLoading,
    error: error ? errorGenerator(error) : null,
  };
};
