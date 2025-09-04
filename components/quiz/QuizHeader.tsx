import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeLeft: number;
  onBackPress: () => void;
  onNextPress: () => void;
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  currentQuestion,
  totalQuestions,
  timeLeft,
  onBackPress,
  onNextPress,
}) => {
  const insets = useSafeAreaInsets();
  const progress =
    totalQuestions > 0 ? (currentQuestion / totalQuestions) * 100 : 0;

  // Format time to MM:SS
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <View style={[styles.container, { marginTop: insets.top }]}>
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton} onPress={onBackPress}>
          <Feather name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.timerContainer}>
          <Feather name="clock" size={16} color="#D32F2F" />
          <Text style={styles.timerText}>
            {minutes}:{seconds}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.iconButton, styles.nextButton]}
          onPress={onNextPress}
        >
          <Feather name="chevron-right" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <Text style={styles.progressText}>
        Question {currentQuestion} of {totalQuestions}
      </Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
    width: 32, // Give a consistent width
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // ✨ NEW: Style for the next button ✨
  nextButton: {
    backgroundColor: '#A9B0D2',
    borderRadius: 16, // Make it a circle
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  timerText: { color: '#D32F2F', fontWeight: '600', marginLeft: 4 },
  progressText: {
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 12,
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E8E8F0',
    borderRadius: 3,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A9B0D2',
    borderRadius: 3,
  },
});
