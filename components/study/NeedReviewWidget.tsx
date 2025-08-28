import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReviewItem, { ReviewItemProps } from './ReviewItem';

// Mock data for demonstration purposes
const MOCK_REVIEW_ITEMS: ReviewItemProps[] = [
  {
    id: '1',
    title: 'Medical Terminology',
    category: 'Medical',
    wordCount: 300,
    lastStudied: '3 days ago',
  },
  {
    id: '2',
    title: 'French Essentials',
    category: 'Language',
    wordCount: 250,
    lastStudied: '1 week ago',
  },
];

const NeedsReviewWidget: React.FC = () => {
  // In a real app, you would pass this data in as a prop
  const items = MOCK_REVIEW_ITEMS;

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <View style={styles.headerTitleContainer}>
          <Feather name="refresh-cw" size={18} color="#555" />
          <Text style={styles.headerTitle}>Needs Review</Text>
        </View>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{items.length}</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        {items.map(item => (
          <ReviewItem key={item.id} {...item} />
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  countBadge: {
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  countText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 12,
  },
  listContainer: {
    marginTop: 16,
  },
});

export default NeedsReviewWidget;
