import React from 'react';
import { StyleSheet, View } from 'react-native';
import ProfileStatCard from './ProfileStatCard';

// Props for the main widget
interface AllTimeStatsGridProps {
  studyTime: string; // e.g., "156h"
  accuracy: number; // e.g., 87
  bestStreak: number;
  daysActive: number;
}

const AllTimeStatsGrid: React.FC<AllTimeStatsGridProps> = ({
  studyTime,
  accuracy,
  bestStreak,
  daysActive,
}) => {
  return (
    <View style={styles.gridContainer}>
      <View style={styles.row}>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="clock"
            value={studyTime}
            label="Study Time"
          />
        </View>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="trending-up"
            value={`${accuracy}%`}
            label="Accuracy"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="zap"
            value={bestStreak.toString()}
            label="Best Streak"
          />
        </View>
        <View style={styles.cardWrapper}>
          <ProfileStatCard
            iconName="calendar"
            value={daysActive.toString()}
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
