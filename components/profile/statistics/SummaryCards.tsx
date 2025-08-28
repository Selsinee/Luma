import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatCard from './StatCard';

const SummaryCards: React.FC = () => {
  // In a real app, this data would come from props
  const streak = 7;
  const wordsLearned = 1247;

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <StatCard
          variant="streak"
          value={streak.toString()}
          label="Day Streak"
          iconName="zap"
        />
      </View>
      <View style={styles.cardWrapper}>
        <StatCard
          variant="words"
          value={wordsLearned.toLocaleString()}
          label="Words Learned"
          iconName="cpu"
        />
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
  cardWrapper: {
    flex: 1,
    maxWidth: '49%',
  },
});

export default SummaryCards;
