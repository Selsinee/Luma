import Colors from '@/constants/Colors';
import { useAlmostMasteredDecks } from '@/hooks/useAlmostMasteredDecks';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MasteredItem from './MasteredItem';

const AlmostMasteredWidget: React.FC = () => {
  const { data: items, error } = useAlmostMasteredDecks();

  if (error || !items || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.widgetContainer}>
      <View style={styles.widgetHeader}>
        <Feather name="award" size={18} color="#555" />
        <Text style={styles.headerTitle}>Almost Mastered</Text>
      </View>

      <View style={styles.listContainer}>
        {items?.map(item => (
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
