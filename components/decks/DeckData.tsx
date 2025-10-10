import { DeckDetail } from '@/api';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DifficultyCard from './DifficultyCard';

interface DeckDetailsProps extends DeckDetail {}

interface StatDisplayProps {
  value: string;
  label: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ value, label }) => {
  return (
    <View style={styles.statContainer}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const DeckData: React.FC<DeckDetailsProps> = ({
  description,
  category,
  words_learning,
  words_mastered,
  words = [],
  easy_count,
  medium_count,
  hard_count,
}) => {
  const totalWords = words.length ?? 0;
  const masteryPercentage = totalWords
    ? Math.round((words_mastered / totalWords) * 100)
    : 0;
  return (
    <View>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.statsRow}>
        <StatDisplay value={totalWords.toString()} label="words" />
        <StatDisplay value={`${masteryPercentage}%`} label="Mastery" />
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressLabels}>
          <Text style={styles.progressTitle}>Overall Progress</Text>
          <Text style={styles.progressSubtitle}>
            {words_mastered}/{totalWords} words mastered
          </Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${masteryPercentage}%` }]}
          />
        </View>
      </View>

      <View>
        <Text style={styles.difficultyTitle}>Difficulty Distribution</Text>
        <View style={styles.difficultyCardsRow}>
          <DifficultyCard count={easy_count} label="easy" />
          <DifficultyCard count={medium_count} label="medium" />
          <DifficultyCard count={hard_count} label="hard" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFFFFF' },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  progressContainer: { marginBottom: 24 },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressTitle: { fontSize: 14, fontWeight: '500', color: '#333' },
  progressSubtitle: { fontSize: 13, color: '#8A8A8A' },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E8E8F0',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A9B0D2',
    borderRadius: 4,
  },
  difficultyTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  difficultyCardsRow: { flexDirection: 'row' },
  statContainer: {
    alignItems: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 2,
  },
});

export default DeckData;
