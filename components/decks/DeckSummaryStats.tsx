import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// --- Reusable sub-component for a single stat box ---
interface StatBoxProps {
  value: number;
  label: string;
}

const StatBox: React.FC<StatBoxProps> = ({ value, label }) => {
  return (
    <View style={styles.box}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

// --- Main component that renders the two stat boxes ---
interface DeckSummaryStatsProps {
  wordsMastered: number;
  stillLearning: number;
}

const DeckSummaryStats: React.FC<DeckSummaryStatsProps> = ({
  wordsMastered,
  stillLearning,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.boxWrapper}>
        <StatBox value={wordsMastered} label="Words Mastered" />
      </View>
      <View style={styles.boxWrapper}>
        <StatBox value={stillLearning} label="Still Learning" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  boxWrapper: {
    flex: 1,
    maxWidth: '48%',
  },
  box: {
    backgroundColor: '#FFFFFF', // Soft off-white
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A9B0D2', // Muted purple
  },
  label: {
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 4,
  },
});

export default DeckSummaryStats;
