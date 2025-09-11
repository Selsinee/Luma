import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { useUpdateUser } from '@/hooks/useUpdateUser';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PreferenceItem from './PreferenceItem';

const Separator = () => <View style={styles.separator} />;

const PreferencesSection: React.FC = () => {
  // State for each toggle switch
  const { user, updateUser } = useAuth();
  const { updateUserSettings, isLoading } = useUpdateUser();

  const handleToggle = async (
    key:
      | 'notifications_enabled'
      | 'sound_effects_enabled'
      | 'dark_mode_enabled',
    value: boolean,
  ) => {
    if (!user) return;

    // 1. Optimistically update the UI immediately
    const originalUser = { ...user };
    updateUser({ ...user, [key]: value });

    // 2. Make the API call in the background
    const success = await updateUserSettings({ [key]: value });

    // 3. If the API call fails, revert the change and show an error
    if (!success) {
      updateUser(originalUser);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Feather name="settings" size={18} color="#555" />
        <Text style={styles.headerTitle}>Preferences</Text>
      </View>

      <PreferenceItem
        iconName="bell"
        title="Notifications"
        subtitle="Study reminders and achievements"
        isEnabled={!!user?.notifications_enabled}
        onToggle={value => handleToggle('notifications_enabled', value)}
      />
      <Separator />
      <PreferenceItem
        iconName="volume-2"
        title="Sound Effects"
        subtitle="Audio feedback during study"
        isEnabled={!!user?.sound_effects_enabled}
        onToggle={value => handleToggle('sound_effects_enabled', value)}
      />
      <Separator />
      <PreferenceItem
        iconName="moon"
        title="Dark Mode"
        subtitle="Switch to dark theme"
        isEnabled={!!user?.dark_mode_enabled}
        onToggle={value => handleToggle('dark_mode_enabled', value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E8E8F0',
    marginVertical: 8,
  },
});

export default PreferencesSection;
