import { WordWithProgress } from '@/api';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import WordCard from './WordCard';

interface WordListProps {
  words: WordWithProgress[];
}

const WordList: React.FC<WordListProps> = ({ words }) => {
  return (
    <View style={styles.container}>
      {words.map((word, i) => (
        <WordCard {...word} key={word.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 16,
  },
});

export default WordList;
