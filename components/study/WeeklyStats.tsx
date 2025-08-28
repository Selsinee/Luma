import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StatBlock from './StatBlock';

// Props for the main widget
interface WeeklyStatsProps {
  wordsStudied: number;
  avgSessions: number;
  dailyAverage: string; // e.g., "23m"
  accuracyRate: number; // e.g., 87 for 87%
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({
  wordsStudied,
  avgSessions,
  dailyAverage,
  accuracyRate,
}) => {
  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Feather name="calendar" size={18} color="#555" />
        <Text style={styles.headerTitle}>This Week</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statsRow}>
          <StatBlock value={wordsStudied.toString()} label="Words Studied" />
          <StatBlock value={avgSessions.toString()} label="Avg. Sessions" />
        </View>
        <View style={styles.statsRow}>
          <StatBlock value={dailyAverage} label="Daily Average" />
          <StatBlock value={`${accuracyRate}%`} label="Accuracy Rate" />
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
