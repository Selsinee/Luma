import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DailyProgress: React.FC = () => {
  const { data } = useUserStats();
  const { user } = useAuth();
  const { words_studied_today = 0 } = data || {};
  const { daily_goal = 0, streak } = user || {};

  const percentage =
    daily_goal > 0 ? Math.round((words_studied_today / daily_goal) * 100) : 0;
  const remaining = daily_goal - words_studied_today;
  const fillWidthPercentage = Math.min(percentage, 100);

  return (
    <View style={styles.card}>
      {/* Top section with title and streak */}
      <View style={styles.topRow}>
        <View style={styles.titleSection}>
          <View style={styles.iconContainer}>
            <Feather name="activity" size={20} color="#6A67F3" />
          </View>
          <View>
            <Text style={styles.title}>Today&#39;s Progress</Text>
            <Text style={styles.subtitle}>
              {words_studied_today} of {daily_goal} words
            </Text>
          </View>
        </View>

        <View style={styles.streakSection}>
          <View style={styles.streakValueContainer}>
            <Feather name="zap" size={16} color="#FF6F00" />
            <Text style={styles.streakNumber}>{streak}</Text>
          </View>
          <Text style={styles.streakText}>day streak</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[styles.progressBarFill, { width: `${fillWidthPercentage}%` }]}
        />
      </View>

      {/* Bottom section with percentage and remaining */}
      <View style={styles.bottomRow}>
        <Text style={styles.bottomText}>{percentage}% complete</Text>
        <Text style={styles.bottomText}>{remaining} words remaining</Text>
      </View>
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
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  streakSection: {
    alignItems: 'flex-end',
  },
  streakValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F00',
    marginLeft: 4,
  },
  streakText: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 2,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E8E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A9B0D2',
    borderRadius: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  bottomText: {
    fontSize: 12,
    color: '#8A8A8A',
  },
});

export default DailyProgress;
