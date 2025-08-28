import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ProfileStatCardProps {
  iconName: keyof typeof Feather.glyphMap;
  value: string;
  label: string;
}

const ProfileStatCard: React.FC<ProfileStatCardProps> = ({
  iconName,
  value,
  label,
}) => {
  return (
    <View style={styles.card}>
      <Feather name={iconName} size={24} color="#A9B0D2" />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  label: {
    fontSize: 13,
    color: '#8A8A8A',
    marginTop: 2,
  },
});

export default ProfileStatCard;
