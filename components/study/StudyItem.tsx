import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Props for a single study item
export interface StudyItemProps {
  id: string;
  title: string;
  studiedToday: number;
  progress: number; // Percentage from 0 to 100
}

const StudyItem: React.FC<StudyItemProps> = ({
  title,
  studiedToday,
  progress,
}) => {
  return (
    <TouchableOpacity style={styles.itemContainer}>
      {/* Main content container for everything on the left */}
      <View style={styles.mainContent}>
        <View style={styles.topRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.statsBadge}>
            <Feather name="trending-up" size={14} color="#2E7D32" />
            <Text style={styles.statsText}>{studiedToday} today</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.percentageText}>{progress}%</Text>
        </View>
      </View>

      {/* Arrow Icon on the far right */}
      <View style={styles.arrowContainer}>
        <Feather name="arrow-right" size={18} color="#555" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    marginBottom: 12,
    flexDirection: 'row', // Aligns main content and arrow horizontally
    alignItems: 'center', // Centers them vertically
  },
  mainContent: {
    flex: 1,
    marginRight: 12, // Space between content and arrow
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  statsText: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '500',
    marginLeft: 4,
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomRow: {
    alignItems: 'flex-end',
  },
  progressBarBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#E8E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  percentageText: {
    fontSize: 12,
    color: '#8A8A8A',
    marginTop: 4,
  },
});

export default StudyItem;
