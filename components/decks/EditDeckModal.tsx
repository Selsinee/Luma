// components/decks/EditDeckModal.tsx
import { DeckDetail, DeckListItem, DeckUpdate } from '@/api';
import { useCategories } from '@/hooks/useCategories';
import { useUpdateDeck } from '@/hooks/useUpdateDeck';
import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface EditDeckModalProps {
  isVisible: boolean;
  onClose: () => void;
  deck: DeckListItem | DeckDetail;
}

export const EditDeckModal: React.FC<EditDeckModalProps> = ({
  isVisible,
  onClose,
  deck,
}) => {
  const [title, setTitle] = useState(deck.title);
  const [description, setDescription] = useState(deck.description || '');
  const [category, setCategory] = useState(deck.category);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const { updateDeck, isLoading } = useUpdateDeck();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  useEffect(() => {
    if (isVisible) {
      setTitle(deck.title);
      setDescription(deck.description || '');
      setCategory(deck.category);
      setPickerVisible(false);
    }
  }, [isVisible, deck]);

  const handleSaveChanges = async () => {
    if (!title || !category) {
      Alert.alert('Error', 'Deck Title and Category are required.');
      return;
    }

    const deckData: DeckUpdate = {
      title,
      description,
      category,
    };

    try {
      await updateDeck({ deckId: deck.id, deckData });
      onClose(); // Close modal on success
    } catch (e) {
      console.error('Failed to update deck:', e);
    }
  };

  const handleSelectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setPickerVisible(false); // Hide the dropdown after selection
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalBackdrop} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={e => e.stopPropagation()}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Edit Deck</Text>
            <TouchableOpacity onPress={onClose}>
              <Feather name="x" size={24} color="#555" />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Modify your deck details. Changes will be saved immediately.
          </Text>

          {/* Form */}
          <Text style={styles.label}>Deck Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Category</Text>
          <View>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setPickerVisible(!isPickerVisible)}
            >
              <Text style={styles.pickerText}>{category}</Text>
              <Feather
                name={isPickerVisible ? 'chevron-up' : 'chevron-down'}
                size={20}
                color="#555"
              />
            </TouchableOpacity>

            {isPickerVisible && (
              <View style={styles.dropdown}>
                {isLoadingCategories ? (
                  <ActivityIndicator />
                ) : (
                  <FlatList
                    data={categories}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleSelectCategory(item.name)}
                      >
                        <Feather
                          name={item.icon_name as keyof typeof Feather.glyphMap}
                          size={18}
                          color="#555"
                        />
                        <Text style={styles.dropdownItemText}>{item.name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSaveChanges}
              disabled={isLoading}
            >
              <Text style={styles.saveButtonText}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
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
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  pickerText: {
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#A9B0D2',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  dropdown: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    maxHeight: 150,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
