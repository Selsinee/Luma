import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BaseHeader from '../BaseHeader';

interface StudyHeaderProps {
  deckTitle: string;
  currentCardIndex: number;
  totalCards: number;
  masteryPercentage: number;
  onBackPress?: () => void;
  onMenuPress?: () => void;
}

const StudyHeader: React.FC<StudyHeaderProps> = ({
  deckTitle,
  currentCardIndex,
  totalCards,
  masteryPercentage,
  onBackPress,
  onMenuPress,
}) => {
  const progressWidth =
    totalCards > 0 ? (currentCardIndex / totalCards) * 100 : 0;

  return (
    <View>
      <BaseHeader
        type="page"
        title={deckTitle}
        style={{ borderBottomWidth: 0, paddingBottom: 0 }}
        rightToolbar={
          <TouchableOpacity style={styles.iconButton} onPress={onMenuPress}>
            <Feather name="more-vertical" size={22} color="#333" />
          </TouchableOpacity>
        }
      />
      <View style={[styles.container]}>
        <View style={styles.progressTextRow}>
          <Text style={styles.cardProgress}>
            {currentCardIndex} of {totalCards}
          </Text>
          <Text style={styles.percentage}>{masteryPercentage}%</Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${progressWidth}%` }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8F0',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconButton: {
    padding: 4,
  },
  deckTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  cardProgress: {
    fontSize: 14,
    color: '#8A8A8A',
  },
  percentage: {
    fontSize: 14,
    color: '#8A8A8A',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E8E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A9B0D2',
    borderRadius: 3,
  },
});

export default StudyHeader;
