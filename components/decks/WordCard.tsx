import { StatusEnum, WordWithProgress } from '@/api';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import * as Speech from 'expo-speech';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DifficultyTag from '../tags/DifficultyTag';
import MasteredTag from '../tags/MasteredTag';
import { WordOptionsMenu } from './WordOptionsMenu';

const WordCard: React.FC<WordWithProgress> = ({
  id,
  word,
  difficulty,
  status,
  definition,
  example,
  last_reviewed_at,
}) => {
  // ✨ Local state to manage the mastered status
  const [currentStatus, setCurrentStatus] = useState(status);
  const isMastered = currentStatus === 'mastered';

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuTriggerRef = useRef<View>(null);

  const speakWord = async () => {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      await Speech.stop();
    }
    Speech.speak(word, { language: 'en-US' });
  };

  const onMenuOpen = () => {
    menuTriggerRef.current?.measure((_fx, _fy, _width, height, _px, py) => {
      setMenuPosition({ top: py + height, right: 20 });
      setMenuVisible(true);
    });
  };

  const handleToggleMastery = () => {
    const newStatus = isMastered ? StatusEnum.LEARNING : StatusEnum.MASTERED;
    setCurrentStatus(newStatus);
    // In a real app, you would also call a function from props here
    // to update the state in your database, e.g., onStatusChange(id, newStatus);
    setMenuVisible(false); // Close menu after action
  };

  return (
    <View
      style={[
        styles.card,
        isMastered ? styles.masteredCardBackground : styles.defaultCardBorder,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.word}>{word}</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={speakWord}>
            <Feather name="volume-2" size={20} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity
            ref={menuTriggerRef}
            onPress={onMenuOpen}
            style={{ marginLeft: 16 }}
          >
            <Feather name="more-vertical" size={20} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        <DifficultyTag difficulty={difficulty} />
        {isMastered && <MasteredTag />}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Definition</Text>
        <Text style={styles.sectionText}>{definition}</Text>
        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Example</Text>
        <Text style={styles.sectionText}>{example}</Text>
      </View>

      {last_reviewed_at && (
        <Text style={styles.footerText}>
          Last reviewed:{' '}
          {format(new Date(last_reviewed_at), 'eee, MMM dd, yyyy')}
        </Text>
      )}

      <WordOptionsMenu
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        menuPosition={menuPosition}
        status={status}
        onToggleMastery={handleToggleMastery}
      />
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  card: { borderRadius: 12, borderWidth: 1, padding: 16, marginBottom: 16 },
  defaultCardBorder: { backgroundColor: '#FFFFFF', borderColor: '#E8E8F0' },
  masteredCardBackground: {
    backgroundColor: '#F7FEF9',
    borderColor: '#C8E6C9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  headerIcons: { flexDirection: 'row' },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 4,
  },
  contentSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  sectionTitle: { fontSize: 12, color: '#8A8A8A', marginBottom: 4 },
  sectionText: { fontSize: 14, color: '#333', lineHeight: 20 },
  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: '#B0B0B0',
    alignSelf: 'flex-end',
  },
});

export default WordCard;
