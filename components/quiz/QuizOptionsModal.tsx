import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Types and Data ---
type QuizType = 'multiple-choice' | 'type-answer';
type TimeLimit = '30s' | '1m' | '2m' | 'none';

const QUIZ_TYPE_OPTIONS = [
  {
    id: 'multiple-choice' as QuizType,
    icon: 'target' as const,
    title: 'Multiple Choice',
    subtitle: 'Choose the correct definition from 4 options',
    isRecommended: true,
  },
  {
    id: 'type-answer' as QuizType,
    icon: 'edit-3' as const,
    title: 'Type Answer',
    subtitle: 'Type the definition or word',
    isRecommended: false,
  },
];

const TIME_LIMIT_OPTIONS = [
  {
    id: '30s' as TimeLimit,
    title: '30 seconds',
    subtitle: 'Quick recall',
    isRecommended: false,
  },
  {
    id: '1m' as TimeLimit,
    title: '1 minute',
    subtitle: 'Balanced',
    isRecommended: true,
  },
  {
    id: '2m' as TimeLimit,
    title: '2 minutes',
    subtitle: 'Thoughtful',
    isRecommended: false,
  },
  {
    id: 'none' as TimeLimit,
    title: 'No limit',
    subtitle: 'Take your time',
    isRecommended: false,
  },
];

// --- Reusable Option Card Component ---
interface OptionCardProps {
  icon?: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  isRecommended?: boolean;
  isSelected: boolean;
  onPress: () => void;
  isGridItem?: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({
  icon,
  title,
  subtitle,
  isRecommended,
  isSelected,
  onPress,
  isGridItem,
}) => (
  <TouchableOpacity
    style={[
      styles.optionCard,
      isSelected && styles.selectedOptionCard,
      isGridItem && styles.gridItem,
    ]}
    onPress={onPress}
  >
    {icon && (
      <Feather
        name={icon}
        size={20}
        color={isSelected ? '#FFFFFF' : '#555'}
        style={styles.optionIcon}
      />
    )}
    <View
      style={[
        styles.optionTextContainer,
        isGridItem && styles.gridItemTextContainer,
      ]}
    >
      <View style={styles.optionHeader}>
        <Text
          style={[styles.optionTitle, isSelected && styles.selectedOptionText]}
        >
          {title}
        </Text>
        {!isSelected && isRecommended && !isGridItem && (
          <View style={styles.recommendedTagRow}>
            <Text style={styles.recommendedText}>Recommended</Text>
          </View>
        )}
      </View>
      <Text
        style={[styles.optionSubtitle, isSelected && styles.selectedOptionText]}
      >
        {subtitle}
      </Text>
      {!isSelected && isRecommended && isGridItem && (
        <View style={styles.recommendedTagColumn}>
          <Text style={styles.recommendedText}>Recommended</Text>
        </View>
      )}
    </View>
  </TouchableOpacity>
);

// --- Main Modal Component ---
interface QuizOptionsModalProps {
  isVisible: boolean;
  onClose: () => void;
}

// ✨ FIX: Create a map for the preview text to avoid parsing errors
const timePreviewMap: Record<TimeLimit, string> = {
  '30s': '30 seconds per question',
  '1m': '60 seconds per question',
  '2m': '120 seconds per question',
  none: 'No time limit',
};

export const QuizOptionsModal: React.FC<QuizOptionsModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [quizType, setQuizType] = useState<QuizType>('multiple-choice');
  const [timeLimit, setTimeLimit] = useState<TimeLimit>('1m');
  const router = useRouter();

  const selectedTypeOption = QUIZ_TYPE_OPTIONS.find(opt => opt.id === quizType);
  const selectedTimeOption = TIME_LIMIT_OPTIONS.find(
    opt => opt.id === timeLimit,
  );

  const handleStartQuiz = () => {
    router.navigate('/study/quiz/start-quiz');
    onClose();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Feather name="cpu" size={20} color="#A9B0D2" />
            <Text style={styles.headerTitle}>Quiz Options</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Quiz Type</Text>
          <View
            style={{
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {QUIZ_TYPE_OPTIONS.map(opt => (
              <OptionCard
                key={opt.id}
                {...opt}
                isSelected={quizType === opt.id}
                onPress={() => setQuizType(opt.id)}
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Time Limit</Text>
          <View style={styles.timeLimitGrid}>
            {TIME_LIMIT_OPTIONS.map(opt => (
              <OptionCard
                key={opt.id}
                {...opt}
                isSelected={timeLimit === opt.id}
                onPress={() => setTimeLimit(opt.id)}
                isGridItem
              />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quiz Preview</Text>
          <View style={styles.previewContainer}>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Type:</Text>
              <Text style={styles.previewValue}>
                {selectedTypeOption?.title}
              </Text>
            </View>
            <View style={styles.previewRow}>
              <Text style={styles.previewLabel}>Time:</Text>
              <Text style={styles.previewValue}>
                {timePreviewMap[timeLimit]}
              </Text>
            </View>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.startButton]}
              onPress={handleStartQuiz}
            >
              <Feather name="clock" size={16} color="#FFFFFF" />
              <Text style={styles.startButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 16,
  },
  optionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    padding: 16,
    alignItems: 'center',
  },
  selectedOptionCard: {
    borderColor: '#A9B0D2',
    backgroundColor: '#A9B0D2',
  },
  gridItem: {
    width: '48%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 90,
  },
  optionTextContainer: {
    flex: 1,
  },
  gridItemTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionIcon: {
    marginRight: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  recommendedTagRow: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  recommendedTagColumn: {
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 4,
  },
  recommendedText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#8A8A8A',
  },
  timeLimitGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  previewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    gap: 8,
  },
  previewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewLabel: {
    fontSize: 14,
    color: '#666',
  },
  previewValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.buttonBorderColor,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#A9B0D2',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },
});
