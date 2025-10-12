import { StatusEnum } from '@/api';
import { useDeleteWord } from '@/hooks/useDeleteWord';
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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

interface WordOptionsMenuProps {
  wordId: string;
  isVisible: boolean;
  onClose: () => void;
  menuPosition: { top: number; right: number };
  status?: StatusEnum | null;
  onToggleMastery: () => void;
}

const Separator = () => <View style={styles.separator} />;

export const WordOptionsMenu: React.FC<WordOptionsMenuProps> = ({
  wordId,
  isVisible,
  onClose,
  menuPosition,
  status,
  onToggleMastery,
}) => {
  const { deckId } = useLocalSearchParams<{ deckId: string }>();
  const { deleteWord } = useDeleteWord();

  const handleDeletePress = () => {
    Alert.alert(
      'Delete Word',
      'Are you sure you want to permanently delete this word?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteWord({ deckId, wordId });
            onClose();
          },
        },
      ],
    );
  };

  const isMastered = status === 'mastered';
  const handlePress = (action: string) => {
    Alert.alert(action);
    onClose();
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <View style={[styles.menuContainer, menuPosition]}>
          <MenuItem
            icon="star"
            label={isMastered ? 'Mark as Learning' : 'Mark as Mastered'}
            onPress={onToggleMastery}
          />
          <MenuItem
            icon="volume-2"
            label="Play Audio"
            onPress={() => handlePress('Playing Audio')}
          />
          <Separator />
          <MenuItem
            icon="edit-2"
            label="Edit Word"
            onPress={() => handlePress('Edit Word')}
          />
          <MenuItem
            icon="copy"
            label="Duplicate"
            onPress={() => handlePress('Duplicate')}
          />
          <MenuItem
            icon="refresh-cw"
            label="Reset Progress"
            onPress={() => handlePress('Reset Progress')}
          />
          <Separator />
          <MenuItem
            icon="trash-2"
            label="Delete"
            onPress={handleDeletePress}
            isDestructive
          />
        </View>
      </Pressable>
    </Modal>
  );
};
// Styles are the same as the previous version
const styles = StyleSheet.create({
  backdrop: { flex: 1 },
  menuContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 6,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  menuItemText: { marginLeft: 10, fontSize: 14, color: '#333' },
  destructiveText: { color: '#D32F2F' },
  separator: { height: 1, backgroundColor: '#E8E8F0', marginVertical: 3 },
});
