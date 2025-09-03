import { Feather } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the types for the card's props
type Difficulty = 'easy' | 'medium' | 'hard';
type Status = 'mastered' | 'learning';

export interface WordCardProps {
  id: string;
  word: string;
  difficulty: Difficulty;
  status?: Status;
  definition: string;
  example: string;
  lastReviewed: string;
}

const difficultyStyles = {
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

const WordCard: React.FC<WordCardProps> = ({
  word,
  difficulty,
  status,
  definition,
  example,
  lastReviewed,
}) => {
  const diffStyle = difficultyStyles[difficulty];
  const isMastered = status === 'mastered';

  const speakWord = async () => {
    // Stop any speech that is already in progress
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      await Speech.stop();
    }
    // Speak the current word
    Speech.speak(word, { language: 'en-US' });
  };

  return (
    <View
      style={[
        styles.card,
        isMastered ? styles.masteredCardBackground : styles.defaultCardBorder,
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.word}>{word}</Text>
        <View style={styles.headerIcons}>
          {/* 3. Add the onPress handler to the TouchableOpacity */}
          <TouchableOpacity onPress={speakWord}>
            <Feather name="volume-2" size={20} color="#555" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <Feather name="more-vertical" size={20} color="#555" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        <View
          style={[styles.tag, { backgroundColor: diffStyle.backgroundColor }]}
        >
          <Text style={[styles.tagText, { color: diffStyle.color }]}>
            {difficulty}
          </Text>
        </View>
        {isMastered && (
          <View style={[styles.tag, styles.masteredTag]}>
            <Text style={[styles.tagText, styles.masteredTagText]}>
              Mastered
            </Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Definition</Text>
        <Text style={styles.sectionText}>{definition}</Text>
        <Text style={[styles.sectionTitle, { marginTop: 12 }]}>Example</Text>
        <Text style={styles.sectionText}>{example}</Text>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Last reviewed: {lastReviewed}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  defaultCardBorder: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8E8F0',
  },
  masteredCardBackground: {
    backgroundColor: '#F7FEF9',
    borderColor: '#C8E6C9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  word: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tag: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  masteredTag: {
    backgroundColor: '#C8E6C9',
  },
  masteredTagText: {
    color: '#2d7130ff',
  },
  contentSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    color: '#8A8A8A',
    marginBottom: 4,
  },
  sectionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  footerText: {
    marginTop: 16,
    fontSize: 12,
    color: '#B0B0B0',
    alignSelf: 'flex-end',
  },
});

export default WordCard;
