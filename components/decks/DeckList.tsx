import Colors from '@/constants/Colors';
import { useDecks } from '@/hooks/useDecks';
import errorGenerator from '@/utils/errorGenerator';
import { useQueryClient } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import BaseHeader from '../BaseHeader';
import DeckCardDetailed from './DeckCardDetailed'; // Import the card component
import DeckFilters from './DeckFilters';

const DeckList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, error } = useDecks({
    query: searchQuery,
    category: activeFilter,
  });
  const { total_decks, decks } = data || { total_decks: 0, decks: [] };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          header: () => (
            <BaseHeader
              type="tab"
              title="My decks"
              subtitle={`${total_decks} active decks`}
            />
          ),
        }}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              queryClient.invalidateQueries({ queryKey: ['decks'] });
            }}
          />
        }
        ListHeaderComponent={
          <>
            <DeckFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            {isFetching && (
              <View style={{ marginBottom: 16 }}>
                <ActivityIndicator size="small" color={Colors.primary} />
              </View>
            )}
          </>
        }
        data={decks}
        // renderItem tells the list how to render each individual deck
        renderItem={({ item }) => <DeckCardDetailed item={item} />}
        // keyExtractor provides a unique ID for each item, crucial for performance
        keyExtractor={item => item.id}
        // Adds padding to the content area
        contentContainerStyle={styles.listContent}
        // Hides the vertical scroll bar for a cleaner look
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading ? (
            <View>
              <Text style={{ textAlign: 'center' }}>
                {error
                  ? errorGenerator(error)
                  : 'No decks found. Create your first deck!'}
              </Text>
            </View>
          ) : null
        }
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
    flexGrow: 1,
  },
});

export default DeckList;
