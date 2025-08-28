import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AchievementCard, { AchievementCardProps } from './AchievementCard';

// Mock data for demonstration
const MOCK_ACHIEVEMENTS: AchievementCardProps[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Learn your first 10 words',
    iconName: 'star',
    isUnlocked: true,
    earnedDate: '1/15/2024',
  },
  {
    id: '2',
    title: 'Word Master',
    description: 'Learn 100 words',
    iconName: 'award',
    isUnlocked: true,
    earnedDate: '2/20/2024',
  },
  {
    id: '3',
    title: 'Streak Warrior',
    description: 'Maintain a 7-day streak',
    iconName: 'zap',
    isUnlocked: true,
    earnedDate: '3/1/2024',
  },
  {
    id: '4',
    title: 'Polyglot',
    description: 'Study 3 different languages',
    iconName: 'globe',
    isUnlocked: false,
  },
  {
    id: '5',
    title: 'Dedicated Learner',
    description: 'Study for 30 consecutive days',
    iconName: 'calendar',
    isUnlocked: false,
  },
];

const AchievementsList: React.FC = () => {
  // In a real app, this data would come from props or an API
  const achievements = MOCK_ACHIEVEMENTS;
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const totalCount = achievements.length;
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
      {achievements.map(a => (
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
