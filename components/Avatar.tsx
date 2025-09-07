import IcnDefaultProfile from '@/assets/svgs/IcnDefaultProfile';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

interface AvatarProps {
  avatarUrl?: string | null;
  size?: number;
}

const Avatar = ({ avatarUrl, size = 40 }: AvatarProps) => {
  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={[
          styles.avatarImage,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
        placeholder="L6PZfSi_.AyE_3t7t7Rk00Rj~p00" // A generic blurhash placeholder
        transition={300}
      />
    );
  }
  // Otherwise, show the default profile icon
  return <IcnDefaultProfile width={size} height={size} />;
};

export default Avatar;

const styles = StyleSheet.create({
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it a circle
    backgroundColor: '#E8E8F0', // A light gray placeholder background
  },
});
