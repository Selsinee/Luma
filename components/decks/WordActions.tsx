import Colors from '@/constants/Colors'; // Assuming Colors.primaryDark is defined here
import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface WordActionsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress: () => void;
  activeFilterCount: number;
  shownWordCount: number;
  totalWords: number;
  onClearFilters: () => void;
}

const WordActions = React.forwardRef<View, WordActionsProps>(
  (
    {
      searchQuery,
      onSearchChange,
      onFilterPress,
      activeFilterCount,
      totalWords,
      onClearFilters,
      shownWordCount,
    },
    ref,
  ) => {
    const isFilterActive = activeFilterCount > 0;

    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#9E9E9E"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Search words"
            value={searchQuery}
            onChangeText={onSearchChange}
          />
          <TouchableOpacity
            ref={ref}
            onPress={onFilterPress}
            style={[styles.filterButton]}
          >
            <Feather name="filter" size={20} color={'#555'} />
            {isFilterActive && <View style={styles.activeFilterDot} />}
          </TouchableOpacity>
        </View>

        {/* ✨ NEW: Conditional display for filter summary */}
        {isFilterActive && (
          <View style={styles.filterSummaryContainer}>
            <Text style={styles.filterSummaryText}>
              Showing {shownWordCount} of {totalWords} words
            </Text>
            <TouchableOpacity onPress={onClearFilters}>
              <Text style={styles.clearAllText}>Clear all</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  },
);

WordActions.displayName = 'WordActions';

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    paddingLeft: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10, // Ensure good vertical padding
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8, // Match search container border radius
    borderLeftWidth: 1,
    borderLeftColor: '#E8E8F0',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // For dot positioning
  },
  filterButtonActive: {
    backgroundColor: Colors.primary, // Light purple background
    borderLeftColor: Colors.primaryDark,
  },
  activeFilterDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryDark, // Purple dot
    borderWidth: 1,
    borderColor: '#FFFFFF', // White border around the dot
  },
  filterSummaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#F7F7F7', // Light gray background for summary
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  filterSummaryText: {
    fontSize: 13,
    color: '#666',
  },
  clearAllText: {
    fontSize: 13,
    color: Colors.primaryDark, // Purple color for "Clear all"
    fontWeight: '500',
  },
});

export default WordActions;
