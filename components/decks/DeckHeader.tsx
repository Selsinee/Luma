import { Feather } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Props for the Deck Header component
interface DeckHeaderProps {
  title: string;
  category: string;
  onMenuPress?: () => void;
}

const DeckHeader: React.FC<DeckHeaderProps> = ({
  title,
  category,
  onMenuPress,
}) => {
  // Get the top inset to add padding for the status bar
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      {/* Back Button */}
      <TouchableOpacity style={styles.iconButton} onPress={navigation.goBack}>
        <Feather name="chevron-left" size={24} color="#333" />
      </TouchableOpacity>

      {/* Title and Category */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>

      {/* Menu Button */}
      <TouchableOpacity
        style={styles.iconButton}
        onPress={onMenuPress || (() => Alert.alert('Menu pressed'))}
      >
        <Feather name="more-vertical" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8F0',
  },
  iconButton: {
    padding: 4, // Makes the touch area larger
  },
  titleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  category: {
    fontSize: 14,
    color: '#8A8A8A',
    marginTop: 2,
  },
});

export default DeckHeader;
