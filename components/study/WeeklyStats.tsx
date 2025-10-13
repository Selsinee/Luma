import Colors from '@/constants/Colors';
import { useWeeklyStats } from '@/hooks/useWeeklyStats';
import { formatStudyTime } from '@/utils/formatStudyTime';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import StatBlock from './StatBlock';

const WeeklyStats: React.FC = () => {
  const { data: stats, isLoading, error } = useWeeklyStats();

  if (isLoading) {
    return (
      <View style={styles.widgetContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error || !stats) {
    return null;
  }

  const formattedDailyAverage = formatStudyTime(stats.daily_average_seconds);

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Feather name="calendar" size={18} color="#555" />
        <Text style={styles.headerTitle}>This Week</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <StatBlock
            value={stats.words_studied.toString()}
            label="Words Studied"
          />
          <StatBlock
            value={stats.avg_sessions.toFixed(1)}
            label="Avg. Sessions"
          />
        </View>
        <View style={styles.statsRow}>
          <StatBlock value={formattedDailyAverage} label="Daily Average" />
          <StatBlock
            value={`${stats.accuracy_rate.toFixed(0)}%`}
            label="Accuracy Rate"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: '#FFFFFF', // A very light off-white
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  statsGrid: {
    // Container for the rows of stats
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Distributes space between blocks
    marginVertical: 8,
  },
});

export default WeeklyStats;
