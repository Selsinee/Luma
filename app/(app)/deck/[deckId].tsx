import DeckData from '@/components/decks/DeckData';
import DeckHeader from '@/components/decks/DeckHeader';
import DeckSummaryStats from '@/components/decks/DeckSummaryStats';
import DeckTabs, { DeckTab } from '@/components/decks/DeckTabs';
import StudyActions from '@/components/decks/StudyActions';
import StudyStatistics from '@/components/decks/StudyStatistics';
import { QuizOptionsModal } from '@/components/quiz/QuizOptionsModal';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
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
import WordsTabContent from '@/components/decks/WordsTabContent';
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
    sortBy: 'recent',
  });
  const [wordActionsY, setWordActionsY] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const filterTriggerRef = useRef<View>(null);
  const scrollPositionRef = useRef(0);
  const queryClient = useQueryClient();

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
              deck={data}
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
                <WordsTabContent
                  ref={filterTriggerRef}
                  words={data.words ?? []}
                  onFilterPress={onFilterPress}
                  filters={filters}
                  setFilters={setFilters}
                  onLayout={e => setWordActionsY(e.nativeEvent.layout.y)}
                />
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
            {data.words && data.words.length > 0 && (
              <View
                style={[
                  styles.footerContainer,
                  { paddingBottom: insets.bottom },
                ]}
              >
                <StudyActions
                  onStudyPress={() =>
                    router.navigate(`/study/flashcard/${deckId}`)
                  }
                  onQuizPress={() => setQuizModalVisible(true)}
                />
              </View>
            )}

            {activeTab === 'words' && (
              <TouchableOpacity
                style={[
                  styles.fab,
                  {
                    bottom:
                      data.words && data.words.length > 0
                        ? insets.bottom + 70
                        : insets.bottom + 20,
                  },
                ]}
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
