import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EmptyStudySession: React.FC = () => {
  const router = useRouter();

  const handleBrowseDecks = () => {
    // Navigate to the 'decks' tab
    router.push('/decks');
  };

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={styles.iconCircle}>
        <Feather name="book-open" size={36} color="#6A67F3" />
      </View>

      {/* Title */}
      <Text style={styles.title}>Study Session</Text>

      {/* Description */}
      <Text style={styles.description}>
        Choose a deck from your collection to start studying
      </Text>

      {/* Browse Decks Button */}
      <TouchableOpacity style={styles.button} onPress={handleBrowseDecks}>
        <Text style={styles.buttonText}>Browse Decks</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', // Assuming a white background for the component area
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40, // Makes it a perfect circle
    backgroundColor: '#F0F0F7', // Light purple background
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
    maxWidth: 280, // Limit width for better readability on wider screens
  },
  button: {
    backgroundColor: '#A9B0D2',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmptyStudySession;
