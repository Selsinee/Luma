import Colors from '@/constants/Colors'; // Assuming Colors.borderColor exists and is a suitable default
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// Define the types for the card's props
type Difficulty = 'easy' | 'medium' | 'hard';

export interface FlashcardProps {
  word: string;
  difficulty: Difficulty;
  definition: string;
  example: string;
  onSwipeRight?: () => void; // Got It!
  onSwipeLeft?: () => void; // Need Practice
  onSkip?: () => void;
  showQuickTip: boolean;
  onToggleQuickTip: () => void;
}

const difficultyColors = {
  hard: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
  medium: {
    backgroundColor: '#FFF8E1',
    color: '#FF8F00',
  },
  easy: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
};

const Flashcard: React.FC<FlashcardProps> = ({
  word,
  difficulty,
  definition,
  example,
  onSwipeLeft,
  onSwipeRight,
  onSkip,
  showQuickTip,
  onToggleQuickTip,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const diffStyle = difficultyColors[difficulty];

  // --- Animation Shared Values ---
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  // NEW: Shared values for reveal animation
  const revealedContentOpacity = useSharedValue(0);
  const revealedContentScale = useSharedValue(0.95);

  // --- Enter Animation (for card appearing) ---
  useEffect(() => {
    translateX.value = 0;
    translateY.value = 0;
    rotation.value = 0;
    setIsRevealed(false);
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1);

    // Reset reveal content state
    revealedContentOpacity.value = 0;
    revealedContentScale.value = 0.95;
  }, [word]);

  // --- Reveal Animation (for definition/example appearing) ---
  useEffect(() => {
    if (isRevealed) {
      revealedContentOpacity.value = withTiming(1, { duration: 250 });
      revealedContentScale.value = withSpring(1, {
        damping: 15,
        stiffness: 120,
      });
    } else {
      revealedContentOpacity.value = withTiming(0, { duration: 150 });
      revealedContentScale.value = withSpring(0.95, {
        damping: 15,
        stiffness: 120,
      });
    }
  }, [isRevealed]);

  // --- Animated Styles ---
  const cardAnimatedStyle = useAnimatedStyle(() => {
    // Determine border color based on swipe
    const animatedBorderColor = interpolateColor(
      translateX.value,
      [-150, 0, 150],
      [
        Colors.error, // Darker red for left swipe
        Colors.borderColor, // Default color when not swiping
        Colors.success, // Darker green for right swipe
      ],
    );

    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotation.value}deg` },
      ],
      borderColor: animatedBorderColor, // Apply animated border color
    };
  });

  const glowAnimatedStyle = useAnimatedStyle(() => {
    // Determine lighter background glow color based on swipe
    const color = interpolateColor(
      translateX.value,
      [-150, 0, 150],
      [
        'rgba(253, 206, 214, 0.3)', // Lighter red background glow
        'rgba(0, 0, 0, 0.0)', // Transparent when not swiping
        'rgba(204, 247, 207, 0.3)', // Lighter green background glow
      ],
    );
    return {
      backgroundColor: color,
    };
  });

  // NEW: Animated style for the revealed content
  const revealedContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: revealedContentOpacity.value,
      transform: [{ scale: revealedContentScale.value }],
    };
  });

  const handleRevealToggle = useCallback(() => {
    setIsRevealed(prev => !prev);
  }, []);

  const handleGotIt = useCallback(() => {
    onSwipeRight && onSwipeRight();
  }, [onSwipeRight]);

  const handleNeedPractice = useCallback(() => {
    onSwipeLeft && onSwipeLeft();
  }, [onSwipeLeft]);

  const onSwipeComplete = (direction: 'left' | 'right') => {
    opacity.value = withTiming(0, { duration: 150 });
    setTimeout(() => {
      if (direction === 'right') {
        runOnJS(handleGotIt)();
      } else {
        runOnJS(handleNeedPractice)();
      }
    }, 150);
  };

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotation.value = event.translationX * 0.05;
    })
    .onEnd(event => {
      if (Math.abs(event.translationX) > 100) {
        const direction = event.translationX > 0 ? 'right' : 'left';
        const targetX = direction === 'right' ? 500 : -500;

        runOnJS(onSwipeComplete)(direction);
        translateX.value = withSpring(targetX, {});
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        rotation.value = withSpring(0);
      }
    });

  const tapGesture = Gesture.Tap()
    .maxDeltaX(10)
    .maxDeltaY(10)
    .onEnd(() => {
      runOnJS(handleRevealToggle)();
    });

  const composedGesture = Gesture.Simultaneous(panGesture, tapGesture);

  return (
    <View style={styles.cardWrapper}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          <Animated.View style={[styles.glowOverlay, glowAnimatedStyle]} />

          {/* Quick Tip Bar */}
          {!isRevealed && showQuickTip && (
            <View style={styles.quickTipBar}>
              <Feather name="chevron-left" size={14} color={Colors.error} />
              <Text style={styles.quickTipRedText}>Need Practice</Text>
              <View style={styles.quickTipSpacer} />
              <Text style={styles.quickTipGreenText}>Got It!</Text>
              <Feather name="chevron-right" size={14} color={Colors.success} />
            </View>
          )}

          {/* Main Card Header */}
          <View style={styles.header}>
            <View
              style={[
                styles.difficultyTag,
                { backgroundColor: diffStyle.backgroundColor },
              ]}
            >
              <Text style={[styles.difficultyText, { color: diffStyle.color }]}>
                {difficulty}
              </Text>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Sound!')}>
              <Feather name="volume-2" size={20} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Word */}
          <Text style={styles.word}>{word}</Text>

          {/* Definition & Example (Revealed Content) */}
          {isRevealed && (
            <Animated.View
              style={[styles.revealedContent, revealedContentAnimatedStyle]}
            >
              <Text style={styles.definition}>{definition}</Text>
              <Text style={styles.example}>{example}</Text>
            </Animated.View>
          )}

          {/* Tap/Swipe Hint */}
          <View style={styles.hintContainer}>
            <Feather
              name={isRevealed ? 'eye-off' : 'eye'}
              size={16}
              color="#B0B0B0"
            />
            <Text style={styles.hintText}>
              {isRevealed
                ? 'Swipe to assess or tap to hide'
                : 'Swipe to assess or tap to reveal'}
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>

      {/* Action Buttons (Visible when revealed, or for non-swipe interaction) */}
      {isRevealed && (
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.needPracticeButton]}
            onPress={handleNeedPractice}
          >
            <Feather name="x" size={20} color={Colors.error} />
            <Text style={styles.needPracticeText}>Need Practice</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.gotItButton]}
            onPress={handleGotIt}
          >
            <Feather name="check" size={20} color="#FFFFFF" />
            <Text style={styles.gotItText}>Got It!</Text>
          </TouchableOpacity>
        </View>
      )}

      {isRevealed && (
        <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
          <Feather name="chevrons-right" size={16} color="#8A8A8A" />
          <Text style={styles.skipButtonText}>Skip This Word</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2, // Increased border width for visibility
    borderColor: Colors.borderColor, // Default border color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    minHeight: 300,
    overflow: 'hidden',
    padding: 24,
    justifyContent: 'center',
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  quickTipBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#F0F0F7', // You can uncomment this if you want a subtle background for the tip bar
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    zIndex: 2,
  },
  quickTipRedText: {
    fontSize: 12,
    color: Colors.error,
    fontWeight: '500',
  },
  quickTipGreenText: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '500',
  },
  quickTipSpacer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  difficultyTag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  word: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  revealedContent: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 20,
  },
  definition: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 10,
  },
  example: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  hintText: {
    fontSize: 13,
    color: '#B0B0B0',
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  needPracticeButton: {
    backgroundColor: '#FFEBEB',
    borderColor: '#FFD1D1',
    borderWidth: 1,
  },
  needPracticeText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  gotItButton: {
    backgroundColor: Colors.success,
  },
  gotItText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  skipButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
    padding: 10,
  },
  skipButtonText: {
    color: '#8A8A8A',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default Flashcard;
