import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StudyItem, { StudyItemProps } from './StudyItem';

// Mock data for demonstration purposes
const MOCK_STUDY_ITEMS: StudyItemProps[] = [
  {
    id: '1',
    title: 'Advanced Vocabulary',
    studiedToday: 25,
    progress: 67,
  },
  {
    id: '2',
    title: 'Spanish Basics',
    studiedToday: 15,
    progress: 34,
  },
  {
    id: '3',
    title: 'TOEFL Preparation',
    studiedToday: 30,
    progress: 45,
  },
];

const ContinueStudyingWidget: React.FC = () => {
  // In a real app, this data would come from props or a state management store
  const items = MOCK_STUDY_ITEMS;

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Feather name="clock" size={18} color="#555" />
        <Text style={styles.headerTitle}>Continue Studying</Text>
      </View>

      <View style={styles.listContainer}>
        {items.map(item => (
          <StudyItem key={item.id} {...item} />
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
