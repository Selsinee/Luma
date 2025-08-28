import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

// Props for a single preference item
interface PreferenceItemProps {
  iconName: keyof typeof Feather.glyphMap;
  title: string;
  subtitle: string;
  isEnabled: boolean;
  onToggle: (value: boolean) => void;
}

const PreferenceItem: React.FC<PreferenceItemProps> = ({
  iconName,
  title,
  subtitle,
  isEnabled,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <Feather name={iconName} size={20} color="#8A8A8A" style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Switch
        trackColor={{ false: '#E0E0E0', true: Colors.primary }}
        thumbColor={'#FFFFFF'}
        ios_backgroundColor="#E0E0E0"
        onValueChange={onToggle}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  icon: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  subtitle: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 2,
  },
});

export default PreferenceItem;
