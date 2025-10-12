import { DifficultyEnum } from '@/api';
import Colors from '@/constants/Colors';
import { useAddWord } from '@/hooks/useAddNewWord';
import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Reusable Difficulty Option Component ---
interface DifficultyOptionProps {
  label: string;
  description: string;
  value: DifficultyEnum;
  selectedValue: DifficultyEnum;
  onSelect: (value: DifficultyEnum) => void;
}

const DifficultyOption: React.FC<DifficultyOptionProps> = ({
  label,
  description,
  value,
  selectedValue,
  onSelect,
}) => {
  const isSelected = value === selectedValue;
  const tagColor =
    value === 'easy' ? '#2E7D32' : value === 'medium' ? '#FF8F00' : '#C62828';
  const tagBg =
    value === 'easy' ? '#E8F5E9' : value === 'medium' ? '#FFF8E1' : '#FFEBEE';

  return (
    <TouchableOpacity
      style={[
        styles.difficultyOption,
        isSelected && styles.difficultyOptionSelected,
      ]}
      onPress={() => onSelect(value)}
    >
      <View style={styles.difficultyLeftContent}>
        {isSelected && (
          <Feather
            name="check-circle"
            size={18}
            color="#A9B0D2"
            style={styles.checkIcon}
          />
        )}
        <View style={{ marginLeft: isSelected ? 8 : 0 }}>
          <Text style={styles.difficultyLabel}>{label}</Text>
          <Text style={styles.difficultyDescription}>{description}</Text>
        </View>
      </View>
      {/* <View style={[styles.difficultyTag, { backgroundColor: tagBg }]}>
        <Text style={[styles.difficultyTagText, { color: tagColor }]}>
          {value}
        </Text>
      </View> */}
    </TouchableOpacity>
  );
};

// --- Main AddNewWordModal Component ---
interface AddNewWordModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AddNewWordModal: React.FC<AddNewWordModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [difficulty, setDifficulty] = useState<DifficultyEnum>(
    DifficultyEnum.MEDIUM,
  );
  const { addWord, isLoading } = useAddWord(deckId);

  const handleAddWord = async () => {
    if (!word || !definition) {
      Alert.alert(
        'Missing Information',
        'Please fill in the word and definition fields.',
      );
      return;
    }

    try {
      await addWord({
        word: word.trim(),
        definition: definition.trim(),
        example: example.trim() || undefined,
        difficulty,
      });

      setWord('');
      setDefinition('');
      setExample('');
      setDifficulty(DifficultyEnum.MEDIUM);
      onClose();
    } catch (e) {
      console.error('Failed to add word:', e);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <Pressable
          style={styles.modalContent}
          onPress={() => Keyboard.dismiss()}
        >
          {/* Header */}
          <View style={styles.header}>
            <Feather name="box" size={24} color="#A9B0D2" />
            <Text style={styles.headerTitle}>Add New Word</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          {/* Scrollable Form Content */}
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Word Input */}
            <Text style={styles.inputLabel}>Word</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter the word..."
              value={word}
              onChangeText={setWord}
              maxLength={50}
            />
            <Text style={styles.charCount}>{word.length}/50 characters</Text>

            {/* Definition Input */}
            <Text style={styles.inputLabel}>Definition</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              placeholder="Enter the definition..."
              value={definition}
              onChangeText={setDefinition}
              multiline
              maxLength={300}
            />
            <Text style={styles.charCount}>
              {definition.length}/300 characters
            </Text>

            {/* Example Sentence Input */}
            <Text style={styles.inputLabel}>Example Sentence (Optional)</Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              placeholder="Enter an example sentence..."
              value={example}
              onChangeText={setExample}
              multiline
              maxLength={200}
            />
            <Text style={styles.charCount}>
              {example.length}/200 characters
            </Text>

            {/* Difficulty Level Selector */}
            <Text style={styles.inputLabel}>Difficulty Level</Text>
            <DifficultyOption
              label={capitalizeFirstLetter(DifficultyEnum.EASY)}
              description="Common words you see often"
              value={DifficultyEnum.EASY}
              selectedValue={difficulty}
              onSelect={setDifficulty}
            />
            <DifficultyOption
              label={capitalizeFirstLetter(DifficultyEnum.MEDIUM)}
              description="Words that need some practice"
              value={DifficultyEnum.MEDIUM}
              selectedValue={difficulty}
              onSelect={setDifficulty}
            />
            <DifficultyOption
              label={capitalizeFirstLetter(DifficultyEnum.HARD)}
              description="Challenging words to master"
              value={DifficultyEnum.HARD}
              selectedValue={difficulty}
              onSelect={setDifficulty}
            />

            {/* Tips for better learning */}
            <View style={styles.tipsContainer}>
              <Feather
                name="info"
                size={16}
                color="#8A8A8A"
                style={{ marginRight: 8, marginTop: 4 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.tipsTitle}>Tips for better learning:</Text>
                <Text style={styles.tipsText}>
                  • Use clear, concise definitions
                </Text>
                <Text style={styles.tipsText}>
                  • Add example sentences to understand usage
                </Text>
                <Text style={styles.tipsText}>
                  • Set appropriate difficulty levels for spaced repetition
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Footer Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.addWordButton]}
              onPress={handleAddWord}
            >
              <Feather
                name="plus"
                size={20}
                color="#FFFFFF"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.addWordButtonText}>Add Word</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker backdrop
  },
  modalContent: {
    width: '90%', // Wider for more content
    maxWidth: 500, // Max width for larger screens
    height: '85%', // Taller to fit more inputs
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, // Adjust for the icon on the left
  },
  scrollContent: {
    flexGrow: 1,
    // paddingBottom: 16, // Space for footer
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  textInput: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#8A8A8A',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  difficultyOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8F0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  difficultyOptionSelected: {
    borderColor: '#A9B0D2',
    backgroundColor: '#F0F3F9',
  },
  difficultyLeftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkIcon: {
    marginRight: 8,
  },
  difficultyLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  difficultyDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  difficultyTag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  difficultyTagText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  tipsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F3F9',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  tipsText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Space above buttons
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
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
  addWordButton: {
    backgroundColor: '#A9B0D2',
  },
  addWordButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
