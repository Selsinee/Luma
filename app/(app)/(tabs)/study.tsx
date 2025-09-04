import AlmostMasteredWidget from '@/components/study/AlmostMasteredWidget';
import ContinueStudyingWidget from '@/components/study/ContinueStudyingWidget';
import DailyProgress from '@/components/study/DailyProgress';
import NeedsReviewWidget from '@/components/study/NeedReviewWidget';
import StudyModeSelector from '@/components/study/StudyModeSelector';
import WeeklyStats from '@/components/study/WeeklyStats';
import { ScrollView, StyleSheet } from 'react-native';

export default function StudyScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <DailyProgress wordsStudied={15} dailyGoal={30} streak={5} />
      <StudyModeSelector />
      <NeedsReviewWidget />
      <ContinueStudyingWidget />
      <AlmostMasteredWidget />
      <WeeklyStats
        accuracyRate={92}
        wordsStudied={120}
        avgSessions={3}
        dailyAverage="17"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
