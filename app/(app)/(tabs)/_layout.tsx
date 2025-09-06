import BaseHeader from '@/components/BaseHeader';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

// Define your theme colors
const ACTIVE_COLOR = '#4a5987';
const INACTIVE_COLOR = '#b0aeae';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 90, // Adjust height to your liking
          paddingTop: 10,
        },
        sceneStyle: { backgroundColor: '#FFFFFF' },
      }}
      initialRouteName="home"
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
          header: () => (
            <BaseHeader
              type="tab"
              title="Good Morning!"
              subtitle="Ready to learn?"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="decks" // decks.tsx
        options={{
          title: 'Decks',
          tabBarIcon: ({ color }) => (
            <Feather name="book" size={24} color={color} />
          ),
          header: () => (
            <BaseHeader type="tab" title="My decks" subtitle="6 active decks" />
          ),
        }}
      />
      <Tabs.Screen
        name="study" // study.tsx
        options={{
          title: 'Study',
          tabBarIcon: ({ color }) => (
            <Feather name="pen-tool" size={24} color={color} />
          ),
          header: () => (
            <BaseHeader
              type="tab"
              title="Study Session"
              subtitle="Choose what to study today"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // profile.tsx
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Feather name="user" size={24} color={color} />
          ),
          headerShown: false, // Hide the header for the profile tab
        }}
      />
    </Tabs>
  );
}
