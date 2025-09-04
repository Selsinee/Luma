// NewWordsScreen.tsx
import Colors from '@/constants/Colors';
import { Difficulty } from '@/interfaces';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WordCard from './WordCard';

// Mock Data for the list
const mockWords: {
  word: string;
  definition: string;
  difficulty: Difficulty;
}[] = [
  {
    word: 'Serendipity',
    definition:
      'The occurrence and development of events by chance in a happy way',
    difficulty: 'medium',
  },
  {
    word: 'Ephemeral',
    definition: 'Lasting for a very short time',
    difficulty: 'hard',
  },
  {
    word: 'Ubiquitous',
    definition: 'Present, appearing, or found everywhere',
    difficulty: 'hard',
  },
  {
    word: 'Mellifluous',
    definition: 'A sound that is sweet and smooth, pleasing to hear',
    difficulty: 'easy',
  },
];

const NewWordsWidget = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <Text style={styles.title}>Today&#39;s New Words</Text>
        {mockWords.map((item, index) => (
          <WordCard
            key={item.word}
            word={item.word}
            definition={item.definition}
            difficulty={item.difficulty}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderColor: Colors.borderColor,
    borderWidth: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});

export default NewWordsWidget;
