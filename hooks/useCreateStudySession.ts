// hooks/useCreateStudySession.ts
import errorGenerator from '@/utils/errorGenerator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert } from 'react-native';
import { StudyService, StudySessionCreate } from '../api';

/**
 * @hook useCreateStudySession
 *
 * This hook provides a function to create a new study session record.
 * On success, it can optionally invalidate queries to refetch related data,
 * such as user stats.
 */
export const useCreateStudySession = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createStudySession,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: (sessionData: StudySessionCreate) =>
      StudyService.logStudySession(sessionData),
    onSuccess: () => {
      // After a session is created, invalidate user stats to show fresh data
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
      queryClient.invalidateQueries({ queryKey: ['decks'] }); // Also invalidate decks to update "last_studied"
    },
    onError: err => {
      Alert.alert(
        'Sync Error',
        `Could not save study session: ${errorGenerator(err)}`,
      );
    },
  });

  return {
    createStudySession,
    isLoading,
    error: error ? errorGenerator(error) : null,
  };
};
