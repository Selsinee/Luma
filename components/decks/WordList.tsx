import React from 'react';
import { StyleSheet, View } from 'react-native';
import WordCard, { WordCardProps } from './WordCard';

// Mock data for demonstration
const MOCK_WORDS: WordCardProps[] = [
  {
    id: '1',
    word: 'Perspicacious',
    difficulty: 'hard',
    status: 'mastered',
    definition: 'Having a ready insight into and understanding of things',
    example:
      '"She was perspicacious enough to see through his false promises."',
    lastReviewed: '2 days ago',
  },
  {
    id: '2',
    word: 'Ubiquitous',
    difficulty: 'medium',
    definition: 'Present, appearing, or found everywhere',
    example: '"Smartphones have become ubiquitous in modern society."',
    lastReviewed: '1 week ago',
  },
  {
    id: '3',
    word: 'Ephemeral',
    difficulty: 'hard',
    status: 'mastered',
    definition: 'Lasting for a very short time',
    example:
      '"The beauty of cherry blossoms is ephemeral, lasting only a few weeks."',
    lastReviewed: '3 days ago',
  },
  {
    id: '4',
    word: 'Mellifluous',
    difficulty: 'medium',
    definition: 'A sound that is sweet and smooth, pleasing to hear',
    example: '"Her mellifluous voice calmed the anxious crowd."',
    lastReviewed: '5 days ago',
  },
  {
    id: '5',
    word: 'Pulchritudinous',
    difficulty: 'hard',
    definition: 'Having great physical beauty',
    example: '"The pulchritudinous landscape was a painter\'s dream."',
    lastReviewed: '1 day ago',
  },
  {
    id: '6',
    word: 'Gregarious',
    difficulty: 'easy',
    status: 'mastered',
    definition: 'Fond of company; sociable',
    example: '"He was a gregarious and outgoing person who loved parties."',
    lastReviewed: '4 hours ago',
  },
];

const WordList: React.FC = () => {
  return (
    <View style={styles.container}>
      {MOCK_WORDS.map((word, i) => (
        <WordCard {...word} key={word.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
});

export default WordList;
