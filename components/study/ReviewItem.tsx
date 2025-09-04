import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Props for a single review item
export interface ReviewItemProps {
  id: string;
  title: string;
  category: string;
  wordCount: number;
  lastStudied: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  title,
  category,
  wordCount,
  lastStudied,
}) => {
  const router = useRouter();
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{title}</Text>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{category}</Text>
          </View>
        </View>
        <Text style={styles.detailsText}>
          {wordCount} words · Last: {lastStudied}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.studyButton}
        onPress={() => {
          router.navigate(`/deck-details`);
        }}
      >
        <Feather name="book-open" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
    marginRight: 10,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  tagContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginLeft: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  detailsText: {
    fontSize: 13,
    color: '#8A8A8A',
  },
  studyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  studyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default ReviewItem;
