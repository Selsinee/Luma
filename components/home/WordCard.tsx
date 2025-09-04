// WordCard.tsx
import Colors from '@/constants/Colors';
import { Difficulty } from '@/interfaces';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DifficultyTag from '../tags/DifficultyTag';

// Define the component's props
interface WordCardProps {
  word: string;
  definition: string;
  difficulty: Difficulty;
}

const WordCard: React.FC<WordCardProps> = ({
  word,
  definition,
  difficulty,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.word}>{word}</Text>
        <Text style={styles.definition}>{definition}</Text>
      </View>
      <DifficultyTag difficulty={difficulty} />
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
