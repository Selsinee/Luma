import IcnDefaultProfile from '@/assets/svgs/IcnDefaultProfile';
import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BaseHeaderProps {
  type: 'tab' | 'page';
  title?: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  rightToolbar?: React.ReactNode;
}

const BaseHeader = ({
  type,
  title,
  subtitle,
  style,
  rightToolbar,
}: BaseHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuth();

  const renderAvatar = () => {
    // If the user data is available and has an avatar, display it
    if (user?.avatar_url) {
      return (
        <Image
          source={{ uri: user.avatar_url }}
          style={styles.avatarImage}
          placeholder="L6PZfSi_.AyE_3t7t7Rk00Rj~p00" // A generic blurhash placeholder
          transition={300}
        />
      );
    }
    // Otherwise, show the default profile icon
    return <IcnDefaultProfile width={40} height={40} />;
  };

  return (
    <View style={[styles.wrapper, { marginTop: insets.top }, style]}>
      {type === 'tab' ? (
        renderAvatar() // 4. Render the avatar logic
      ) : (
        <TouchableOpacity style={styles.iconButton} onPress={router.back}>
          <Feather name="chevron-left" size={24} color="#333" />
        </TouchableOpacity>
      )}

      <View style={{ marginLeft: 10, flex: 1 }}>
        {/* Use the user's name as a fallback title */}
        <Text style={styles.greeting}>
          {title || `Welcome, ${user?.full_name}`}
        </Text>
        {subtitle && <Text style={styles.secondText}>{subtitle}</Text>}
      </View>
      {rightToolbar}
    </View>
  );
};

export default BaseHeader;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    justifyContent: 'space-between',
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  secondText: {
    fontSize: 12,
    color: '#717182',
  },
  iconButton: {
    padding: 4,
  },
  // 5. Add new style for the avatar image
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make it a circle
    backgroundColor: '#E8E8F0', // A light gray placeholder background
  },
});
