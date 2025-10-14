// NewWordsScreen.tsx
import Colors from '@/constants/Colors';
import { useNewWords } from '@/hooks/useNewWords';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WordCard from './WordCard';

const NewWordsWidget = () => {
  const { data, error } = useNewWords();

  if (!data || data.length === 0 || error) {
    return null; // Don't render the widget if there's no data or an error
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentCard}>
        <Text style={styles.title}>Today&#39;s New Words</Text>
        {data?.map((item, index) => (
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
