import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Props for a single achievement card
export interface AchievementCardProps {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Feather.glyphMap;
  isUnlocked: boolean;
  earnedDate?: string; // Optional, only for unlocked achievements
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  iconName,
  isUnlocked,
  earnedDate,
}) => {
  return (
    <View style={[styles.card, !isUnlocked && styles.lockedCard]}>
      <View style={styles.iconContainer}>
        <Feather
          name={iconName}
          size={24}
          color={isUnlocked ? '#6A67F3' : '#B0B0B0'}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {isUnlocked && (
            <Feather
              name="check-circle"
              size={16}
              color="#2E7D32"
              style={styles.checkIcon}
            />
          )}
        </View>
        <Text style={styles.description}>{description}</Text>
        {isUnlocked && earnedDate && (
          <Text style={styles.earnedDate}>Earned on {earnedDate}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    marginBottom: 12,
  },
  lockedCard: {
    opacity: 0.6,
  },

  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F0F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  checkIcon: {
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  earnedDate: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 4,
  },
});

export default AchievementCard;
