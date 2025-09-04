import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Export the Tab type so the parent component can use it for state
export type DeckTab = 'words' | 'statistics';

// Define the props for the component
interface DeckTabSelectorProps {
  activeTab: DeckTab;
  onTabChange: (tab: DeckTab) => void;
  wordCount: number;
}

const DeckTabs: React.FC<DeckTabSelectorProps> = ({
  activeTab,
  onTabChange,
  wordCount,
}) => {
  const tabs: {
    id: DeckTab;
    title: string;
    icon: keyof typeof Feather.glyphMap;
  }[] = [
    { id: 'words', title: 'Words', icon: 'book-open' },
    { id: 'statistics', title: 'Statistics', icon: 'bar-chart-2' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        const title =
          tab.id === 'words' ? `${tab.title} (${wordCount})` : tab.title;

        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => onTabChange(tab.id)}
            disabled={isActive}
          >
            <Feather
              name={tab.icon}
              size={16}
              color={isActive ? '#FFFFFF' : '#333333'}
              style={styles.icon}
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.backgroundGray,
    borderRadius: 25,
    padding: 6,
    marginTop: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: '#A9B0D2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    marginRight: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
});

export default DeckTabs;
