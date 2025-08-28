import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StudyFeedbackProps {
  reviewedCount: number;
  correctCount: number;
  practiceCount: number;
}

const StudyFeedback: React.FC<StudyFeedbackProps> = ({
  reviewedCount,
  correctCount,
  practiceCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Text style={styles.reviewedValue}>{reviewedCount}</Text>
        <Text style={styles.label}>Reviewed</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.correctValue}>{correctCount}</Text>
        <Text style={styles.label}>Correct</Text>
      </View>
      <View style={styles.statItem}>
        <Text style={styles.practiceValue}>{practiceCount}</Text>
        <Text style={styles.label}>Practice</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8E8F0',
    backgroundColor: '#FFFFFF',
  },
  statItem: {
    alignItems: 'center',
  },
  reviewedValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A9B0D2', // Matches progress bar color
  },
  correctValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32', // Green for correct
  },
  practiceValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D32F2F', // Red for practice
  },
  label: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 4,
  },
});

export default StudyFeedback;
