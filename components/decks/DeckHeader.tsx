import { Feather } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BaseHeader from '../BaseHeader';
import { DeckOptionsMenu } from './DeckOptionsMenu';

// Props for the Deck Header component
interface DeckHeaderProps {
  deckId: string;
  title: string;
  category: string;
}

const DeckHeader: React.FC<DeckHeaderProps> = ({ deckId, title, category }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<View>(null);

  const onMenuPress = () => {
    triggerRef.current?.measure((_fx, _fy, _width, height, px, py) => {
      setMenuPosition({
        top: py + height,
        right: 20,
      });
      setMenuVisible(true);
    });
  };

  return (
    <View>
      <BaseHeader
        type="page"
        title={title}
        subtitle={category}
        style={{}}
        rightToolbar={
          <TouchableOpacity
            style={styles.iconButton}
            ref={triggerRef}
            onPress={onMenuPress}
          >
            <Feather name="more-vertical" size={24} color="#333" />
          </TouchableOpacity>
        }
      />

      <DeckOptionsMenu
        deckId={deckId}
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        menuPosition={menuPosition}
        hideStudyOptions
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconButton: {
    padding: 4, // Makes the touch area larger
  },
});

export default DeckHeader;
