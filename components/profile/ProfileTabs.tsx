import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export type Tab = 'stats' | 'achievements' | 'settings';

type Props = {
  onTabChange: (tab: Tab) => void; // Optional callback when tab changes
  activeTab: Tab;
};

const ProfileTabs: React.FC<Props> = ({ onTabChange, activeTab }) => {
  const tabs: {
    id: Tab;
    icon?: keyof typeof Feather.glyphMap;
  }[] = [
    { id: 'stats', icon: 'database' },
    { id: 'achievements', icon: 'award' },
    { id: 'settings', icon: 'settings' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tabButton, isActive && styles.activeTabButton]}
            onPress={() => onTabChange(tab.id)}
          >
            {tab.icon && (
              <Feather
                name={tab.icon}
                size={16}
                color={isActive ? '#FFFFFF' : '#333333'}
                style={styles.icon}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray,
    borderRadius: 25,
    padding: 6,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
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
    marginRight: 6,
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

export default ProfileTabs;
