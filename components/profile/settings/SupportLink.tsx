import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface SupportLinkProps {
  iconName: keyof typeof Feather.glyphMap;
  label: string;
  onPress?: () => void;
}

const SupportLink: React.FC<SupportLinkProps> = ({
  iconName,
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Feather name={iconName} size={20} color="#555" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
});

export default SupportLink;
