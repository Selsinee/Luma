import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Props for the Weekly Goal Progress component
interface WeeklyGoalProgressProps {
  currentWords: number;
  weeklyGoal: number;
}

const WeeklyGoalProgress: React.FC<WeeklyGoalProgressProps> = ({
  currentWords,
  weeklyGoal,
}) => {
  // Calculate percentage, capping it at 100% for the visual fill
  const percentage =
    weeklyGoal > 0 ? Math.round((currentWords / weeklyGoal) * 100) : 0;
  const progressBarFillWidth = Math.min(percentage, 100);
  const goalAchieved = currentWords >= weeklyGoal;

  return (
    <View style={styles.card}>
      {/* Header Section */}
      <View style={styles.headerRow}>
        <Feather name="target" size={18} color="#555" />
        <Text style={styles.headerTitle}>Weekly Goal Progress</Text>
      </View>

      {/* Progress Info */}
      <View style={styles.progressInfoRow}>
        <Text style={styles.progressLabel}>This Week</Text>
        <Text style={styles.progressText}>
          {currentWords}/{weeklyGoal} words
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${progressBarFillWidth}%` },
          ]}
        />
      </View>

      {/* Goal Achieved Message */}
      {goalAchieved && (
        <View style={styles.goalAchievedContainer}>
          <Text style={styles.goalAchievedText}>Goal achieved! 🎉</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  progressInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E8E8F0', // Light grey background for the bar
    borderRadius: 4,
    overflow: 'hidden', // Ensures the fill stays within the rounded corners
    marginBottom: 12,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A9B0D2', // Muted purple for the progress fill
    borderRadius: 4,
  },
  goalAchievedContainer: {
    alignItems: 'flex-start', // Align to left as per UI
  },
  goalAchievedText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
});

export default WeeklyGoalProgress;
