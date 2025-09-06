import Colors from '@/constants/Colors';
import { useUser } from '@/hooks/useUser'; // 1. Import the useUser hook
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image'; // 2. Use expo-image
import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const UserProfileHeader = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <View style={[styles.card, styles.centerContent]}>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={[styles.card, styles.centerContent]}>
        <Text style={styles.errorText}>Could not load profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user.avatar_url || 'https://i.pravatar.cc/150' }}
          style={styles.avatarImage}
          placeholder="L6PZfSi_.AyE_3t7t7Rk00Rj~p00"
          transition={300}
        />
        <TouchableOpacity style={styles.cameraButton}>
          <Feather name="camera" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.full_name}</Text>
        <Text style={styles.bio}>{user.bio || 'No bio available.'}</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.streakBadge}>
            <Feather name="zap" size={12} color="#FF6F00" />
            <Text style={styles.streakText}>{user.streak} day streak</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level {user.level}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundGray,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    minHeight: 112, // Set a min height to avoid layout shifts
  },
  centerContent: {
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#E8E8F0',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  badgesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  streakBadge: {
    backgroundColor: '#FFF3E0',
    borderWidth: 1,
    borderColor: '#FFB74D',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
  },
  streakText: {
    color: '#FF6F00',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  levelBadge: {
    backgroundColor: Colors.borderColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
  },
  levelText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default UserProfileHeader;
