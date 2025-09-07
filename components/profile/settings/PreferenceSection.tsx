import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PreferenceItem from './PreferenceItem';

const Separator = () => <View style={styles.separator} />;

const PreferencesSection: React.FC = () => {
  // State for each toggle switch
  const { user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    !!user?.notifications_enabled,
  );
  const [soundEffectsEnabled, setSoundEffectsEnabled] = useState(
    !!user?.sound_effects_enabled,
  );
  const [darkModeEnabled, setDarkModeEnabled] = useState(
    !!user?.dark_mode_enabled,
  );

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
        isEnabled={notificationsEnabled}
        onToggle={setNotificationsEnabled}
      />
      <Separator />
      <PreferenceItem
        iconName="volume-2"
        title="Sound Effects"
        subtitle="Audio feedback during study"
        isEnabled={soundEffectsEnabled}
        onToggle={setSoundEffectsEnabled}
      />
      <Separator />
      <PreferenceItem
        iconName="moon"
        title="Dark Mode"
        subtitle="Switch to dark theme"
        isEnabled={darkModeEnabled}
        onToggle={setDarkModeEnabled}
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
