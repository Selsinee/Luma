import { DeckDetail, DeckListItem } from '@/api';
import { useDeleteDeck } from '@/hooks/useDeleteDeck';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EditDeckModal } from './EditDeckModal';

// --- Reusable sub-component for a single menu item ---
interface MenuItemProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
  isDestructive?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  onPress,
  isDestructive,
}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Feather
        name={icon}
        size={18}
        color={isDestructive ? '#D32F2F' : '#333'}
      />
      <Text
        style={[styles.menuItemText, isDestructive && styles.destructiveText]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface DeckOptionsMenuProps {
  deck: DeckListItem | DeckDetail;
  isVisible: boolean;
  onClose: () => void;
  menuPosition: { top: number; right: number };
  hideStudyOptions?: boolean;
}

const Separator = () => <View style={styles.separator} />;

export const DeckOptionsMenu: React.FC<DeckOptionsMenuProps> = ({
  deck,
  isVisible,
  onClose,
  menuPosition,
  hideStudyOptions = false,
}) => {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const router = useRouter();

  const handleEditPress = () => {
    onClose(); // Close the options menu first
    setEditModalVisible(true); // Then open the edit modal
  };
  const { deleteDeck } = useDeleteDeck();

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Deck',
      'Are you sure you want to delete this deck and all of its words? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // 3. Call the deleteDeck function from the hook
            deleteDeck(deck.id);
            onClose(); // Close the menu
          },
        },
      ],
    );
  };

  const handlePress = (action: string) => {
    Alert.alert(action);
    onClose();
  };

  return (
    <>
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable style={styles.backdrop} onPress={onClose}>
          <View style={[styles.menuContainer, menuPosition]}>
            {!hideStudyOptions && (
              <>
                <MenuItem
                  icon="play"
                  label="Start Study"
                  onPress={() => router.navigate(`/study/flashcard/${deck.id}`)}
                />
                <MenuItem
                  icon="cpu"
                  label="Take Quiz"
                  onPress={() => handlePress('Take Quiz')}
                />
                <Separator />
              </>
            )}

            <MenuItem
              icon="edit-2"
              label="Edit Deck"
              onPress={handleEditPress}
            />
            <MenuItem
              icon="copy"
              label="Duplicate"
              onPress={() => handlePress('Duplicate')}
            />
            <MenuItem
              icon="share-2"
              label="Share"
              onPress={() => handlePress('Share')}
            />
            <Separator />
            <MenuItem
              icon="archive"
              label="Archive"
              onPress={() => handlePress('Archive')}
            />
            <MenuItem
              icon="trash-2"
              label="Delete"
              onPress={handleDeletePress}
              isDestructive
            />
          </View>
        </Pressable>
      </Modal>

      {deck && (
        <EditDeckModal
          isVisible={isEditModalVisible}
          onClose={() => setEditModalVisible(false)}
          deck={deck}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  menuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 6, // ✨ Slightly reduced vertical padding ✨
    width: 180, // ✨ Reduced width to fit smaller content ✨
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14, // ✨ Slightly reduced horizontal padding ✨
    paddingVertical: 10, // ✨ Slightly reduced vertical padding ✨
  },
  menuItemText: {
    marginLeft: 10, // ✨ Reduced margin to align with smaller icon ✨
    fontSize: 14, // ✨ Text size reduced to 14 ✨
    color: '#333',
  },
  destructiveText: {
    color: '#D32F2F',
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E8F0',
    marginVertical: 3, // ✨ Slightly reduced vertical margin ✨
  },
});
