import Colors from '@/constants/Colors';
import { useRecentDecks } from '@/hooks/useRecentDecks';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StudyItem from './StudyItem';

const ContinueStudyingWidget: React.FC = () => {
  const { data } = useRecentDecks();
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Feather name="clock" size={18} color="#555" />
        <Text style={styles.headerTitle}>Continue Studying</Text>
      </View>

      <View style={styles.listContainer}>
        {data.map(item => (
          <StudyItem key={item.id} item={item} />
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  listContainer: {
    marginTop: 16,
  },
});

export default ContinueStudyingWidget;
