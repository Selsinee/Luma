// StatsCard.tsx
import Colors from '@/constants/Colors';
import { useHomeStats } from '@/hooks/useHomeStats';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const StatsWidget: React.FC = () => {
  const { stats } = useHomeStats();
  const fillPercentage = (stats.wordsStudied / stats.dailyGoal) * 100;

  return (
    <View style={styles.card}>
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={100}
          width={10}
          fill={fillPercentage}
          tintColor={Colors.primary}
          backgroundColor="#E8E8F0"
          rotation={0}
          lineCap="round"
          padding={5}
        ></AnimatedCircularProgress>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{stats.wordsStudied}</Text>
          <Text style={styles.progressGoalText}>/ {stats.dailyGoal}</Text>
        </View>
        <Text style={styles.progressLabel}>Words studied today</Text>
      </View>

      {/* Right Section: Stats (No changes here) */}
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>{stats.streak} days</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Words</Text>
          <Text style={styles.statValue}>
            {stats.totalWords.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Weekly Goal</Text>
          <Text style={styles.statValue}>
            {stats.weeklyProgress}/{stats.weeklyGoal} days
          </Text>
        </View>
      </View>
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundGray,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  progressContainer: {
    alignItems: 'center',
    marginRight: 24,
  },
  progressTextContainer: {
    position: 'absolute',
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  progressGoalText: {
    fontSize: 14,
    color: '#717182',
  },
  progressLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#717182',
  },
  statsContainer: {
    flex: 1,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#717182',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A0A0A',
  },
});

export default StatsWidget;
