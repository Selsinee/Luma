// DeckCard.tsx
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DeckCardProps {
  title: string;
  description: string;
  lastStudied: string;
  currentProgress: number;
  totalItems: number;
}

const DeckCard: React.FC<DeckCardProps> = ({
  title,
  description,
  lastStudied,
  currentProgress,
  totalItems,
}) => {
  const percentage = Math.round((currentProgress / totalItems) * 100);
  const router = useRouter();

  return (
    <View style={styles.cardContainer}>
      {/* Top Section: Icon, Title, Description */}
      <View style={styles.deckInfoRow}>
        <View style={styles.iconContainer}>
          {/* Changed component from Icon to Feather */}
          <Feather name="book-open" size={20} color={Colors.primary} />
        </View>
        <View style={styles.deckTextContainer}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckDescription}>{description}</Text>
        </View>
      </View>

      {/* Middle Section: Stats */}
      <View style={styles.statsRow}>
        <View style={styles.leftStats}>
          {/* Changed component from Icon to Feather */}
          <Feather name="clock" size={14} color="#8A8A8A" />
          <Text style={styles.statText}>{lastStudied}</Text>
          <View style={styles.progressBadge}>
            <Text style={styles.progressText}>
              {currentProgress}/{totalItems}
            </Text>
          </View>
        </View>
        <Text style={styles.percentageText}>{percentage}%</Text>
      </View>

      {/* Bottom Section: Action Button */}
      <TouchableOpacity
        style={styles.studyButton}
        onPress={() => {
          router.navigate(`/deck-details`);
        }}
      >
        <Text style={styles.studyButtonText}>Study Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  deckInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  deckTextContainer: {
    flex: 1,
  },
  deckTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deckDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  leftStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#8A8A8A',
    marginLeft: 4,
  },
  progressBadge: {
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft: 12,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8A8A8A',
  },
  studyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  studyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeckCard;
