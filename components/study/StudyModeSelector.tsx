import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type StudyMode = 'flashcards' | 'quiz';

const DESCRIPTIONS: Record<StudyMode, string> = {
  flashcards: 'Swipe-based learning with spaced repetition',
  quiz: 'Test your knowledge with timed quizzes',
};

const StudyModeSelector: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<StudyMode>('flashcards');

  const ModeButton = ({
    mode,
    title,
    iconName,
  }: {
    mode: StudyMode;
    title: string;
    iconName: keyof typeof Feather.glyphMap;
  }) => {
    const isActive = selectedMode === mode;
    return (
      <TouchableOpacity
        style={[
          styles.button,
          isActive ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => setSelectedMode(mode)}
      >
        <Feather
          name={iconName}
          size={24}
          color={isActive ? '#FFFFFF' : '#333333'}
        />
        <Text
          style={[
            styles.buttonText,
            isActive ? styles.activeText : styles.inactiveText,
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <Feather name="settings" size={18} color="#555" />
        <Text style={styles.title}>Study Mode</Text>
      </View>

      <View style={styles.buttonRow}>
        <ModeButton mode="flashcards" title="Flashcards" iconName="book-open" />
        <ModeButton mode="quiz" title="Quiz Mode" iconName="clock" />
      </View>

      <Text style={styles.subtitle}>{DESCRIPTIONS[selectedMode]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    alignItems: 'center',
    marginTop: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 10,
    marginHorizontal: 6, // Gives space between buttons
  },
  activeButton: {
    backgroundColor: Colors.primary,
  },
  inactiveButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#333333',
  },
  subtitle: {
    fontSize: 12,
    color: '#8A8A8A',
  },
});

export default StudyModeSelector;
