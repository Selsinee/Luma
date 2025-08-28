import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MasteredItem, { MasteredItemProps } from './MasteredItem';

// Mock data for demonstration purposes
const MOCK_MASTERED_ITEMS: MasteredItemProps[] = [
  {
    id: '1',
    title: 'Medical Terminology',
    progress: 89,
    wordCount: 300,
    category: 'Medical',
  },
  {
    id: '2',
    title: 'Business English',
    progress: 78,
    wordCount: 180,
    category: 'Business',
  },
];

const AlmostMasteredWidget: React.FC = () => {
  // In a real app, you would pass this data in as a prop
  const items = MOCK_MASTERED_ITEMS;

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Feather name="award" size={18} color="#555" />
        <Text style={styles.headerTitle}>Almost Mastered</Text>
      </View>

      <View style={styles.listContainer}>
        {items.map(item => (
          <MasteredItem key={item.id} {...item} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  widgetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  listContainer: {
    // Styles for the container of the list items
  },
});

export default AlmostMasteredWidget;
