// components/decks/WordsTabContent.tsx
import { DifficultyEnum, WordWithProgress } from '@/api';
import WordActions from '@/components/decks/WordActions';
import WordList from '@/components/decks/WordList';
import React, { forwardRef, useMemo, useState } from 'react';
import { View, ViewProps } from 'react-native';
import { FilterState } from './FilterOptionsMenu';

interface WordsTabContentProps extends ViewProps {
  words: WordWithProgress[];
  onFilterPress: () => void;
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const WordsTabContent = forwardRef<View, WordsTabContentProps>(
  ({ words, onFilterPress, filters, setFilters }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');

    const activeFilterCount = useMemo(() => {
      let count = 0;
      const defaultDifficulties = new Set(Object.values(DifficultyEnum));

      // Count if the number of selected difficulties is less than the total
      if (filters.difficulties.size < defaultDifficulties.size) {
        count++;
      }

      // Count if progress is not 'all'
      if (filters.progress !== 'all') {
        count++;
      }

      // Count if sortBy is not the default
      if (filters.sortBy !== 'recent') {
        count++;
      }

      return count;
    }, [filters]);

    // This useMemo hook will re-run the filtering and sorting logic
    // only when the source words, filters, or search query change.
    const filteredAndSortedWords = useMemo(() => {
      let filtered = [...words];

      // 1. Filter by search query (case-insensitive)
      if (searchQuery) {
        filtered = filtered.filter(word =>
          word.word.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      }

      // 2. Filter by difficulty
      if (filters.difficulties.size < 3) {
        filtered = filtered.filter(word =>
          filters.difficulties.has(word.difficulty),
        );
      }

      // 3. Filter by progress
      if (filters.progress !== 'all') {
        filtered = filtered.filter(word => word.status === filters.progress);
      }

      // 4. Sort the results
      switch (filters.sortBy) {
        case 'alphabetical':
          filtered.sort((a, b) => a.word.localeCompare(b.word));
          break;
        case 'difficulty':
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          filtered.sort(
            (a, b) =>
              difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty],
          );
          break;
        case 'recent':
          filtered.sort((a, b) => {
            const dateA = a.last_reviewed_at
              ? new Date(a.last_reviewed_at).getTime()
              : 0;
            const dateB = b.last_reviewed_at
              ? new Date(b.last_reviewed_at).getTime()
              : 0;
            return dateB - dateA; // Sort descending (most recent first)
          });
          break;
      }

      return filtered;
    }, [words, filters, searchQuery]);

    const handleClearFilters = () => {
      setFilters({
        difficulties: new Set(Object.values(DifficultyEnum)),
        progress: 'all',
        sortBy: 'recent',
      });
      setSearchQuery('');
    };

    return (
      <View>
        <WordActions
          ref={ref}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterPress={onFilterPress}
          activeFilterCount={activeFilterCount} // Replace with actual active filter count logic
          shownWordCount={filteredAndSortedWords.length}
          totalWords={words.length}
          onClearFilters={handleClearFilters}
        />
        <WordList words={filteredAndSortedWords} />
      </View>
    );
  },
);

WordsTabContent.displayName = 'WordsTabContent';

export default WordsTabContent;
