import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Props for the component
interface UserProfileHeaderProps {
  name: string;
  bio: string;
  streak: number;
  level: number;
  avatarUrl?: string | null; // Optional avatar URL
}

const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
  name,
  bio,
  streak,
  level,
  avatarUrl,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Feather name="user" size={40} color="#A9B0D2" />
          </View>
        )}
        <TouchableOpacity style={styles.cameraButton}>
          <Feather name="camera" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.badgesContainer}>
          <View style={styles.streakBadge}>
            <Feather name="zap" size={12} color="#FF6F00" />
            <Text style={styles.streakText}>{streak} day streak</Text>
          </View>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level {level}</Text>
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
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    backgroundColor: '#F0F0F7',
    justifyContent: 'center',
    alignItems: 'center',
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
