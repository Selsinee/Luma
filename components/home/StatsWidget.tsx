// StatsCard.tsx
import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

// Prop types remain the same
interface StatsWidgetProps {
  wordsStudied: number;
  dailyGoal: number;
  streak: number;
  totalWords: number;
  weeklyProgress: number;
  weeklyGoal: number;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({
  wordsStudied,
  dailyGoal,
  streak,
  totalWords,
  weeklyProgress,
  weeklyGoal,
}) => {
  // Calculate the fill percentage for the progress circle
  const fillPercentage = (wordsStudied / dailyGoal) * 100;

  return (
    <View style={styles.card}>
      {/* Left Section: Circular Progress */}
      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={100}
          width={10}
          fill={fillPercentage}
          tintColor={Colors.primary} // The color of the progress bar
          backgroundColor="#E8E8F0" // The color of the track
          rotation={0} // Starts from the top
          lineCap="round"
          padding={5}
        ></AnimatedCircularProgress>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>{wordsStudied}</Text>
          <Text style={styles.progressGoalText}>/ {dailyGoal}</Text>
        </View>
        <Text style={styles.progressLabel}>Words studied today</Text>
      </View>

      {/* Right Section: Stats (No changes here) */}
      <View style={styles.statsContainer}>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Streak</Text>
          <Text style={styles.statValue}>{streak} days</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Words</Text>
          <Text style={styles.statValue}>{totalWords.toLocaleString()}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Weekly Goal</Text>
          <Text style={styles.statValue}>
            {weeklyProgress}/{weeklyGoal} days
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
