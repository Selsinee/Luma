import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Define the possible variants for type safety
type StatCardVariant = 'streak' | 'words';

// Update the props to use 'variant' instead of 'theme'
interface StatCardProps {
  value: string;
  label: string;
  iconName: keyof typeof Feather.glyphMap;
  variant: StatCardVariant;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  iconName,
  variant,
}) => {
  const isStreak = variant === 'streak';

  return (
    <View
      style={[styles.card, isStreak ? styles.cardStreak : styles.cardWords]}
    >
      <View
        style={[
          styles.iconContainer,
          isStreak ? styles.iconContainerStreak : styles.iconContainerWords,
        ]}
      >
        <Feather
          name={iconName}
          size={24}
          color={isStreak ? '#6A67F3' : '#BF360C'}
        />
      </View>
      <Text
        style={[
          styles.valueText,
          isStreak ? styles.valueTextStreak : styles.valueTextWords,
        ]}
      >
        {value}
      </Text>
      <Text
        style={[
          styles.labelText,
          isStreak ? styles.labelTextStreak : styles.labelTextWords,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  // --- Base Styles ---
  card: {
    // flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: 12,
    marginTop: 4,
  },
  // --- Streak Variant Styles ---
  cardStreak: {
    backgroundColor: '#F9F9FB',
    borderColor: '#E8E8F0',
  },
  iconContainerStreak: {
    backgroundColor: '#EAEAFB',
  },
  valueTextStreak: {
    color: '#6A67F3',
  },
  labelTextStreak: {
    color: '#8A8A8A',
  },
  // --- Words Variant Styles ---
  cardWords: {
    backgroundColor: '#FFFBE6',
    borderColor: '#FFECB3',
  },
  iconContainerWords: {
    backgroundColor: '#FFE082',
  },
  valueTextWords: {
    color: '#BF360C',
  },
  labelTextWords: {
    color: '#BF360C',
  },
});

export default StatCard;
