import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CreateDeckModal from './CreateDeckModal';

// Define the list of filter categories
const FILTERS = [
  'All',
  'Academic',
  'Language',
  'Medical',
  'Test Prep',
  'Business',
];

const DeckFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <CreateDeckModal
        isVisible={isVisible}
        onClose={() => {
          setIsVisible(false);
        }}
      />
      {/* Search Bar and Create Button */}
      <View style={styles.searchRow}>
        <View style={styles.searchInputContainer}>
          <Feather
            name="search"
            size={20}
            color="#9E9E9E"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search decks..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setIsVisible(true)}
        >
          <Feather name="plus" size={18} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map(filter => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTag,
              activeFilter === filter
                ? styles.activeFilterTag
                : styles.inactiveFilterTag,
            ]}
            onPress={() => setActiveFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === filter
                  ? styles.activeFilterText
                  : styles.inactiveFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
    backgroundColor: '#FFFFFF',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    padding: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A9B0D2',
    paddingHorizontal: 16,
    borderRadius: 10,
    marginLeft: 10,
    padding: 10,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
  filterRow: {
    paddingVertical: 4,
  },
  filterTag: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    height: 38,
  },
  activeFilterTag: {
    backgroundColor: '#A9B0D2',
  },
  inactiveFilterTag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  inactiveFilterText: {
    color: '#333333',
  },
});

export default DeckFilters;
