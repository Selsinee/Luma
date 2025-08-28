// RecentDecksWidget.tsx
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons'; // Changed import
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeckCard from '../DeckCard';

// Mock Data for the list of decks
const mockDecks = [
  {
    title: 'Advanced Vocabulary',
    description:
      'Challenging words for academic writing and professional communication',
    lastStudied: '2 hours ago',
    currentProgress: 25,
    totalItems: 150,
  },
  {
    title: 'Spanish Basics',
    description: 'Essential Spanish vocabulary for beginners',
    lastStudied: 'Yesterday',
    currentProgress: 15,
    totalItems: 200,
  },
  {
    title: 'Medical Terminology',
    description:
      'Important medical terms and definitions for healthcare professionals',
    lastStudied: '3 days ago',
    currentProgress: 0,
    totalItems: 300,
  },
];

const RecentDecksWidget = () => {
  return (
    <View style={styles.widgetContainer}>
      {/* Widget Header */}
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Recent Decks</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          {/* Changed component from Icon to Feather */}
          <Feather name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Deck List */}
      <FlatList
        data={mockDecks}
        keyExtractor={item => item.title}
        scrollEnabled={false}
        renderItem={({ item }) => <DeckCard {...item} />}
      />
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  widgetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
});

export default RecentDecksWidget;
