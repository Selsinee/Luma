// hooks/useHomeStats.ts
import { useAuth } from '@/context/AuthContext';
import { useUserStats } from './useUserStats';

/**
 * @hook useHomeStats
 *
 * This hook gathers and combines all the necessary data for the home
 * screen's StatsWidget from different sources (AuthContext and the user stats API).
 */
export const useHomeStats = () => {
  const { user } = useAuth();
  const { data: stats, isLoading, error } = useUserStats();

  const homeStats = {
    wordsStudied: stats?.words_studied_today ?? 0,
    dailyGoal: user?.daily_goal ?? 0,
    streak: user?.streak ?? 0,
    totalWords: stats?.total_words_mastered ?? 0,
    weeklyProgress: stats?.weekly_words_progress ?? 0,
    weeklyGoal: stats?.weekly_words_goal ?? 0,
  };

  return {
    stats: homeStats,
    isLoading: isLoading || !user, // The hook is loading if either stats or the user are loading
    error,
  };
};
