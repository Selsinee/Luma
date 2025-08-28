import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatBlockProps {
  value: string;
  label: string;
}

const StatBlock: React.FC<StatBlockProps> = ({ value, label }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Each block will take equal space in a row
    alignItems: 'center',
    paddingVertical: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    color: '#A9B0D2',
  },
  label: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 4,
  },
});

export default StatBlock;
