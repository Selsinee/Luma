import Colors from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';
import { Feather } from '@expo/vector-icons';
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
import Avatar from './Avatar';

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

  return (
    <View style={[styles.wrapper, { marginTop: insets.top }, style]}>
      {type === 'tab' ? (
        <Avatar avatarUrl={user?.avatar_url} size={40} />
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
});
