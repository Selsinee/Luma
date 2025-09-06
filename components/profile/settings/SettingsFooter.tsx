import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SupportLink from './SupportLink'; // Import the component we just made

const SettingsFooter: React.FC = () => {
  const { logout } = useAuth();
  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Yes',
        onPress: () => {
          logout();
        },
      },
      {
        text: 'No',
        onPress: () => {},
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      {/* Support & Legal Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Support & Legal</Text>
        <SupportLink iconName="help-circle" label="Help & Support" />
        <SupportLink iconName="lock" label="Privacy Policy" />
        <SupportLink iconName="mail" label="Contact Us" />
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Feather name="log-out" size={18} color="#D32F2F" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E8F0',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#E8E8F0',
    marginTop: 16,
  },
  signOutText: {
    color: '#D32F2F', // Red color for emphasis
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default SettingsFooter;
