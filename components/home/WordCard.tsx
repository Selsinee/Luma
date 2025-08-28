// WordCard.tsx
import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Define the possible difficulty levels as a type
export type Difficulty = 'easy' | 'medium' | 'hard';

// Define the component's props
interface WordCardProps {
  word: string;
  definition: string;
  difficulty: Difficulty;
}

// Helper object to map difficulty to specific styles
const difficultyStyles = {
  easy: {
    backgroundColor: 'rgba(92, 184, 92, 0.15)',
    color: '#3c763d',
  },
  medium: {
    backgroundColor: 'rgba(255, 235, 59, 0.25)',
    color: '#8a6d3b',
  },
  hard: {
    backgroundColor: 'rgba(217, 83, 79, 0.15)',
    color: '#a94442',
  },
};

const WordCard: React.FC<WordCardProps> = ({
  word,
  definition,
  difficulty,
}) => {
  const tagStyle = difficultyStyles[difficulty];

  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.definition}>{definition}</Text>
      </View>
      <View style={[styles.tag, { backgroundColor: tagStyle.backgroundColor }]}>
        <Text style={[styles.tagText, { color: tagStyle.color }]}>
          {difficulty}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.backgroundGray,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  word: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  definition: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  tag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export default WordCard;
