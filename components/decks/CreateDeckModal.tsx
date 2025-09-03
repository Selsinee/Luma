import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// --- Reusable sub-component for a single category button ---
const CATEGORIES = [
  { id: 'academic', label: 'Academic', icon: 'book-open' as const },
  { id: 'language', label: 'Language', icon: 'globe' as const },
  { id: 'medical', label: 'Medical', icon: 'heart' as const },
  { id: 'business', label: 'Business', icon: 'briefcase' as const },
  { id: 'test-prep', label: 'Test Prep', icon: 'target' as const },
  { id: 'general', label: 'General', icon: 'box' as const },
];

interface CategoryButtonProps {
  label: string;
  icon: keyof typeof Feather.glyphMap;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  label,
  icon,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        isSelected && styles.selectedCategoryButton,
      ]}
      onPress={onPress}
    >
      <Feather name={icon} size={20} color={isSelected ? '#FFFFFF' : '#333'} />
      <Text
        style={[
          styles.categoryLabel,
          isSelected && styles.selectedCategoryLabel,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

// --- Main Modal Component ---
interface CreateDeckModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CreateDeckModal: React.FC<CreateDeckModalProps> = ({
  isVisible,
  onClose,
}) => {
  const [deckTitle, setDeckTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCreate = () => {
    // Add validation logic here
    if (!deckTitle || !selectedCategory) {
      Alert.alert(
        'Missing Information',
        'Please provide a title and select a category.',
      );
      return;
    }
    // Handle deck creation logic...
    Alert.alert('Success', `Deck "${deckTitle}" created!`);
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
        <Pressable style={styles.modalContent} onPress={Keyboard.dismiss}>
          <View style={styles.header}>
            <Feather name="box" size={20} color="#A9B0D2" />
            <Text style={styles.headerTitle}>Create New Deck</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#555" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Deck Title *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Spanish Vocabulary, SAT Words..."
            value={deckTitle}
            onChangeText={setDeckTitle}
            maxLength={50}
          />
          <Text style={styles.charCount}>{deckTitle.length}/50 characters</Text>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe what this deck is for..."
            value={description}
            onChangeText={setDescription}
            maxLength={200}
            multiline
          />
          <Text style={styles.charCount}>
            {description.length}/200 characters
          </Text>

          <Text style={styles.label}>Category *</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map(category => (
              <CategoryButton
                key={category.id}
                label={category.label}
                icon={category.icon}
                isSelected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={handleCreate}
            >
              <Feather name="plus" size={16} color="#FFFFFF" />
              <Text style={styles.createButtonText}>Create Deck</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>
            You can add words to your deck after creating it. Start with a clear
            title and category to organize your learning.
          </Text>
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9FB',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#A9B0D2',
    borderColor: '#A9B0D2',
  },
  categoryLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  selectedCategoryLabel: {
    color: '#FFFFFF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  button: {
    flex: 1,
    maxWidth: '48%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 14,
  },
  createButton: {
    backgroundColor: '#A9B0D2',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  footerNote: {
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CreateDeckModal;
