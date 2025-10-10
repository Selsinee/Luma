import DeckData from '@/components/decks/DeckData';
import DeckHeader from '@/components/decks/DeckHeader';
import DeckSummaryStats from '@/components/decks/DeckSummaryStats';
import DeckTabs, { DeckTab } from '@/components/decks/DeckTabs';
import StudyActions from '@/components/decks/StudyActions';
import StudyStatistics from '@/components/decks/StudyStatistics';
import WordList from '@/components/decks/WordList';
import { QuizOptionsModal } from '@/components/quiz/QuizOptionsModal';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// ✨ 1. Import the new component
import { DifficultyEnum } from '@/api';
import { AddNewWordModal } from '@/components/decks/AddNewWordModal';
import {
  FilterOptionsMenu,
  FilterState,
} from '@/components/decks/FilterOptionsMenu';
import WordActions from '@/components/decks/WordActions';
import { useDeckDetail } from '@/hooks/useDeckDetail';
import errorGenerator from '@/utils/errorGenerator';
import { Feather } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshControl } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DeckDetails = () => {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const [activeTab, setActiveTab] = useState<DeckTab>('words');
  const [isQuizModalVisible, setQuizModalVisible] = useState(false);
  const [isAddWordModalVisible, setAddWordModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, isFetching, error } = useDeckDetail(deckId);

  const [isFilterMenuVisible, setFilterMenuVisible] = useState(false);
  const [filterMenuPosition, setFilterMenuPosition] = useState({
    top: 0,
    right: 0,
  });
  const [filters, setFilters] = useState<FilterState>({
    difficulties: new Set(Object.values(DifficultyEnum)),
    progress: 'all',
    sortBy: 'alphabetical',
  });
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  const [wordActionsY, setWordActionsY] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const filterTriggerRef = useRef<View>(null);
  const scrollPositionRef = useRef(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    let count = 0;
    if (filters.difficulties.size < 3) count++; // If not all difficulties are selected
    if (filters.progress !== 'all') count++;
    // Add logic for sortBy if changing it from default also counts as a filter
    if (filters.sortBy !== 'alphabetical') count++; // Assuming alphabetical is default/no filter

    setActiveFilterCount(count);
  }, [filters]);

  const handleClearFilters = () => {
    setFilters({
      difficulties: new Set(Object.values(DifficultyEnum)),
      progress: 'all',
      sortBy: 'alphabetical',
    });
    setSearchQuery(''); // Also clear search if desired
  };

  const onFilterPress = () => {
    const openMenu = () => {
      filterTriggerRef.current?.measure((_fx, _fy, _width, height, _px, py) => {
        setFilterMenuPosition({ top: py + height + 5, right: 20 });
        setFilterMenuVisible(true);
      });
    };

    // Check if the filter component's top is already near the current scroll position
    const isAlreadyVisible =
      Math.abs(scrollPositionRef.current - wordActionsY) < 50;

    if (isAlreadyVisible) {
      // If it's already in view, open the menu immediately
      openMenu();
    } else {
      // Otherwise, scroll to it and open after a delay
      scrollRef.current?.scrollTo({ y: wordActionsY, animated: true });
      setTimeout(openMenu, 300);
    }
  };

  const handleAddWord = (wordData: {
    word: string;
    definition: string;
    example: string;
    difficulty: DifficultyEnum;
  }) => {
    Alert.alert(
      'New Word Added!',
      `Word: ${wordData.word}\nDefinition: ${wordData.definition}\nDifficulty: ${wordData.difficulty}`,
    );
    // In a real app, you would dispatch an action or call an API to add the word to your deck
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    console.log('Applying filters:', newFilters);
    setFilters(newFilters);
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <DeckHeader
              title={data?.title ?? ''}
              category={data?.category ?? ''}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <ScrollView
          ref={scrollRef}
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                queryClient.invalidateQueries({ queryKey: ['deck', deckId] });
              }}
            />
          }
        >
          {data && (
            <>
              <DeckData {...data} />
              <DeckTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                wordCount={6}
              />
              {activeTab === 'words' && (
                <View
                  onLayout={(event: LayoutChangeEvent) => {
                    setWordActionsY(event.nativeEvent.layout.y);
                  }}
                >
                  <WordActions
                    ref={filterTriggerRef}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onFilterPress={onFilterPress}
                    activeFilterCount={activeFilterCount}
                    totalWords={data?.words?.length || 0}
                    onClearFilters={handleClearFilters}
                  />
                  <WordList words={data.words ?? []} />
                </View>
              )}
              {activeTab === 'statistics' && (
                <>
                  <DeckSummaryStats
                    wordsMastered={data.words_mastered}
                    stillLearning={data.words_learning}
                  />
                  <StudyStatistics
                    studiedToday={data.studied_today}
                    lastStudied={data.last_studied}
                    overallProgress={data.mastery_percentage}
                  />
                  {/* <DifficultyBreakdownList
                    easyCount={data.easy_count}
                    mediumCount={data.medium_count}
                    hardCount={data.hard_count}
                  /> */}
                </>
              )}
            </>
          )}
          {error && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text>{errorGenerator(error)}</Text>
            </View>
          )}
        </ScrollView>

        {data && (
          <>
            <View
              style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
            >
              <StudyActions
                onStudyPress={() =>
                  router.navigate(`/study/flashcard/${deckId}`)
                }
                onQuizPress={() => setQuizModalVisible(true)}
              />
            </View>

            {activeTab === 'words' && (
              <TouchableOpacity
                style={styles.fab}
                onPress={() => setAddWordModalVisible(true)}
              >
                <Feather name="plus" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>

      <FilterOptionsMenu
        isVisible={isFilterMenuVisible}
        onClose={() => setFilterMenuVisible(false)}
        menuPosition={filterMenuPosition}
        initialFilters={filters}
        onApplyFilters={handleApplyFilters}
      />

      <AddNewWordModal
        isVisible={isAddWordModalVisible}
        onClose={() => setAddWordModalVisible(false)}
        onAddWord={handleAddWord}
      />

      <QuizOptionsModal
        isVisible={isQuizModalVisible}
        onClose={() => setQuizModalVisible(false)}
      />
    </>
  );
};

export default DeckDetails;

const styles = StyleSheet.create({
  // ✨ NEW Styles for the layout ✨
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 100, // Add padding to the bottom to ensure content isn't hidden by the footer/FAB
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8F0',
    padding: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 110,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#A9B0D2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});
