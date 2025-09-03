import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// --- Reusable sub-component for a single statistic row ---
interface StatRowProps {
  label: string;
  value: string;
}

const StatRow: React.FC<StatRowProps> = ({ label, value }) => {
  return (
    <View style={styles.rowContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

// --- Main component that renders the card ---
interface StudyStatisticsProps {
  studiedToday: number;
  lastStudied: string;
  overallProgress: number;
  completionRate: number;
}

const StudyStatistics: React.FC<StudyStatisticsProps> = ({
  studiedToday,
  lastStudied,
  overallProgress,
  completionRate,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather name="clock" size={18} color={Colors.primary} />
        <Text style={styles.headerTitle}>Study Statistics</Text>
      </View>

      <View style={styles.statsContainer}>
        <StatRow label="Studied Today" value={`${studiedToday} words`} />
        <StatRow label="Last Studied" value={lastStudied} />
        <StatRow label="Overall Progress" value={`${overallProgress}%`} />
        <StatRow label="Completion Rate" value={`${completionRate}%`} />
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
  statsContainer: {
    // Container for the rows of stats
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default StudyStatistics;
