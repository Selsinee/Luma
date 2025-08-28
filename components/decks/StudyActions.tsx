import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Define the props for the component
interface StudyActionsProps {
  onStudyPress?: () => void;
  onQuizPress?: () => void;
}

const StudyActions: React.FC<StudyActionsProps> = ({
  onStudyPress,
  onQuizPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Study Cards Button (Primary) */}
      <TouchableOpacity
        style={[styles.button, styles.primaryButton]}
        onPress={onStudyPress}
      >
        <Feather name="play" size={16} color="#FFFFFF" />
        <Text style={styles.primaryButtonText}>Study Cards</Text>
      </TouchableOpacity>

      {/* Take Quiz Button (Secondary) */}
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={onQuizPress || (() => Alert.alert('Take Quiz pressed'))}
      >
        <Feather name="clipboard" size={16} color="#333333" />
        <Text style={styles.secondaryButtonText}>Take Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  primaryButton: {
    backgroundColor: '#A9B0D2',
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginLeft: 8,
  },
  secondaryButtonText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default StudyActions;
