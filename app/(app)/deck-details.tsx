import DeckData from '@/components/decks/DeckData';
import DeckHeader from '@/components/decks/DeckHeader';
import DeckSummaryStats from '@/components/decks/DeckSummaryStats';
import DeckTabs, { DeckTab } from '@/components/decks/DeckTabs';
import DifficultyBreakdownList from '@/components/decks/DifficultyBreakdown';
import StudyActions from '@/components/decks/StudyActions';
import StudyStatistics from '@/components/decks/StudyStatistics';
import WordList from '@/components/decks/WordList';
import { QuizOptionsModal } from '@/components/quiz/QuizOptionsModal';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
// ✨ 1. Import the new component
import WordActions from '@/components/decks/WordActions';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ✨ 2. Update WordsContent to include the new UI
const WordsContent = ({
  searchQuery,
  onSearchChange,
}: {
  searchQuery: string;
  onSearchChange: (text: string) => void;
}) => {
  return (
    <>
      <WordActions
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onFilterPress={() => Alert.alert('Filter pressed')}
      />
      {/* In a real app, you would pass searchQuery to WordList to filter the results */}
      <WordList />
    </>
  );
};

const StatisticsContent = () => {
  return (
    <>
      <DeckSummaryStats wordsMastered={3} stillLearning={3} />
      <StudyStatistics
        studiedToday={15}
        lastStudied="Today"
        overallProgress={50}
        completionRate={75}
      />
      <DifficultyBreakdownList easyCount={1} mediumCount={3} hardCount={2} />
    </>
  );
};

const DeckDetails = () => {
  const [activeTab, setActiveTab] = useState<DeckTab>('words');
  const [isQuizModalVisible, setQuizModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const sampleDeckData = {
    description:
      'Challenging words for academic writing and professional communication',
    totalWords: 6,
    masteryPercent: 50,
    wordsMastered: 3,
    easyCount: 1,
    mediumCount: 3,
    hardCount: 2,
  };

  return (
    <>
      <Stack.Screen
        options={{
          header: () => (
            <DeckHeader title="Advanced Vocabulary" category="Academic" />
          ),
        }}
      />
      {/* ✨ NEW: Main container for the new layout */}
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContentContainer}
        >
          <DeckData {...sampleDeckData} />
          {/* StudyActions is now moved to the footer */}
          <DeckTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            wordCount={6}
          />
          {activeTab === 'words' && (
            <WordsContent
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}
          {activeTab === 'statistics' && <StatisticsContent />}
        </ScrollView>

        {/* ✨ NEW: Fixed Footer */}
        <View
          style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
        >
          <StudyActions
            onStudyPress={() => router.navigate('/study/flashcard/1')}
            onQuizPress={() => setQuizModalVisible(true)}
          />
        </View>

        {/* ✨ NEW: Floating Action Button (FAB) */}
        {activeTab === 'words' && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => Alert.alert('Add new word pressed')}
          >
            <Feather name="plus" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

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
