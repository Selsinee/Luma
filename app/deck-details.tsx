import DeckData from '@/components/decks/DeckData';
import DeckHeader from '@/components/decks/DeckHeader';
import DeckTabs, { DeckTab } from '@/components/decks/DeckTabs';
import StudyActions from '@/components/decks/StudyActions';
import WordList from '@/components/decks/WordList';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const DeckDetails = () => {
  const [activeTab, setActiveTab] = React.useState<DeckTab>('words');
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
            router.navigate('/study/1');
          }}
        />
        <DeckTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          wordCount={6}
        />
        <WordList />
      </ScrollView>
    </>
  );
};

export default DeckDetails;

const styles = StyleSheet.create({});
