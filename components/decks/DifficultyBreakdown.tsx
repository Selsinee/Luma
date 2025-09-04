import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// --- Reusable sub-component for a single difficulty row ---
interface DifficultyRowProps {
  label: string;
  count: number;
  color: string;
}

const DifficultyRow: React.FC<DifficultyRowProps> = ({
  label,
  count,
  color,
}) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.labelContainer}>
        <View style={[styles.dot, { backgroundColor: color }]} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

// --- Main component that renders the card ---
interface DifficultyBreakdownListProps {
  easyCount: number;
  mediumCount: number;
  hardCount: number;
}

const DifficultyBreakdownList: React.FC<DifficultyBreakdownListProps> = ({
  easyCount,
  mediumCount,
  hardCount,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather name="layers" size={18} color="#A9B0D2" />
        <Text style={styles.headerTitle}>Difficulty Breakdown</Text>
      </View>

      <View style={styles.listContainer}>
        <DifficultyRow
          label="Easy Words"
          count={easyCount}
          color={Colors.pastel.easy}
        />
        <DifficultyRow
          label="Medium Words"
          count={mediumCount}
          color={Colors.pastel.medium}
        />
        <DifficultyRow
          label="Hard Words"
          count={hardCount}
          color={Colors.pastel.hard}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // Soft off-white
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  header: {
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
  listContainer: {
    // Container for the rows
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default DifficultyBreakdownList;
