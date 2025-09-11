import { useAuth } from '@/context/AuthContext';
import { useUserStats } from '@/hooks/useUserStats';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import StatCard from './StatCard';

const SummaryCards: React.FC = () => {
  const { user } = useAuth();
  const { data } = useUserStats();
  console.log(data);

  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <StatCard
          variant="streak"
          value={user?.streak.toString() ?? '0'}
          label="Day Streak"
          iconName="zap"
        />
      </View>
      <View style={styles.cardWrapper}>
        <StatCard
          variant="words"
          value={data?.total_words_mastered.toLocaleString() ?? '0'}
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
