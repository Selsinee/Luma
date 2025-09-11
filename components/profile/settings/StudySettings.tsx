import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ChangeGoalBottomSheet, {
  ChangeGoalSheetHandle,
} from './ChangeGoalBottomSheet';

const StudySettings: React.FC = () => {
  const { user } = useAuth();
  const changeGoalSheetRef = useRef<ChangeGoalSheetHandle>(null);
  console.log(user);

  return (
    <View style={styles.card}>
      <ChangeGoalBottomSheet
        ref={changeGoalSheetRef}
        initialGoal={user?.daily_goal ?? 0}
      />
      {/* Header */}
      <View style={styles.header}>
        <Feather name="book-open" size={18} color="#555" />
        <Text style={styles.headerTitle}>Study Settings</Text>
      </View>

      {/* Goal Display */}
      <View style={styles.goalContainer}>
        <Text style={styles.goalLabel}>Daily Goal</Text>
        <View style={styles.goalValueRow}>
          <Text style={styles.goalValue}>{user?.daily_goal}</Text>
          <Text style={styles.goalUnit}>words per day</Text>
        </View>
      </View>

      {/* Change Goal Button */}
      <TouchableOpacity
        style={styles.changeGoalButton}
        onPress={() => {
          changeGoalSheetRef.current?.present();
        }}
      >
        <Text style={styles.changeGoalButtonText}>Change Goal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // Soft off-white background
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  goalContainer: {
    alignItems: 'flex-start', // Align content to the left
    marginBottom: 16,
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  goalValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline', // Aligns the bottom of the number and text
    marginTop: 4,
  },
  goalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A9B0D2',
  },
  goalUnit: {
    fontSize: 14,
    color: '#8A8A8A',
    marginLeft: 8,
  },
  changeGoalButton: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  changeGoalButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default StudySettings;
