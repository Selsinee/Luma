import Colors from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface QuizOptionProps {
  text: string;
  isSelected: boolean;
  onPress: () => void;
}

export const QuizOption: React.FC<QuizOptionProps> = ({
  text,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={[styles.radioOuter, isSelected && styles.radioOuterSelected]}>
      {isSelected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#E8E8F0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  radioOuterSelected: {
    borderColor: Colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 12,
    lineHeight: 22,
  },
});
