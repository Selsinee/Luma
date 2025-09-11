import { useAchievements } from '@/hooks/useAchivements';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AchievementCard from './AchievementCard';

const AchievementsList: React.FC = () => {
  // In a real app, this data would come from props or an API
  const { data } = useAchievements();
  const unlockedCount = data?.filter(a => a.is_unlocked).length ?? 0;
  const totalCount = data?.length ?? 0;
  const progress = totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Your Achievements</Text>
        <Text style={styles.subtitle}>
          {unlockedCount} of {totalCount} unlocked
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
      {data?.map(a => (
        <AchievementCard {...a} key={a.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 4,
    marginBottom: 12,
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E8E8F0',
    borderRadius: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A9B0D2',
    borderRadius: 4,
  },
  list: {
    paddingBottom: 20,
  },
});

export default AchievementsList;
