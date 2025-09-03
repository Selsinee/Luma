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
import { ScrollView, StyleSheet } from 'react-native';

const WordsContent = () => {
  return <WordList />;
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
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
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
          title: `Deck 1`, // Use params in the title
          header: () => (
            <DeckHeader title="Advanced Vocabulary" category="Academic" />
          ),
        }}
      />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
        <DeckData {...sampleDeckData} />
        <StudyActions
          onStudyPress={() => {
            router.navigate('/study/flashcard/1');
          }}
          onQuizPress={() => setIsVisible(true)}
        />
        <DeckTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          wordCount={6}
        />
        {activeTab === 'words' && <WordsContent />}
        {activeTab === 'statistics' && <StatisticsContent />}
      </ScrollView>
      <QuizOptionsModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </>
  );
};

export default DeckDetails;

const styles = StyleSheet.create({});
