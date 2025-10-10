import { SessionTypeEnum, StatusEnum, WordProgressUpdate } from '@/api';
import Flashcard from '@/components/flashcard/Flashcard';
import StudyFeedback from '@/components/flashcard/StudyFeedback';
import StudyHeader from '@/components/flashcard/StudyHeader';
import Colors from '@/constants/Colors';
import { useCreateStudySession } from '@/hooks/useCreateStudySession';
import { useDeckDetail } from '@/hooks/useDeckDetail';
import { Feather } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// --- NEW: Congratulations Card Component ---
const CongratulationsCard: React.FC<{
  onFinish: () => void;
  reviewedCount: number;
}> = ({ onFinish, reviewedCount }) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={styles.congratsOverlay}>
      <Animated.View style={[styles.congratsCard, animatedStyle]}>
        <Feather name="award" size={50} color="#FFC107" />
        <Text style={styles.congratsTitle}>Congratulations!</Text>
        <Text style={styles.congratsSubtitle}>
          You&apos;ve reviewed all {reviewedCount} words in this deck.
        </Text>
        <TouchableOpacity style={styles.congratsButton} onPress={onFinish}>
          <Text style={styles.congratsButtonText}>Finish Session</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default function StudyScreen() {
  const router = useRouter();
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const insets = useSafeAreaInsets();
  const { data } = useDeckDetail(deckId);
  const { words = [] } = data || {};
  const sessionStartTime = useRef(Date.now());
  const { createStudySession } = useCreateStudySession();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [practiceCount, setPracticeCount] = useState(0);
  const [showQuickTip, setShowQuickTip] = useState(true);
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [progressUpdates, setProgressUpdates] = useState<WordProgressUpdate[]>(
    [],
  );

  const totalCards = words.length;
  const currentWord = words[currentWordIndex];
  const masteryPercentage =
    totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setShowQuickTip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // MODIFIED: Logic for when the session is complete
  const goToNextWord = useCallback(() => {
    if (currentWordIndex < totalCards - 1) {
      setReviewedCount(prev => prev + 1);
      setCurrentWordIndex(prev => prev + 1);
    } else {
      // Instead of an alert, we now set the session to complete
      setReviewedCount(prev => prev + 1);
      setIsSessionComplete(true);
    }
  }, [currentWordIndex, totalCards]);

  const handleGotIt = useCallback(() => {
    setProgressUpdates(prev => [
      ...prev,
      { word_id: currentWord.id, status: StatusEnum.MASTERED },
    ]);
    setCorrectCount(prev => prev + 1);
    goToNextWord();
  }, [goToNextWord, currentWord]);

  const handleNeedPractice = useCallback(() => {
    setProgressUpdates(prev => [
      ...prev,
      { word_id: currentWord.id, status: StatusEnum.LEARNING },
    ]);
    setPracticeCount(prev => prev + 1);
    goToNextWord();
  }, [goToNextWord, currentWord]);

  const handleSkipWord = useCallback(() => {
    goToNextWord();
  }, [goToNextWord]);

  const handleFinishSession = () => {
    // Calculate session duration in seconds
    const durationSeconds = Math.floor(
      (Date.now() - sessionStartTime.current) / 1000,
    );

    // Call the API to create the study session
    createStudySession({
      deck_id: deckId,
      session_type: SessionTypeEnum.FLASHCARD,
      words_reviewed: reviewedCount,
      duration_seconds: durationSeconds,
      progress_updates: progressUpdates,
      // score_percentage is null for flashcards
    });

    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  const handleMenu = () => {
    Alert.alert('Menu', 'Options for study session...');
  };

  const handleToggleQuickTip = useCallback(() => {
    setShowQuickTip(prev => !prev);
  }, []);

  if (!currentWord) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading deck...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingBottom: insets.bottom }}>
      <Stack.Screen
        options={{
          header: () => (
            <StudyHeader
              deckTitle={data?.title || 'Study'}
              currentCardIndex={currentWordIndex + 1}
              totalCards={totalCards}
              masteryPercentage={masteryPercentage}
              onBackPress={handleBack}
              onMenuPress={handleMenu}
            />
          ),
        }}
      />

      <View style={styles.flashcardArea}>
        <Flashcard
          word={currentWord.word}
          difficulty={currentWord.difficulty}
          definition={currentWord.definition}
          example={currentWord.example ?? ''}
          onSwipeRight={handleGotIt}
          onSwipeLeft={handleNeedPractice}
          onSkip={handleSkipWord}
          showQuickTip={showQuickTip}
          onToggleQuickTip={handleToggleQuickTip}
        />
      </View>

      <View style={styles.bottomTipContainer}>
        <Text style={styles.bottomTipText}>
          Quick tip: Confident? Swipe right if you know it, left if you
          don&apos;t. Or tap to see the definition first!
        </Text>
      </View>
      <StudyFeedback
        reviewedCount={reviewedCount}
        correctCount={correctCount}
        practiceCount={practiceCount}
      />

      {isSessionComplete && (
        <CongratulationsCard
          onFinish={handleFinishSession}
          reviewedCount={totalCards}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flashcardArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTipContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  bottomTipText: {
    fontSize: 13,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 18,
  },
  // --- NEW Styles for Congratulations Card ---
  congratsOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 10,
  },
  congratsCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  congratsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  congratsSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  congratsButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  congratsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
