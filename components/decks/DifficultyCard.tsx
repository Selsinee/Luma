import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DifficultyCardProps {
  count: number;
  label: 'Easy' | 'Medium' | 'Hard';
}

const DifficultyCard: React.FC<DifficultyCardProps> = ({ count, label }) => {
  const cardStyle =
    styles[
      `${label.toLowerCase()}Card` as 'easyCard' | 'mediumCard' | 'hardCard'
    ];
  const textStyle =
    styles[
      `${label.toLowerCase()}Text` as 'easyText' | 'mediumText' | 'hardText'
    ];

  return (
    <View style={[styles.card, cardStyle]}>
      <Text style={[styles.count, textStyle]}>{count}</Text>
      <Text style={[styles.label, textStyle]}>{label}</Text>
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
    minHeight: 80,
  },
  easyCard: { backgroundColor: '#E8F5E9' },
  mediumCard: { backgroundColor: '#FFF8E1' },
  hardCard: { backgroundColor: '#FFEBEE' },
  count: { fontSize: 20, fontWeight: 'bold' },
  label: { fontSize: 13, marginTop: 2 },
  easyText: { color: '#2E7D32' },
  mediumText: { color: '#FF8F00' },
  hardText: { color: '#C62828' },
});

export default DifficultyCard;
