import { Difficulty } from '@/interfaces';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { difficultyStyles } from '../tags/DifficultyTag';

interface DifficultyCardProps {
  count: number;
  label: Difficulty;
}

const DifficultyCard: React.FC<DifficultyCardProps> = ({ count, label }) => {
  const diffStyle = difficultyStyles[label];

  return (
    <View style={[styles.card, { backgroundColor: diffStyle.backgroundColor }]}>
      <Text style={[styles.count, { color: diffStyle.color }]}>{count}</Text>
      <Text style={[styles.label, { color: diffStyle.color }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  easyCard: { backgroundColor: '#E8F5E9' },
  mediumCard: { backgroundColor: '#FFF8E1' },
  hardCard: { backgroundColor: '#FFEBEE' },
  count: { fontSize: 20, fontWeight: 'bold' },
  label: { fontSize: 13, marginTop: 2, textTransform: 'capitalize' },
  easyText: { color: '#2E7D32' },
  mediumText: { color: '#FF8F00' },
  hardText: { color: '#C62828' },
});

export default DifficultyCard;
