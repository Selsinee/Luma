// RecentDecksWidget.tsx
import Colors from '@/constants/Colors';
import { useRecentDecks } from '@/hooks/useRecentDecks';
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

const RecentDecksWidget = () => {
  const { data, error } = useRecentDecks();

  if (!data || data.length === 0 || error) {
    return null; // Don't render the widget if there's no data or an error
  }

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Text style={styles.widgetTitle}>Recent Decks</Text>
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={styles.viewAllText}>View All</Text>
          <Feather name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
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
