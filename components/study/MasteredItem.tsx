import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Props for a single mastered item
export interface MasteredItemProps {
  id: string;
  title: string;
  progress: number; // Percentage from 0 to 100
  wordCount: number;
  category: string;
}

const MasteredItem: React.FC<MasteredItemProps> = ({
  title,
  progress,
  wordCount,
  category,
}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Feather
            name="star"
            size={14}
            color="#FFC107"
            style={styles.starIcon}
          />
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
        <Text style={styles.detailsText}>
          {wordCount} words · {category}
        </Text>
      </View>
      <TouchableOpacity style={styles.finishButton}>
        <Feather name="zap" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // ✨ Changed background color here ✨
    backgroundColor: '#FFFBE6', // A light yellow to match the UI
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
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
  starIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#FFC107',
  },
  detailsText: {
    fontSize: 13,
    color: '#8A8A8A',
  },
  finishButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
});

export default MasteredItem;
