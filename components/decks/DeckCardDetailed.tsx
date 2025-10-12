import { DeckListItem } from '@/api';
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DeckOptionsMenu } from './DeckOptionsMenu';

const DeckCardDetailed: React.FC<DeckListItem> = ({
  id,
  title,
  description,
  category,
  last_studied,
  studied_today,
  total_items,
  current_progress,
}) => {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const triggerRef = useRef<View>(null);

  const onMenuPress = () => {
    triggerRef.current?.measure((_fx, _fy, _width, height, px, py) => {
      setMenuPosition({
        top: py + height,
        right: 20,
      });
      setMenuVisible(true);
    });
  };

  return (
    <>
      <DeckOptionsMenu
        deckId={id}
        isVisible={menuVisible}
        onClose={() => setMenuVisible(false)}
        menuPosition={menuPosition}
      />

      <TouchableOpacity
        style={styles.cardContainer}
        onPress={() => {
          router.navigate(`/deck/${id}`);
        }}
      >
        {/* Header Section */}
        <View style={styles.headerRow}>
          <View style={styles.headerInfo}>
            <View style={styles.iconContainer}>
              <Feather name="book-open" size={20} color={Colors.primary} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.deckTitle}>{title}</Text>
              <Text style={styles.deckDescription}>{description}</Text>
            </View>
          </View>
          <TouchableOpacity ref={triggerRef} onPress={onMenuPress}>
            <Feather name="more-vertical" size={18} color="#8A8A8A" />
          </TouchableOpacity>
        </View>

        {/* Category Tag */}
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{category}</Text>
        </View>

        {/* Progress Bar Section */}
        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.percentageText}>{current_progress}%</Text>
        </View>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, { width: `${current_progress}%` }]}
          />
        </View>

        {/* Stats Section */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{total_items} cards</Text>
            {last_studied && (
              <>
                <Text style={styles.statLabel}> · </Text>
                <Feather name="clock" size={12} color="#8A8A8A" />
                <Text style={styles.statLabel}>
                  {format(new Date(last_studied), 'eee, MMM dd, yyyy')}
                </Text>
              </>
            )}
          </View>
          <Text style={styles.statLabel}>{studied_today} studied today</Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.studyButton}
          onPress={() => {
            router.navigate(`/deck/${id}`);
          }}
        >
          <Text style={styles.studyButtonText}>Study Now</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F0F0F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  deckTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  deckDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  tagContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  progressSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  progressLabel: {
    fontSize: 12,
    color: '#8A8A8A',
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E8E8F0',
    borderRadius: 4,
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  statLabel: {
    fontSize: 12,
    color: '#8A8A8A',
    marginLeft: 4,
  },
  studyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  studyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DeckCardDetailed;
