import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import DeckCardDetailed from './DeckCardDetailed'; // Import the card component

// We'll need to import or redeclare the props interface
interface DeckCardDetailedProps {
  id: string; // Add a unique ID for the keyExtractor
  title: string;
  description: string;
  category: string;
  lastStudied: string;
  studiedToday: number;
  currentProgress: number;
  totalItems: number;
}

export const MOCK_DECKS: DeckCardDetailedProps[] = [
  {
    id: '1',
    title: 'Advanced Vocabulary',
    description:
      'Challenging words for academic writing and professional communication',
    category: 'Academic',
    lastStudied: '2 hours ago',
    studiedToday: 25,
    currentProgress: 101,
    totalItems: 150,
  },
  {
    id: '2',
    title: 'Spanish Basics',
    description: 'Essential Spanish vocabulary for beginners',
    category: 'Language',
    lastStudied: 'Yesterday',
    studiedToday: 15,
    currentProgress: 68,
    totalItems: 200,
  },
  {
    id: '3',
    title: 'Medical Terminology',
    description:
      'Important medical terms and definitions for healthcare professionals',
    category: 'Medical',
    lastStudied: '3 days ago',
    studiedToday: 0,
    currentProgress: 267,
    totalItems: 300,
  },
  {
    id: '4',
    title: 'TOEFL Preparation',
    description: 'High-frequency words commonly found on the TOEFL exam',
    category: 'Test Prep',
    lastStudied: '1 hour ago',
    studiedToday: 30,
    currentProgress: 225,
    totalItems: 500,
  },
];

// Define the type for the props the list component will accept
interface DeckListProps {
  decks: typeof MOCK_DECKS;
}

const DeckList: React.FC<DeckListProps> = ({ decks }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={decks}
        // renderItem tells the list how to render each individual deck
        renderItem={({ item }) => <DeckCardDetailed {...item} />}
        // keyExtractor provides a unique ID for each item, crucial for performance
        keyExtractor={item => item.id}
        // Adds padding to the content area
        contentContainerStyle={styles.listContent}
        // Hides the vertical scroll bar for a cleaner look
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
});

export default DeckList;
