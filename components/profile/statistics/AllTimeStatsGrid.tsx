import { useAuth } from '@/context/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { formatStudyTime } from '@/utils/formatStudyTime';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileStatCard from './ProfileStatCard';

const AllTimeStatsGrid: React.FC = () => {
  const { data } = useUserStats();
  const {
    accuracy_rate = 0,
    days_active = 0,
    study_time_seconds = 0,
  } = data ?? {};
  const { user } = useAuth();
  return (
    <View style={styles.gridContainer}>
      <View style={styles.row}>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="clock"
            value={formatStudyTime(study_time_seconds)}
            label="Study Time"
          />
        </View>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="trending-up"
            value={`${accuracy_rate}%`}
            label="Accuracy"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="zap"
            value={user?.best_streak.toString() ?? '0'}
            label="Best Streak"
          />
        </View>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="calendar"
            value={days_active?.toString()}
            label="Days Active"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '49%',
  },
});

export default AllTimeStatsGrid;
