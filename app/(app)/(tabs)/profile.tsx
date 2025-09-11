import AchievementsList from '@/components/profile/achievement/AchievementsList';
import ProfileTabs, { Tab } from '@/components/profile/ProfileTabs';
import AccountSection from '@/components/profile/settings/AccountSection';
import PreferencesSection from '@/components/profile/settings/PreferenceSection';
import SettingsFooter from '@/components/profile/settings/SettingsFooter';
import StudySettings from '@/components/profile/settings/StudySettings';
import AllTimeStatsGrid from '@/components/profile/statistics/AllTimeStatsGrid';
import DifficultyBreakdownChart from '@/components/profile/statistics/DifficultyBreakdownChart';
import MonthlyProgressChart from '@/components/profile/statistics/MonthlyProgressChart';
import SummaryCards from '@/components/profile/statistics/SummaryCards';
import WeeklyActivityChart from '@/components/profile/statistics/WeeklyActivityChart';
import WeeklyGoalProgress from '@/components/profile/statistics/WeeklyGoalProgress';
import UserProfileHeader from '@/components/profile/UserProfileHeader';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Content for the 'Stats' tab ---
const StatsContent = () => (
  <>
    <SummaryCards />
    <WeeklyGoalProgress />
    <AllTimeStatsGrid />
    <WeeklyActivityChart />
    <MonthlyProgressChart />
    <DifficultyBreakdownChart />
  </>
);

// --- Content for the 'Achievements' tab ---
const AchievementsContent = () => <AchievementsList />;

// --- Content for the 'Settings' tab ---
const SettingsContent = () => (
  <>
    <AccountSection />
    <PreferencesSection />
    <StudySettings />
    <SettingsFooter />
  </>
);

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('stats');
  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();
  const { refetchUser } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['userStats'] }),
      queryClient.invalidateQueries({ queryKey: ['achievements'] }),
      refetchUser,
    ]);
    setIsRefreshing(false);
  }, []);

  return (
    <ScrollView
      style={[styles.container, { marginTop: insets.top }]}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
          colors={[Colors.primary]}
        />
      }
    >
      <UserProfileHeader />
      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'stats' && <StatsContent />}
      {activeTab === 'achievements' && <AchievementsContent />}
      {activeTab === 'settings' && <SettingsContent />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    padding: 16,
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  placeholderText: {
    fontSize: 16,
    color: '#8A8A8A',
  },
});
