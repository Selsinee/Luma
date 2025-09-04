import { QuizHeader } from '@/components/quiz/QuizHeader';
import { QuizOption } from '@/components/quiz/QuizOption';
import { Feather } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// --- Reanimated Imports ---
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Mock data for the quiz
const MOCK_QUIZ_DATA = [
  {
    id: 'q1',
    word: 'Perspicacious',
    difficulty: 'hard' as 'hard',
    options: [
      'Lasting for a very short time',
      'Fluent or persuasive in speaking or writing',
      'A typical example or pattern of something; a model',
      'Having a ready insight into and understanding of things',
    ],
    correctAnswer: 'Having a ready insight into and understanding of things',
  },
  {
    id: 'q2',
    word: 'Ubiquitous',
    difficulty: 'medium' as 'medium',
    options: [
      'Well meaning and kindly',
      'Present, appearing, or found everywhere',
      'Delay or postpone action',
      'Showing great attention to detail',
    ],
    correctAnswer: 'Present, appearing, or found everywhere',
  },
  {
    id: 'q3',
    word: 'Ephemeral',
    difficulty: 'hard' as 'hard',
    options: [
      'Lasting for a very short time',
      'Well meaning and kindly',
      'Delay or postpone action',
      'Showing great attention to detail',
    ],
    correctAnswer: 'Lasting for a very short time',
  },
];

export default function QuizQuestionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);

  // --- Reanimated Shared Values ---
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);

  const currentQuestion = MOCK_QUIZ_DATA[currentQuestionIndex];

  // --- Animated Style for the Card ---
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [{ translateY: cardTranslateY.value }],
    };
  });

  // --- Animation for new questions appearing ---
  useEffect(() => {
    cardOpacity.value = 0;
    cardTranslateY.value = 20;
    cardOpacity.value = withTiming(1, { duration: 300 });
    cardTranslateY.value = withTiming(0, { duration: 300 });
  }, [currentQuestionIndex]);

  // Timer logic
  useEffect(() => {
    if (timeLeft === 0) {
      Alert.alert("Time's Up!", 'Moving to next question.', [
        { text: 'OK', onPress: goToNextQuestion },
      ]);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Helper function to update the state on the JS thread after an animation
  const updateQuestionState = useCallback(() => {
    if (currentQuestionIndex < MOCK_QUIZ_DATA.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30); // Reset timer
    } else {
      Alert.alert('Quiz Complete!', 'You have finished the quiz.');
      router.back();
    }
  }, [currentQuestionIndex]);

  const goToNextQuestion = useCallback(() => {
    // Animate the current card out
    cardOpacity.value = withTiming(0, { duration: 200 });
    cardTranslateY.value = withTiming(-20, { duration: 200 }, finished => {
      // After the animation is finished, update the state
      if (finished) {
        runOnJS(updateQuestionState)();
      }
    });
  }, [updateQuestionState]);

  const handleSubmit = () => {
    Alert.alert('Answer Submitted', `You selected: ${selectedAnswer}`);
    goToNextQuestion();
  };

  const handleExitQuiz = () => {
    Alert.alert(
      'Exit Quiz?',
      'Are you sure you want to exit? Your progress will not be saved.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Exit',
          onPress: () => router.back(),
          style: 'destructive',
        },
      ],
    );
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen
        options={{
          header: () => (
            <QuizHeader
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={MOCK_QUIZ_DATA.length}
              timeLeft={timeLeft}
              onBackPress={handleExitQuiz}
              onNextPress={goToNextQuestion}
            />
          ),
        }}
      />
      <View style={styles.container}>
        {/* Use Animated.View for the card */}
        <Animated.View style={[styles.card, animatedCardStyle]}>
          <View style={styles.difficultyTag}>
            <Text style={styles.difficultyText}>
              {currentQuestion.difficulty}
            </Text>
          </View>
          <Text style={styles.word}>{currentQuestion.word}</Text>
          <Text style={styles.prompt}>Select the correct definition:</Text>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <QuizOption
                key={index}
                text={option}
                isSelected={selectedAnswer === option}
                onPress={() => setSelectedAnswer(option)}
              />
            ))}
          </View>
        </Animated.View>
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <TouchableOpacity style={styles.skipButton} onPress={goToNextQuestion}>
          <Feather name="fast-forward" size={16} color="#555" />
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.submitButton,
            !selectedAnswer && styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!selectedAnswer}
        >
          <Text style={styles.submitButtonText}>Submit Answer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  difficultyTag: {
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  difficultyText: {
    color: '#C62828',
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 16,
  },
  prompt: {
    fontSize: 16,
    color: '#8A8A8A',
    textAlign: 'center',
    marginBottom: 24,
  },
  optionsContainer: {},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8F0',
    backgroundColor: '#FFFFFF',
  },
  skipButton: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  skipButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginLeft: 6,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#A9B0D2',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 12,
  },
  disabledButton: { backgroundColor: '#E0E0E0' },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});
